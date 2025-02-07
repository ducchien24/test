import FooterLoginLeft from '@/icons/FooterLoginLeft.svg';
import FooterLoginRight from '@/icons/FooterLoginRight.svg';
import { Flex, Image } from '@mantine/core';
import { ReactNode } from 'react';

export const LayoutAuthPage = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      direction="column"
      justify={{ base: 'unset', sm: 'space-between' }}
      w="100%"
      h="100vh"
    >
      {children}
      <Flex justify="space-between" w="100%">
        <Image
          visibleFrom="sm"
          h="auto"
          w="auto"
          fit="contain"
          src={FooterLoginLeft}
        />
        <Image
          visibleFrom="sm"
          h="auto"
          w="auto"
          fit="contain"
          src={FooterLoginRight}
        />
      </Flex>
    </Flex>
  );
};
