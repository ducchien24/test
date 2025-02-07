import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";
const path = require("path");
const mime = require("mime");

interface EnvironmentData {
    hostedZoneId: string,
    targetDomain: string
}

let config = new pulumi.Config();
let dataConfigs = config.requireObject<EnvironmentData>("data");
console.log(dataConfigs);
const stage = pulumi.getStack();
let targetDomain = dataConfigs.targetDomain;
let hostedZoneId = dataConfigs.hostedZoneId;
const appSubdomain = "app";
const tenMinutes = 60 * 10;

//Create Certificate
const certificateConfig: aws.acm.CertificateArgs = {
    domainName: `*.${targetDomain}`,
    validationMethod: "DNS",
    subjectAlternativeNames: [`${appSubdomain}.${targetDomain}`],
};

const eastRegion = new aws.Provider(`roobz-app-east-${stage}`, {
    profile: aws.config.profile,
    region: "us-east-1"
});

const certificate = new aws.acm.Certificate(`roobz-app-certificate-${stage}`, certificateConfig, { provider: eastRegion });

const certificateValidationDomain = new aws.route53.Record(`roobz-app-${targetDomain}-validation`, {
    name: certificate.domainValidationOptions[0].resourceRecordName,
    zoneId: hostedZoneId,
    type: certificate.domainValidationOptions[0].resourceRecordType,
    records: [certificate.domainValidationOptions[0].resourceRecordValue],
    ttl: tenMinutes,
});

let subdomainCertificateValidationDomain = new aws.route53.Record(`roobz-app-${appSubdomain}.${targetDomain}-validation`, {
    name: certificate.domainValidationOptions[1].resourceRecordName,
    zoneId: hostedZoneId,
    type: certificate.domainValidationOptions[1].resourceRecordType,
    records: [certificate.domainValidationOptions[1].resourceRecordValue],
    ttl: tenMinutes,
});

const validationRecordFqdns = [
    certificateValidationDomain.fqdn,
    subdomainCertificateValidationDomain.fqdn
];

const certificateValidation = new aws.acm.CertificateValidation(`roobz-app-certificate-Validation-${stage}`, {
    certificateArn: certificate.arn,
    validationRecordFqdns: validationRecordFqdns,
}, { provider: eastRegion });

let certificateArn = certificateValidation.certificateArn;


const addFolderContents = (site: any, bucket: any, siteDir: any, prefix: any = null) => {
    for (let item of fs.readdirSync(siteDir)) {
        let filePath = path.join(siteDir, item);
        let isDir = fs.lstatSync(filePath).isDirectory();

        // This handles adding subfolders and their content
        if (isDir) {
            const newPrefix = prefix ? path.join(prefix, item) : item;
            addFolderContents(site, bucket, filePath, newPrefix);
            continue;
        }

        let itemPath = prefix ? path.join(prefix, item) : item;
        itemPath = itemPath.replace(/\\/g, '/');             // convert Windows paths to something S3 will recognize
        if (itemPath === "index.html") {
            itemPath = `${site}${itemPath}`;
        }
        if (itemPath.includes("promotion-code.json")) {
            continue;
        }
        let object = new aws.s3.BucketObject(itemPath, {
            bucket: bucket.bucket,
            source: new pulumi.asset.FileAsset(filePath),     // use FileAsset to point to a file
            contentType: mime.getType(filePath) || undefined, // set the MIME type of the file
        });
    }
}

// Create S3 for flow website
const bucketFlow = new aws.s3.Bucket(`roobz-app-${stage}`,
);

export const bucketFlowName = bucketFlow.id;

addFolderContents("flow", bucketFlow, `../code/deploy/${stage}`);

const distributionFlowAliases = [`${appSubdomain}.${targetDomain}`];
// Generate Origin Access Identity to access the private s3 bucket.
const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(`roobz-app-origin-access-identity-${stage}`, {
    comment: "this is needed to setup s3 polices and make s3 not public.",
});

let flowFunctionAssociations: any[] = [];
if (stage !== 'prod') {
    // flowFunctionAssociations.push(
    //     {
    //         eventType: "viewer-request",
    //         functionArn: cloudFontFlowFunction.arn
    //     }
    // );
}
let cloudFrontFlowDistribution = new aws.cloudfront.Distribution(`roobz-app-front-distribution-${stage}`, {
    enabled: true,
    aliases: distributionFlowAliases,
    // Uncomment the below line to restrict the distribution to only
    // include HTTPS traffic
    // httpVersion: "http2",
    origins: [
        {
            domainName: bucketFlow.bucketRegionalDomainName,
            originId: bucketFlow.id,
            s3OriginConfig: {
                originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
            }
        },
    ],
    defaultCacheBehavior: {
        targetOriginId: bucketFlow.id,
        viewerProtocolPolicy: "allow-all",
        allowedMethods: ["GET", "HEAD", "OPTIONS"],
        cachedMethods: ["GET", "HEAD", "OPTIONS"],
        forwardedValues: {
            cookies: { forward: "none" },
            queryString: false,
        },
        minTtl: 7776000,
        defaultTtl: 7776000,
        maxTtl: 7776000,
        functionAssociations: flowFunctionAssociations
    },
    restrictions: {
        geoRestriction: {
            restrictionType: "none",
        },
    },
    // viewerCertificate: {
    //     cloudfrontDefaultCertificate: true,
    // },

    viewerCertificate: {
        acmCertificateArn: certificateArn,  // Per AWS, ACM certificate must be in the us-east-1 region.
        sslSupportMethod: "sni-only",
        minimumProtocolVersion: "TLSv1.2_2021"
    },
    defaultRootObject: "flowindex.html",
    customErrorResponses: [
        {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: "/flowindex.html"
        },
        {
            errorCode: 404,
            responseCode: 404,
            responsePagePath: "/flowindex.html"
        }
    ]
});

const recordQuoteDomain = new aws.route53.Record(
    `${targetDomain}-quote-alias`,
    {
        name: `${appSubdomain}.${targetDomain}`,
        zoneId: hostedZoneId,
        type: "A",
        aliases: [
            {
                name: cloudFrontFlowDistribution.domainName,
                zoneId: cloudFrontFlowDistribution.hostedZoneId,
                evaluateTargetHealth: true,
            },
        ],
    },
);

const s3BucketFlowPolicyDocument = pulumi.interpolate`{
    "Version": "2012-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${originAccessIdentity.id}"
        },
        "Action": "s3:GetObject",
        "Resource": "${bucketFlow.arn}/*"
      }
    ]
  }`;

const bucketFlowPolicy = new aws.s3.BucketPolicy(`roobz-app-allow-access-bucket-policy-${stage}`, {
    bucket: bucketFlow.id,
    policy: s3BucketFlowPolicyDocument,
});
