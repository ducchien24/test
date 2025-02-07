import { RootState } from '@/utils/redux/rootReducers';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getListDomain } from './services';
import { Domain, DomainsResponse, ErrorResponse } from './type';

export const useCustomDomain = () => {
  const [isRenderPageNoHaveRecord, setIsRenderPageNoHaveRecord] =
    useState(false);
  const [isFirstCreate, setIsFirstCreate] = useState(true);
  const user = useSelector((state: RootState) => state.system.user);
  const [listDomain, setListDomain] = useState<Domain[]>([]);
  const [visible, { open, close }] = useDisclosure(false);
  const [isShowCreateDomainInListDomain, setIsShowCreateDomainInListDomain] =
    useState<boolean>(false);
  const fetchListDomain = async () => {
    open();
    setIsShowCreateDomainInListDomain(false);
    try {
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

  const handleOnClickPageNoHaveRecord = () => {
    setIsFirstCreate(false);
  };
  return {
    setIsRenderPageNoHaveRecord,
    isRenderPageNoHaveRecord,
    setIsFirstCreate,
    isFirstCreate,
    handleOnClickPageNoHaveRecord,
    listDomain,
    visible,
    fetchListDomain,
    isShowCreateDomainInListDomain,
    setIsShowCreateDomainInListDomain,
  };
};
