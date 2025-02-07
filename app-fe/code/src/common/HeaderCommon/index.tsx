import DropDownMenu from '@/icons/DropDownMenu.svg';
import logo from '@/icons/Logo.svg';
import { RootState } from '@/utils/redux/rootReducers';
import {
  ActionIcon,
  Avatar,
  Button,
  Drawer,
  Flex,
  Image,
  Menu,
  Popover,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconClipboardText,
  IconLink,
  IconMenu2,
  IconPlus,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListURL } from './const';
import { DropDownProfile } from './DropDownProfile';
import styles from './HeaderCommon.module.css';

export const HeaderCommon = () => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.system.user);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex
      w="100%"
      py={16}
      px={{ base: 16, lg: 48 }}
      justify="space-between"
      align="center"
      style={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
        background: '#fff',
        zIndex:1,
        top:0,
      }}
      pos="sticky"
      
    >
      <Flex gap={{ base: 16, lg: 70 }} align="center">
        <Drawer
          opened={opened}
          onClose={close}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          size="100%"
          withCloseButton={false}
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          <DropDownProfile haveHeader close={close} />
        </Drawer>

        <ActionIcon variant="white" onClick={open} c="black" hiddenFrom="lg">
          <IconMenu2 />
        </ActionIcon>
        <Image
          radius="md"
          h="auto"
          w={{ base: 90, lg: 124 }}
          fit="contain"
          src={logo}
        />
        <Flex align="center" gap={24} visibleFrom="lg">
          {ListURL.map((item, index) => (
            <Flex key={index} gap={24} px={8}>
              <Link
                to={item.url}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Flex align="center" gap={4}>
                  <Image h="auto" w="auto" fit="contain" src={item.icon} />
                  <Text component="span" variant="header-3" c="#8F8F8F">
                    {item.name}
                  </Text>
                </Flex>
              </Link>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex align="center" gap={16}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button p={8} w={36} h={36} hiddenFrom="lg">
              <IconPlus />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconLink />} className={styles.element}>
              Link
            </Menu.Item>
            <Menu.Item
              leftSection={<IconClipboardText />}
              className={styles.element}
            >
              Messages
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Button h={36} visibleFrom="lg">
          <Text variant="subtitle-2">{t('+ Create New')}</Text>
        </Button>
        <Button variant="outline-2" h={36}>
          <Text variant="subtitle-2">{t('upgrade')}</Text>
        </Button>
        <Popover position="bottom" shadow="md" width={342}>
          <Popover.Target>
            <Flex
              align="center"
              gap={10}
              style={{ cursor: 'pointer' }}
              visibleFrom="lg"
            >
              <Avatar />
              <Flex align="center">
                <Text variant="header-3">{user?.name}</Text>
                <Image h="auto" w="auto" fit="contain" src={DropDownMenu} />
              </Flex>
            </Flex>
          </Popover.Target>
          <Popover.Dropdown styles={{ dropdown: { padding: 0 } }}>
            <DropDownProfile haveHeader={false} close={close} />
          </Popover.Dropdown>
        </Popover>
      </Flex>
    </Flex>
  );
};
