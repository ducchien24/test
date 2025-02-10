import { exportToCSV, showCustomNotification } from '@/utils/commonFunc/func';
import { RootState } from '@/utils/redux/rootReducers';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getDomainDetails } from '../services';
import { Domain, ErrorResponse } from '../type';
interface DetailCustomDomainForm {
  cname: string;
  landingPages: {
    '404': string;
    default: string;
  };
  security: {
    hsts: boolean;
    'https:': boolean;
    upgradeInsecureRequests: boolean;
    status: string;
  };
}
export const useDetailCustomDomain = (IdDomain: string) => {
  const user = useSelector((state: RootState) => state.system.user);
  const { control, handleSubmit, setValue, getValues } =
    useForm<DetailCustomDomainForm>({
      defaultValues: {
        cname: 'abc-def',
        landingPages: {
          '404': '',
          default: '',
        },
        security: {
          hsts: true,
          'https:': true,
          upgradeInsecureRequests: true,
          status: 'SSL certificate configured',
        },
      },
    });
  const [visible, { close, open }] = useDisclosure(false);
  const [typeDomain, setTypeDomain] = useState<string | null>(null);

  const fetchDomainDetail = async () => {
    open();
    try {
      const result: Domain | ErrorResponse = await getDomainDetails(
        user?.apiKey || '',
        IdDomain
      );
      if ('error' in result) {
        showCustomNotification(result.error || '', 'Errors', 'error');
      } else {
        setValue('cname', result.Attributes.cloudfront.settings.cname);
        setValue(
          'landingPages',
          result.Attributes.cloudfront.settings.landingPages
        );
        setValue('security', result.Attributes.cloudfront.settings.security);
        setTypeDomain(result.Attributes.acm.status);
      }
    } finally {
      close();
    }
  };
  useEffect(() => {
    fetchDomainDetail();
  }, []);
  const handleDownload = () => {
    exportToCSV([]);
  };
  const cname = getValues('cname');
  return { visible, handleSubmit, control, cname, typeDomain, handleDownload };
};
