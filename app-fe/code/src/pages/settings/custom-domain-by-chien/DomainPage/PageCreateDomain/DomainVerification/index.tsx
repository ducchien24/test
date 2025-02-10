import { Button, Flex, Text } from '@mantine/core';
interface DomainVerificationInProgressProps {
  onViewYourDomain: () => void;
}
 const DomainVerification = ({
  onViewYourDomain,
}: DomainVerificationInProgressProps) => {
  return (
    <Flex direction="column" w="100%" gap={24}>
      <Text variant="body-2" style={{ fontSize: 18 }}>
        Domain verification in progress
      </Text>
      <Text p={10} bg="#EDFAFF" variant="body-5">
        Your domain must be verified before you can use it to create short
        links.
      </Text>
      <Text variant="body-5" c="#6F6F6F">
        If you updated the DNS settings correctly, your domain should be
        connected within 24 hours. Until then, he status will be shown as
        ‘pending verification’. We will send you an email once it is verified or
        you can check the status in custom domain settings.
      </Text>
      <Button
        variant="filled"
        w="fit-content"
        style={{ alignSelf: 'flex-end' }}
        onClick={onViewYourDomain}
      >
        View your Domain
      </Button>
    </Flex>
  );
};
export default DomainVerification