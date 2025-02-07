import { FooterCommon } from '@/common/FooterCommon';
import { HeaderCommon } from '@/common/HeaderCommon';
import { showCustomNotification } from '@/utils/commonFunc/func';
import {
  Anchor,
  Box,
  Card,
  CopyButton,
  Divider,
  Flex,
  Grid,
  List,
  LoadingOverlay,
  Text,
} from '@mantine/core';
import { IconClipboard } from '@tabler/icons-react';
import { useDashBoard } from './useDashBoard';

export const DashBoard = () => {
  const { listItemCard1, t, user, dashboardInfo, visible } = useDashBoard();

  return (
    <Flex
      direction="column"
      w="100%"
      mih="100vh"
      gap={{ base: 16, lg: 50 }}
      style={{ background: '#F5FAFB' }}
      justify={{ base: 'flex-start', lg: 'space-between' }}
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm' }}
      />
      {/* ...other content */}
      <HeaderCommon />
      <Flex w="100%" direction="column" px={{ base: 16, lg: 50 }} gap={16}>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 40,
          }}
        >
          {t('dashboard')}
        </Text>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Card shadow="sm" radius="md" withBorder>
              <Card.Section component="div">
                <Text px={16} py={8} bg="#21252908">
                  {t('What can Roo do?')}
                </Text>
                <Divider />
              </Card.Section>
              <List p={16}>
                {listItemCard1.map((item, index) => (
                  <List.Item key={index}>
                    <Box w="100%">
                      <Anchor
                        href={item.link}
                        target="_blank"
                        underline="always"
                      >
                        {item.textLink}
                      </Anchor>
                      <Text component="span">- {item.textDescription}</Text>
                    </Box>
                  </List.Item>
                ))}
              </List>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Card shadow="sm" radius="md" withBorder p={0}>
              <Card.Section component="div" px={16} py={8} pt={16}>
                <Text px={16} py={8} bg="#21252908">
                  {t('Account Information')}
                </Text>
                <Divider />
              </Card.Section>
              <Flex direction="column" w="100%">
                <Flex w="100%" direction="column" px={16} py={8}>
                  <Text variant="subtitle-1">{t('API Key:')}</Text>
                  <Flex align="center" justify="space-between" w="100%" gap={8}>
                    <Text
                      c="#d63384"
                      variant="subtitle-1"
                      component="div"
                      style={{
                        flex: 1,
                        width: '100%',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {user?.apiKey}
                    </Text>
                    <Flex style={{ flexBasis: 24 }}>
                      <CopyButton value={user?.apiKey}>
                        {({ copy }) => (
                          <IconClipboard
                            onClick={() => {
                              copy();
                              showCustomNotification(
                                t('Copied to clipboard!'),
                                undefined,
                                'success'
                              );
                            }}
                          />
                        )}
                      </CopyButton>
                    </Flex>
                  </Flex>
                </Flex>
                <Divider />
                <Flex w="100%" direction="column" px={16} py={8}>
                  <Text variant="subtitle-1">
                    {t('Chrome Extension API Key:')}
                  </Text>
                  <Flex align="center" justify="space-between" w="100%" gap={8}>
                    <Text
                      c="#d63384"
                      variant="subtitle-1"
                      component="div"
                      style={{
                        flex: 1,
                        width: '100%',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {dashboardInfo?.publicKey}
                    </Text>
                    <Flex style={{ flexBasis: 24 }}>
                      <CopyButton value={dashboardInfo?.publicKey}>
                        {({ copy }) => (
                          <IconClipboard
                            onClick={() => {
                              copy();
                              showCustomNotification(
                                t('Copied to clipboard!'),
                                undefined,
                                'success'
                              );
                            }}
                          />
                        )}
                      </CopyButton>
                    </Flex>

                    {/* Will be available soon */}
                  </Flex>
                </Flex>
                <Divider />
                <Flex w="100%" px={16} py={8} align="center" gap={4}>
                  <Text component="span" variant="subtitle-1">
                    {t('Subscription')}:
                  </Text>
                  <Text variant="body-4">{dashboardInfo?.subscription}</Text>
                </Flex>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Card shadow="sm" radius="md" withBorder p={0}>
              <Card.Section component="div" px={16} py={8} pt={16}>
                <Text px={16} py={8} bg="#21252908">
                  {t('Support')}
                </Text>
                <Divider />
              </Card.Section>
              <Flex direction="column" w="100%">
                <Flex w="100%" direction="column" px={16} py={8} gap={8}>
                  <Text variant="body-4">
                    {t(
                      'For any assistance, please reach out to our support team at:'
                    )}
                  </Text>
                  <Anchor
                    href={`mailto:${dashboardInfo?.supportEmail}`}
                    target="_blank"
                    underline="always"
                    w="fit-content"
                  >
                    {dashboardInfo?.supportEmail || ''}
                  </Anchor>
                </Flex>
              </Flex>
            </Card>
          </Grid.Col>
        </Grid>
      </Flex>
      <FooterCommon />
    </Flex>
  );
};
