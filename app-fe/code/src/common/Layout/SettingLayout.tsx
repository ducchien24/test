import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Flex } from '@mantine/core';
import { routePaths } from '@/utils/constants/routePaths';
import { HeaderCommon } from '../HeaderCommon';

const SettingLayout: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: t('profile'), value: 'home' },
    { label: t('users'), value: 'profile' },
    { label: t('customDomain'), value: routePaths.SETTINGS_CUSTOM_DOMAIN },
    { label: t('Single_sign_on'), value: 'logout' },
    { label: t('Plan & Billing'), value: 'logout' },
    { label: t('Webhooks'), value: 'logout' },
    { label: t('CSV bulk Shortening'), value: 'logout' },
    { label: t('Scheduled Redirects'), value: 'logout' },
    { label: t('Disclaimer'), value: 'logout' },
    { label: t('Monitoring'), value: 'logout' },
    { label: t('API Documentation '), value: 'logout' },
    { label: t('Support'), value: 'logout' },
    { label: t('Terms of use'), value: 'logout' },
  ];
  return (
    <Flex
      direction="column"
      w="100%"
      mih="100vh"
      gap={50}
      style={{ background: '#F5FAFB' }}
    >
      <HeaderCommon />
      <Flex
        flex={{ base: 'auto', lg: 1 }}
        gap={20}
        justify={{ base: 'flex-start', lg: 'center' }}
        w="100%"
      >
        <Flex
          direction="column"
          style={{
            flexBasis: 244,
            borderRadius: 4,
            background: '#fff',
          }}
          p={5}
          h="fit-content"
          visibleFrom="lg"
        >
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="subtle"
              onClick={() => {
                navigate(item.value);
              }}
              styles={(theme) => ({
                root: {
                  width: '100%',
                  backgroundColor:
                    location.pathname === item.value
                      ? '#EDFAFF'
                      : 'transparent',
                  color:
                    location.pathname === item.value ? '#41BBE8' : theme.black,
                  borderRadius: 0,
                  height: 38,
                },
                label: {
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: '19px',
                  textAlign: 'left',
                },
                inner: {
                  justifyContent: 'flex-start',
                },
              })}
            >
              {item.label}
            </Button>
          ))}
        </Flex>
        <Flex
          maw={{ base: 'auto', lg: 772 }}
          w="100%"
          bg={{ _: 'transparent', lg: '#fff' }}
          style={{
            borderRadius: 4,
          }}
          h="fit-content"
          p={{ base: 16, lg: 24 }}
        >
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SettingLayout;
