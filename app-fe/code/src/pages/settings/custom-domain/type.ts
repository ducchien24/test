export type CloudFrontSettings = {
  cname: string;
  customSSLcertificate: string;
  landingPages: {
    '404': string;
    default: string;
  };
  security: {
    status: string;
    'https:': boolean;
    hsts: boolean;
    upgradeInsecureRequests: boolean;
  };
};

export type CloudFront = {
  id: string;
  arn: string;
  settings: CloudFrontSettings;
};

export type ACM = {
  id: string;
  cname: {
    value: string;
    type: string;
    name: string;
  }[];
  status: string;
};

export type DomainAttributes = {
  domain: string;
  isPublished: boolean;
  subdomain: string;
  cloudfront: CloudFront;
  acm: ACM;
};

export type Domain = {
  PK: string;
  SK: string;
  AccountId: string;
  Attributes: DomainAttributes;
  CreatedDate: string;
  CreatedVia: string;
  UpdatedDate: string;
  UserId: string;
};
export type DataCreate = {
  domain: string;
  isPublished: boolean;
  subdomain?: string;
};
export type DomainCreate = {
  PK: string;
  SK: string;
  AccountId: string;
  Attributes: DomainAttributes;
  CreatedDate: string;
  CreatedVia: string;
  UpdatedDate: string;
  UserId: string;
  Data: DataCreate;
};
export type DomainsResponse = {
  domains: Domain[];
};
export type ErrorResponse = {
  error: string;
};
export const ListStatusDomain = [
  'Pending validation',
  'Issued',
  'Inactive',
  'Expired',
  'Revoked',
  'Failed',
  'Validation timed out',
];
