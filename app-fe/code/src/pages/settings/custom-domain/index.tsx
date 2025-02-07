import { Flex, LoadingOverlay } from '@mantine/core';
import { PageNoRecordCustomDomain } from './PageNoRecordCustomDomain';
import { useCustomDomain } from './useCustomDomain';
import { ListDomainBox } from './ListDomainBox';
import { CreateDomainPage } from './CreateDomainPage';

export const CusTomDomain = () => {
  const {
    isFirstCreate,
    handleOnClickPageNoHaveRecord,
    listDomain,
    visible,
    fetchListDomain,
    isShowCreateDomainInListDomain,
    setIsShowCreateDomainInListDomain,
  } = useCustomDomain();

  return (
    <Flex w="100%" pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      {isShowCreateDomainInListDomain ? (
        <CreateDomainPage fetchListDomain={fetchListDomain} />
      ) : listDomain?.length > 0 ? (
        <Flex bg="#fff" w="100%">
          <ListDomainBox
            listDomain={listDomain}
            fetchListDomain={fetchListDomain}
            setIsShowCreateDomainInListDomain={() => {
              setIsShowCreateDomainInListDomain(true);
            }}
          />
        </Flex>
      ) : isFirstCreate ? (
        <PageNoRecordCustomDomain onClick={handleOnClickPageNoHaveRecord} />
      ) : (
        <CreateDomainPage fetchListDomain={fetchListDomain} />
      )}
    </Flex>
  );
};
