import { PasswordInputCustom } from '@/common/atoms/PasswordInputCustom';
import { TextInputCustom } from '@/common/atoms/TextInputCustom';
import Logo from '@/icons/Logo.svg';
import { routePaths } from '@/utils/constants/routePaths';
import { Anchor, Button, Center, Flex, Image, Text } from '@mantine/core';
import { Controller } from 'react-hook-form';
import { useLogin } from './useLogin';
import { Link } from 'react-router-dom';

export const Login = () => {
  const { control, handleSubmit, isSubmitting, navigate, onSubmit, t } =
    useLogin();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        justify="space-between"
        w="100%"
        px={{ base: 16, sm: 48 }}
        py={{ base: 16, sm: 24 }}
      >
        <Image radius="md" h="auto" w="auto" fit="contain" src={Logo} />
        <Flex direction="row" gap="8px" justify="center" align="center">
          <Text variant="body-4" visibleFrom="sm">
            {t('auth.signin.registerNowDescription')}
          </Text>
          <Button
            variant="outline-2"
            onClick={() => navigate(routePaths.REGISTER)}
          >
            {t('auth.signin.registerNow')}
          </Button>
        </Flex>
      </Flex>
      <Center mt={{ base: 60, sm: 0 }}>
        <Flex
          direction="column"
          gap="32px"
          maw="400px"
          w="100%"
          px={{ base: 16, sm: 0 }}
        >
          <Flex direction="column" gap="12px">
            <Text variant="body-1">{t('auth.signin.title')}</Text>
            <Text variant="body-4">{t('auth.signin.description')}</Text>
          </Flex>
          <Flex direction="column" gap="32px" w="100%" flex={1}>
            <Flex direction="column" gap="8px" w="100%">
              <Flex direction="column" gap="16px" w="100%">
                <Controller
                  name="Username"
                  control={control}
                  rules={{
                    required: t('errors.email.message') || true,
                  }}
                  render={({ field, fieldState }) => (
                    <TextInputCustom
                      label={t('email')}
                      placeholder={t('email')}
                      {...field}
                      error={fieldState.error?.message}
                      variant="default"
                    />
                  )}
                />
                <Controller
                  name="Password"
                  control={control}
                  rules={{ required: t('errors.password.message') || true }}
                  render={({ field, fieldState }) => (
                    <PasswordInputCustom
                      label={t('password')}
                      placeholder={t('password')}
                      type="password"
                      {...field}
                      error={fieldState.error?.message}
                      styles={{ input: { height: '44px' } }}
                    />
                  )}
                />
              </Flex>
              <Flex justify="flex-end">
                <Anchor>
                  <Link
                    to={routePaths.FORGOT_PASSWORD}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {t('forgotPassword')}
                  </Link>
                </Anchor>
              </Flex>
            </Flex>
            <Flex direction="column" gap="16px">
              <Button loading={isSubmitting} fullWidth type="submit">
                {t('login')}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </form>
  );
};
