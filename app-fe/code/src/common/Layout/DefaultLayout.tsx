import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from '@mantine/core';

const DefaultLayout: FC = () => {
  // const dispatch = useAppDispatch();

  return (
    <Flex>
      <Outlet />;
    </Flex>
  );
};

export default DefaultLayout;
