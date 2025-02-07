import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Anchor, BackgroundImage, Button, Center, Flex, Image, Menu, Text } from '@mantine/core';
import BackgrHome from '@/icons/BackgrHome.svg';
import DropDownMenu from '@/icons/DropDownMenu.svg';
import ItemBackground1 from '@/icons/itemBackground1.svg';
import Logo from '@/icons/Logo.svg';
import RightArrow from '@/icons/right_arrow.svg';
import { routePaths } from '@/utils/constants/routePaths';

const listLink = [
  {
    name: 'About',
    link: 'https://mantine.dev',
  },
  {
    name: 'Pricing',
    link: 'https://mantine.dev',
  },
  {
    name: 'Contact Us',
    link: 'https://mantine.dev',
  },
  {
    name: 'Case Study',
    link: 'https://mantine.dev',
  },
];
export const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Flex w="100%" direction="column">
      <Flex py={12} justify="space-between" align="center" px={100}>
        <Flex gap={54}>
          <Image radius="md" h="auto" w="124px" fit="contain" src={Logo} />
          <Flex justify="center" align="center" gap={24}>
            <Menu width={200} shadow="md">
              <Menu.Target>
                <Flex style={{ cursor: 'pointer' }} align="center">
                  <Text variant="body-4" style={{ fontWeight: 600 }} component="span">
                    {t('Product & Feature')}
                  </Text>
                  <Image radius="md" h="auto" w="auto" fit="contain" src={DropDownMenu} />
                </Flex>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item component="a" href="https://mantine.dev">
                  Mantine website
                </Menu.Item>
                <Menu.Item component="a" href="https://mantine.dev" target="_blank">
                  External link
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            {listLink.map((item, index) => {
              return (
                <Anchor href={item.link} target="_blank" key={index} c="#000">
                  <Text variant="header-3" component="span">
                    {item.name}
                  </Text>
                </Anchor>
              );
            })}
          </Flex>
        </Flex>
        <Flex>
          <Button
            variant="outline-2"
            style={{ borderRadius: 8, marginRight: 16 }}
            onClick={() => {
              navigate(routePaths.LOGIN);
            }}
          >
            <Text variant="subtitle-2">{t('login')}</Text>
          </Button>
          <Button style={{ borderRadius: 8 }}>
            <Text variant="subtitle-2">{t('start_free_trial')}</Text>
          </Button>
        </Flex>
      </Flex>
      <Flex
        style={{
          background:
            'linear-gradient(85.84deg, rgba(8, 174, 234, 0.15) -11.49%, rgba(88, 203, 150, 0.15) 108.4%)',
        }}
        direction="column"
        w="100%"
      >
        <BackgroundImage
          src={BackgrHome}
          radius="sm"
          h={600}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Center>
            <Flex direction="column" align="center" gap={40}>
              <Flex direction="column" align="center" gap={16}>
                <Text style={{ fontSize: 40, fontWeight: 700 }}>
                  {t('Transform Your Links into Smart,')}
                </Text>
                <Text maw={600} ta="center">
                  {t('home.description')}
                </Text>
              </Flex>
              <Button h={56} rightSection={<Image src={RightArrow} />} style={{ borderRadius: 10 }}>
                <Text variant="body-2" style={{ fontSize: 18 }}>
                  {t('start_free_trial')}
                </Text>
              </Button>
              <Image src={ItemBackground1} h="auto" w="auto" />
            </Flex>
          </Center>
        </BackgroundImage>
      </Flex>
    </Flex>
  );
};
