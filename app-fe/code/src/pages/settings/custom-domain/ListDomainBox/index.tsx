import { Button, Flex, Text } from '@mantine/core';
import { Domain } from '../type';
import DomainBox from './DomainBox';
import { useState } from 'react';
import { DetailCustomDomain } from '../DetailCustomDomain';

type ListDomainBoxProps = {
  listDomain: Domain[];
  fetchListDomain?: () => void;
  setIsShowCreateDomainInListDomain: () => void;
};

export const ListDomainBox = (props: ListDomainBoxProps) => {
  const {
    listDomain,
    fetchListDomain = () => {},
    setIsShowCreateDomainInListDomain,
  } = props;
  const [idDomainOpen, setIdDomainOpen] = useState<string | null>(null);

  return (
    <Flex p={{ base: 16, lg: 0 }} direction="column" w="100%" gap={32}>
      {idDomainOpen ? (
        <DetailCustomDomain
          IdDomain={idDomainOpen}
          onClose={() => {
            setIdDomainOpen(null);
            fetchListDomain();
          }}
        />
      ) : (
        <>
          <Flex justify="space-between" align="center">
            <Flex direction="column">
              <Text variant="body-2" style={{ fontSize: 18 }}>
                Custom Domains
              </Text>
              <Text variant="body-5" style={{ lineHeight: '22px' }} c="#6F6F6F">
                Manage the custom domains connected to your account.
              </Text>
            </Flex>
            <Button h={36} onClick={setIsShowCreateDomainInListDomain}>
              Add Domain
            </Button>
          </Flex>

          <Flex direction="column" gap={16}>
            {listDomain?.map((domain, index) => (
              <DomainBox
                key={domain.PK + index}
                domain={domain}
                openDetailTab={(id) => {
                  setIdDomainOpen(id);
                }}
                fetchListDomain={fetchListDomain}
              />
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};
