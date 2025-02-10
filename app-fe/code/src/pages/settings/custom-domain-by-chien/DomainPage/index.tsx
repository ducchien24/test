import { Flex, LoadingOverlay } from '@mantine/core';
import PageNoDomain from './PageNoDomain';
import PageCreateDomain from './PageCreateDomain';
import PageListDomain from './PageListDomain';


import { useEffect, useState } from 'react';
import { Domain, DomainsResponse, ErrorResponse } from './type';
import { getListDomain } from './services';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/rootReducers';


 const DomainPage = () => {
  const [listDomain, setListDomain] = useState<Domain[]>([]);
  const user = useSelector((state: RootState) => state.system.user);
  const [isCreateDomain, setIsCreateDomain] = useState<boolean>(false);
  const handleCreateDomain = () => {
    setIsCreateDomain(true);
  };


  const fetchListDomain = async () => {
    try {
      setIsCreateDomain(false)
      const result: DomainsResponse | ErrorResponse = await getListDomain(
        user?.apiKey || ''
      );
      if ('error' in result) {
        setListDomain([]);
      } else {
        setListDomain(result.domains);
      }
    } finally {
      close();
    }
  };
  useEffect(() => {
    fetchListDomain();
  }, []);
  return (
    <Flex w="100%" pos="relative">
      <LoadingOverlay
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      {isCreateDomain ? (
        <PageCreateDomain fetchListDomain={fetchListDomain}/>
      ) : listDomain?.length > 0 ? (
        <PageListDomain   listDomain={listDomain}
        fetchListDomain={fetchListDomain}
        setIsShowCreateDomain={() => {
          setIsCreateDomain(true);
        }} />
      ) : (
        <PageNoDomain onClick={handleCreateDomain} />
      )}
    </Flex>
  );
};
export default DomainPage