import CalendarIcon from '@/icons/CalendarIcon.svg';
import CheckedIcon from '@/icons/CheckedIcon.svg';
import CircleWarningErrorsIcon from '@/icons/CircleWarningErrorsIcon.svg';
import ClockIcon from '@/icons/ClockIcon.svg';
import LockIcon from '@/icons/LockIcon.svg';
import { Button, Flex, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconClock } from '@tabler/icons-react';
import React from 'react';
import { DeleteModal } from '../../DeleteModal';
import { Domain } from '../../type';

interface DomainBoxProps {
  domain: Domain;
  openDetailTab: (id: string) => void;
  fetchListDomain: () => void;
}

const DomainBox: React.FC<DomainBoxProps> = ({
  domain,
  openDetailTab,
  fetchListDomain,
}) => {
  const type = domain?.Attributes?.acm?.status;
  const [opened, { open, close }] = useDisclosure(false);
  const domainId = domain.PK.split('#')[1];

  const removeButton = () => {
    return (
      <Button h={30} variant="outline" color="red" radius={8} onClick={open}>
        Remove
      </Button>
    );
  };
  const renderVerificationStatus = () => {
    switch (type) {
      case 'Pending validation':
        return (
          <>
            <Flex align="center" justify="space-between">
              <Text variant="header-2">{domain?.Attributes?.domain}</Text>
              <Flex align="center" gap={12}>
                {removeButton()}
              </Flex>
            </Flex>
            <Flex align="center" gap={4}>
              <IconClock color="#fab005" />
              <Text variant="body-5" style={{ fontWeight: 600 }} c="yellow">
                Verification Pending
              </Text>
            </Flex>
          </>
        );
      case 'Issued':
        return (
          <>
            <Flex align="center" justify="space-between">
              <Flex align="center" gap={8}>
                <Text variant="header-2">{domain?.Attributes?.domain}</Text>
                <Flex
                  bg="#E1E1E1"
                  p={4}
                  style={{ borderRadius: 8 }}
                  align="center"
                  gap={4}
                >
                  <Image src={LockIcon} />
                  <Text
                    variant="subtitle-2"
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: '20px',
                    }}
                  >
                    SSL
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center" gap={12}>
                <Button
                  h={30}
                  variant="outline"
                  radius={8}
                  onClick={() => {
                    openDetailTab(domainId);
                  }}
                >
                  <Text variant="subtitle-2">Manage</Text>
                </Button>
                {removeButton()}
              </Flex>
            </Flex>
            <Flex align="center" gap={16}>
              <Flex align="center" gap={4}>
                <Image src={CalendarIcon} />
                <Text variant="body-5">{domain?.CreatedDate}</Text>
              </Flex>
              <Flex align="center" gap={4}>
                <Image src={ClockIcon} />
                <Text variant="body-5">{domain?.UpdatedDate}</Text>
              </Flex>
            </Flex>
            <Flex align="center" gap={4}>
              <Image src={CheckedIcon} />
              <Text variant="body-5" style={{ fontWeight: 600 }} c="#2C9F6B">
                Verified
              </Text>
            </Flex>
          </>
        );
      default:
        return (
          <>
            <Flex align="center" justify="space-between">
              <Text variant="header-2">{domain?.Attributes?.domain}</Text>
              <Flex align="center" gap={12}>
                <Button
                  h={30}
                  variant="outline"
                  radius={8}
                  onClick={() => {
                    openDetailTab(domainId);
                  }}
                >
                  <Text variant="subtitle-2"> Verify Again</Text>
                </Button>
                {removeButton()}
              </Flex>
            </Flex>
            <Flex align="center" gap={4}>
              <Image src={CircleWarningErrorsIcon} />
              <Text variant="body-5" style={{ fontWeight: 600 }} c="#F55151">
                Verification Failed
              </Text>
            </Flex>
            <Flex direction="column" gap={4}>
              <Text variant="body-5" style={{ fontWeight: 600 }} c="#424242">
                We are unable to connect your domain
              </Text>
              <Text
                variant="support-1"
                c="#6F6F6F"
                style={{ lineHeight: '20px' }}
              >
                Please contact support for further assistance.
              </Text>
            </Flex>
          </>
        );
    }
  };

  return (
    <>
      <Flex
        w="100%"
        p={24}
        style={{
          background: '#fff',
          borderRadius: 8,
          border: '1px solid #D2D2D2',
        }}
        direction="column"
        gap={8}
      >
        {renderVerificationStatus()}
      </Flex>
      <DeleteModal
        close={close}
        opened={opened}
        IdDomain={domainId}
        goBackToDomainList={() => {
          fetchListDomain();
        }}
      />
    </>
  );
};

export default DomainBox;
