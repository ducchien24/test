import { Flex, Image } from '@mantine/core';
import LeftImage from '@/icons/FooterLoginLeft.svg';
import RightImage from '@/icons/FooterLoginRight.svg';

export const FooterCommon = () => {
  return (
    <Flex justify="space-between" w="100%" visibleFrom="lg">
      <Image h="auto" w="auto" fit="contain" src={LeftImage} />
      <Image h="auto" w="auto" fit="contain" src={RightImage} />
    </Flex>
  );
};
