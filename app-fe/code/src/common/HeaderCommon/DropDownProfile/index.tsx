import { logout } from '@/common/systems/systemSlice';
import EditIcon from '@/icons/EditIcon.svg';
import { useAppDispatch } from '@/utils/hook/redux';
import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  Text,
} from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../HeaderCommon.module.css';
import { LinkPage, ListURL } from '../const';
import logo from '@/icons/Logo.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/rootReducers';
interface DropDownProfileProps {
  haveHeader?: boolean;
  close: () => void;
}
export const DropDownProfile = ({
  haveHeader,
  close,
}: DropDownProfileProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.system.user);

  return (
    <Flex w="100%" direction="column">
      {haveHeader && (
        <>
          <Flex w="100%" justify="space-between" p={16}>
            <Flex align="center" gap={16}>
              <ActionIcon variant="white" onClick={close} c="black">
                <IconX />
              </ActionIcon>
              <Image
                radius="md"
                h="auto"
                w={{ base: 90 }}
                fit="contain"
                src={logo}
              />
            </Flex>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button p={8} w={36} h={36}>
                  <IconPlus />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item className={styles.element}>Settings</Menu.Item>
                <Menu.Item className={styles.element}>Messages</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
          <Divider />
        </>
      )}

      <Flex p={16} direction="column">
        <Flex align="center" justify="space-between" pb={16}>
          <Flex align="center" gap={16}>
            <Avatar />
            <Flex direction="column" gap={2}>
              <Text variant="body-4">{user?.name}</Text>
              <Text variant="body-5" c="#6F6F6F">
                {user?.email}
              </Text>
            </Flex>
          </Flex>
          <ActionIcon variant="white">
            <Image src={EditIcon} />
          </ActionIcon>
        </Flex>
        <Divider />
        <Flex align="center" py={16} justify="space-between">
          <Flex direction="column" gap={2}>
            <Text variant="body-4">Free Plan</Text>
            <Text variant="body-5" c="#6F6F6F">
              Start Free Trial
            </Text>
          </Flex>
          <Button h={30} bg="#41BBE8">
            <Text variant="subtitle-2">Upgrade</Text>
          </Button>
        </Flex>
        <Divider />
        {haveHeader && (
          <>
            <Flex w="100%" direction="column" py={8} gap={2} px={12}>
              {ListURL.map((item, index) => (
                <Link
                  to={item.url}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  key={index}
                >
                  <Flex align="center" gap={12} py={9}>
                    <Image h="auto" w="auto" fit="contain" src={item.icon} />
                    <Text component="span" variant="header-3">
                      {item.name}
                    </Text>
                  </Flex>
                </Link>
              ))}
            </Flex>
            <Divider />
          </>
        )}

        <Flex direction="column" py={8} gap={2}>
          {LinkPage.map((item, index) => (
            <Button
              key={index}
              variant="subtle"
              onClick={() => {
                navigate(item.url);
              }}
              styles={(theme) => ({
                root: {
                  width: '100%',
                  backgroundColor:
                    location.pathname === item.url ? '#EDFAFF' : 'transparent',
                  color:
                    location.pathname === item.url ? '#41BBE8' : theme.black,
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
              {item.name}
            </Button>
          ))}
          <Button
            variant="subtle"
            onClick={() => dispatch(logout())}
            styles={(theme) => ({
              root: {
                width: '100%',
                backgroundColor: 'transparent',
                color: theme.black,
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
            Sign out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
