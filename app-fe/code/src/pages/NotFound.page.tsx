import NotFoundIcon from '@/icons/404.svg';
import { Anchor, Center, Flex, Image, Text } from '@mantine/core';
import { t } from 'i18next';

export function NotFoundPage() {
  return (
    <Center>
      <Flex
        direction="column"
        align="center"
        gap={42}
        w={760}
        justify="center"
        h="100vh"
      >
        <Image src={NotFoundIcon} alt="404" w={420} h="auto" />
        <Flex direction="column" gap={32}>
          <Flex direction="column" gap={16}>
            <Text variant="body-1" ta="center">
              {t('404.title')}
            </Text>
            <Text variant="body-2" ta="center">
              {t('404.description')}
            </Text>
          </Flex>
          <Text variant="support-2" ta="center">
            {t('404.description2')}{' '}
            <Anchor href="https://www.roo.bz/">https://www.roo.bz/</Anchor>
          </Text>
        </Flex>
      </Flex>
    </Center>
  );
}
