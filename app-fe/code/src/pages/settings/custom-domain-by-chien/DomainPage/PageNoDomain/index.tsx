import LeftImage from '@/icons/FooterLoginLeft.svg';
import { Button, Flex, Image, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
interface PageNoDomain {
  onClick: () => void;
}
 const PageNoDomain = (
  props: PageNoDomain
) => {
  const { onClick } = props;
  const isMobile = useMediaQuery(`(max-width: 1200px`);

  return (
    <Flex w="100%" align="center" direction="column" py={{ base: 32, lg: 70 }}>
      <Image
        h="auto"
        maw="460px"
        fit="contain"
        src={LeftImage}
        mb={{ base: 30, lg: 42 }}
      />
      <Text
        maw={568}
        ta="center"
        mb={{ base: 8, lg: 16 }}
        style={
          isMobile
            ? {
                fontSize: 28,
                fontWeight: 700,
                lineHeight: '32px',
              }
            : {
                fontSize: 32,
                fontWeight: 700,
                lineHeight: '42px',
              }
        }
      >
        Use a custom domain to personalize your shortlinks.
      </Text>
      <Text
        mb={{ base: 16, lg: 32 }}
        maw={568}
        ta="center"
        c="#6F6F6F"
        style={
          isMobile
            ? { fontSize: 14, lineHeight: '20px' }
            : { fontSize: 18, lineHeight: '24px' }
        }
      >
        Custom domains replace the “roo.bz” in your short links with the
        {isMobile ? <></> : <br />}
        name of your choosing, so you can take total control of your content.
      </Text>
      <Button onClick={onClick}>Upgrade to get started</Button>
    </Flex>
  );
};
export default PageNoDomain