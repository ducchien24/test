import { some } from '@/utils/constants/types';
import { RootState } from '@/utils/redux/rootReducers';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getDashboardInfoAPI } from './services';
import { useDisclosure } from '@mantine/hooks';

export const useDashBoard = () => {
  const { t } = useTranslation();
  const [dashboardInfo, setDashboardInfo] = useState<some>({});
  const [visible, { close, open }] = useDisclosure(false);
  const listItemCard1 = [
    {
      textLink: t('Hebrew YouTube Channel '),
      link: 'https://www.youtube.com/playlist?list=PLJVTlisri5j1xQOnNLkwXhirAXwhKckT5',
      textDescription: t('tutorials, use cases and ideas'),
    },
    {
      textLink: t('Roo Make App'),
      link: 'https://www.make.com/en/login',
      textDescription: t('use Roo in your Make scenarios'),
    },
    {
      textLink: t('Chrome extension'),
      link: 'https://roo.bz/FKiTMu',
      textDescription: t('shorten links quickly and easily from your browser'),
    },
    {
      textLink: t('WhatsApp Support'),
      link: 'https://roo.bz/jammE7',
      textDescription: t('chat with Roo team and fellow users'),
    },
  ];
  const user = useSelector((state: RootState) => state.system.user);
  const fetchDashboardInfo = async () => {
    open();
    try {
      const result = await getDashboardInfoAPI(user?.apiKey || '');
      if (result.error) {
        setTimeout(fetchDashboardInfo, 10000); // Retry after 10 seconds
        setDashboardInfo({
          publicKey: t('Will be available soon'),
          totalLinks: 0,
          subscription: 'Beta (free)',
          name: '',
          supportEmail: 'support@roo.bz',
        });
      } else {
        setDashboardInfo(result);
      }
    } finally {
      close();
    }
  };
  useEffect(() => {
    fetchDashboardInfo();
  }, []);

  return { user, listItemCard1, t, dashboardInfo, visible };
};
