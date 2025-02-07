import { FC, ReactElement, useEffect } from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { selectUser, setUserInfo } from '@/features/systems/systemSlice';
import { useAppSelector } from '@/utils/hook/redux';
import { useSession } from '@/utils/hook/session';
import { selectUser } from './systems/systemSlice';

const AuthProvider: FC<{ children: ReactElement }> = (props) => {
  const { children } = props;
  const user = useAppSelector(selectUser);
  const [visible, { open, close }] = useDisclosure(false);
  const { checkSession } = useSession();
  useEffect(() => {
    open();
    checkSession();
    close();
  }, [user]);

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        {children}
      </Box>
    </>
  );
};

export default AuthProvider;
