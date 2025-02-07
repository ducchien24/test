import { TextInputCustom } from '@/common/atoms/TextInputCustom';
import BlueChecked from '@/icons/BlueChecked.svg';
import CheckedIcon from '@/icons/CheckedIcon.svg';
import {
  ActionIcon,
  Button,
  Flex,
  Image,
  LoadingOverlay,
  SegmentedControl,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronLeft } from '@tabler/icons-react';
import { Controller } from 'react-hook-form';
import { DeleteModal } from '../DeleteModal';
import { useDetailCustomDomain } from './useDetailCustomDomain';
import CircleWarningErrorsIcon from '@/icons/CircleWarningErrorsIcon.svg';

interface DetailCustomDomainProps {
  IdDomain: string;
  onClose: () => void;
}

export const DetailCustomDomain = (props: DetailCustomDomainProps) => {
  const { IdDomain, onClose } = props;

  const { visible, handleSubmit, control, cname, typeDomain, handleDownload } =
    useDetailCustomDomain(IdDomain);
  const [opened, { open, close }] = useDisclosure(false);
  const onSubmit = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" pos="relative" mih={400} gap={32}>
        {visible ? (
          <LoadingOverlay visible={visible} />
        ) : (
          <>
            <Flex align="center" justify="space-between">
              <Flex direction="column" gap={8}>
                <Flex align="center" gap={4}>
                  <ActionIcon variant="transparent" c="#6F6F6F">
                    <IconChevronLeft size={20} onClick={onClose} />
                  </ActionIcon>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: '16px',
                      fontWeight: 400,
                    }}
                    c="#6F6F6F"
                  >
                    Custom Domain
                  </Text>
                </Flex>
                <Text variant="body-3">{cname}</Text>
                {typeDomain === 'Issued' ? (
                  <Flex align="center" gap={4}>
                    <Image src={CheckedIcon} />
                    <Text
                      variant="body-5"
                      style={{ fontWeight: 600 }}
                      c="#2C9F6B"
                    >
                      Verified - your DNS settings are correct
                    </Text>
                  </Flex>
                ) : (
                  <Flex align="center" gap={4}>
                    <Image src={CircleWarningErrorsIcon} />
                    <Text
                      variant="body-5"
                      style={{ fontWeight: 600 }}
                      c="#F55151"
                    >
                      Verification Failed
                    </Text>
                  </Flex>
                )}
              </Flex>
              <Flex align="center" gap={12}>
                {typeDomain !== 'Issued' && (
                  <Button
                    h={30}
                    variant="outline"
                    radius={8}
                    //   onClick={() => {
                    //     openDetailTab(domainId);
                    //   }}
                  >
                    <Text variant="subtitle-2">Verify again</Text>
                  </Button>
                )}
                <Button
                  h={30}
                  variant="outline"
                  radius={8}
                  onClick={handleDownload}
                  //   onClick={() => {
                  //     openDetailTab(domainId);
                  //   }}
                >
                  <Text variant="subtitle-2">Download</Text>
                </Button>
                <Button
                  h={30}
                  variant="outline"
                  color="red"
                  radius={8}
                  onClick={open}
                >
                  Remove
                </Button>
              </Flex>
            </Flex>
            <Flex direction="column" gap={24}>
              <Flex direction="column" gap={4}>
                <Text variant="body-3">Landing pages</Text>
                <Text c="#6F6F6F" variant="body-5">
                  Configure fallback pages to direct people back to your content
                  if they go directly to your custom domain, or if they make a
                  mistake typing a link you've shared.
                </Text>
              </Flex>
              <Flex direction="column" gap={4}>
                <Text variant="body-4" style={{ fontWeight: 600 }}>
                  Default Page
                </Text>
                <Text c="#565656" variant="body-5" mb={12}>
                  Set a page to direct visitors when they enter just your custom
                  domain with no back-half.
                </Text>
                <Controller
                  name="landingPages.default"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextInputCustom
                      label="Root Domain URL"
                      placeholder="Type or paste a link (URL)"
                      {...field}
                      error={fieldState.error?.message}
                      variant="default"
                    />
                  )}
                />
              </Flex>
              <Flex direction="column" gap={4}>
                <Text variant="body-4" style={{ fontWeight: 600 }}>
                  Error / 404 Page
                </Text>
                <Text c="#565656" variant="body-5" mb={12}>
                  Set a page to which visitors will be directed when they visit
                  an invalid URL on your domain.
                </Text>
                <Controller
                  name="landingPages.404"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextInputCustom
                      label="Invalid Address URL"
                      placeholder="Type or paste a link (URL)"
                      {...field}
                      error={fieldState.error?.message}
                      variant="default"
                    />
                  )}
                />
              </Flex>
            </Flex>
            <Flex direction="column" gap={24}>
              <Flex direction="column" gap={4}>
                <Text variant="body-3">Security</Text>
                <Text c="#6F6F6F" variant="body-5">
                  Enable HTTPS for domains to ensure all new short links created
                  for this domain are secured. An SSL certificate is generated
                  automatically for domains with valid DNS configuration.
                </Text>
              </Flex>
              <Flex direction="column" gap={8}>
                <Text variant="header-3">Status</Text>
                <Flex
                  p={8}
                  style={{
                    borderRadius: 4,
                    backgroundColor: '#E1E1E1',
                    width: 'fit-content',
                  }}
                  gap={4}
                  align="center"
                >
                  <Image src={BlueChecked} />
                  <Text variant="header-4" c="#424242">
                    SSL certificate configured
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap={8}>
                <Text variant="header-3">HTTPS</Text>
                <Controller
                  name="security.https:"
                  control={control}
                  render={({ field }) => (
                    <SegmentedControl
                      value={field.value.toString()}
                      onChange={(value) => {
                        field.onChange(value === 'true');
                      }}
                      data={[
                        { label: 'On', value: 'true' },
                        { label: 'Off', value: 'false' },
                      ]}
                      color="#41BBE8"
                      w="fit-content"
                    />
                  )}
                />
              </Flex>
              <Flex direction="column" gap={8}>
                <Text variant="header-3">HSTS</Text>
                <Text variant="support-1" c="#565656">
                  HTTP Strict Transport Security. Enforce web security policy
                  for your website.
                </Text>
                <Controller
                  name="security.hsts"
                  control={control}
                  render={({ field }) => (
                    <SegmentedControl
                      value={field.value.toString()}
                      onChange={(value) => {
                        field.onChange(value === 'true');
                      }}
                      data={[
                        { label: 'On', value: 'true' },
                        { label: 'Off', value: 'false' },
                      ]}
                      color="#41BBE8"
                      w="fit-content"
                    />
                  )}
                />
              </Flex>
              <Flex direction="column" gap={8}>
                <Text variant="header-3">Upgrade insecure requests</Text>
                <Controller
                  name="security.upgradeInsecureRequests"
                  control={control}
                  render={({ field }) => (
                    <SegmentedControl
                      value={field.value.toString()}
                      onChange={(value) => {
                        field.onChange(value === 'true');
                      }}
                      data={[
                        { label: 'On', value: 'true' },
                        { label: 'Off', value: 'false' },
                      ]}
                      color="#41BBE8"
                      w="fit-content"
                    />
                  )}
                />
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
      <DeleteModal
        close={close}
        opened={opened}
        IdDomain={IdDomain}
        goBackToDomainList={onClose}
      />
    </form>
  );
};
