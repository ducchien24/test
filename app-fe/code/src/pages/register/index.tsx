import { Button, Center, Flex, Image, Text } from '@mantine/core';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// import { setUserInfo } from '@/systems/systemSlice';
import { PasswordInputCustom } from '@/common/atoms/PasswordInputCustom';
import { TextInputCustom } from '@/common/atoms/TextInputCustom';
import Logo from '@/icons/Logo.svg';
import { routePaths } from '@/utils/constants/routePaths';
import { regexs } from '@/utils/constants/variables';
import { useRegister } from './useRegister';

export const Register = () => {
  const { t } = useTranslation();

  const { navigate, control, isSubmitting, handleSubmit, onSubmit } =
    useRegister();
  return (
    <>
      <Flex
        justify="space-between"
        w="100%"
        px={{ base: 16, sm: 48 }}
        py={{ base: 16, sm: 24 }}
      >
        <Image radius="md" h="auto" w="auto" fit="contain" src={Logo} />
        <Flex direction="row" gap="8px" justify-content="center" align="center">
          <Text visibleFrom="sm">
            {t('auth.signup.registerNowDescription')}
          </Text>
          <Button variant="outline-2" onClick={() => navigate(routePaths.LOGIN)}>
            {t('auth.signup.loginBtn')}
          </Button>
        </Flex>
      </Flex>
      <Center mt={{ base: 60, sm: 0 }}>
        <Flex
          direction="column"
          gap={32}
          maw={400}
          w="100%"
          px={{ base: 16, sm: 0 }}
        >
          <Flex direction="column" gap="12px">
            <Text variant="body-1">{t('auth.signup.title')}</Text>
            <Text>{t('auth.signup.description')}</Text>
          </Flex>
          <Flex direction="column" gap="32px" w="100%" flex={1}>
            <Flex direction="column" gap="8px" w="100%">
              <Flex direction="column" gap="16px" w="100%">
                <Controller
                  name="Username"
                  control={control}
                  rules={{
                    required: t('fieldRequired') || true,
                    // pattern: {
                    //   value: regexs.EMAIL,
                    //   message: t('invalidUsername'),
                    // },
                  }}
                  render={({ field, fieldState }) => (
                    <TextInputCustom
                      label={t('userName')}
                      placeholder={t('auth.signup.userNamePlaceholder')}
                      {...field}
                      error={fieldState.error?.message}
                      variant="default"
                    />
                  )}
                />
                <Controller
                  name="Email"
                  control={control}
                  rules={{
                    required: t('fieldRequired') || true,
                    pattern: {
                      value: regexs.EMAIL,
                      message: t('invalidEmail'),
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextInputCustom
                      label={t('email')}
                      placeholder={t('auth.signup.emailPlaceholder')}
                      {...field}
                      error={fieldState.error?.message}
                      variant="default"
                    />
                  )}
                />
                <Controller
                  name="Password"
                  control={control}
                  rules={{ required: t('fieldRequired') || true }}
                  render={({ field, fieldState }) => (
                    <PasswordInputCustom
                      label={t('password')}
                      placeholder={t('auth.signup.passwordPlaceholder')}
                      type="password"
                      {...field}
                      error={fieldState.error?.message}
                      styles={{ input: { height: '44px' } }}
                    />
                  )}
                />
              </Flex>
            </Flex>
            <Flex direction="column" gap="16px">
              <Button
                loading={isSubmitting}
                fullWidth
                onClick={handleSubmit(onSubmit)}
              >
                {t('auth.signup.registerBtn')}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};
