import {
  Anchor,
  Button,
  Center,
  Flex,
  Image,
  PinInput,
  Text,
} from '@mantine/core';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// import { setUserInfo } from '@/systems/systemSlice';
import { PasswordInputCustom } from '@/common/atoms/PasswordInputCustom';
import { TextInputCustom } from '@/common/atoms/TextInputCustom';
import Logo from '@/icons/Logo.svg';
import successIcon from '@/icons/success.svg';
import { routePaths } from '@/utils/constants/routePaths';
import { regexs } from '@/utils/constants/variables';
import { useForgotPassword } from './useForgotPassword';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    pageState,
    getValues,
    showResendLink,
    timeLeft,
    onResendOTP,
    onVerifyOTP,
    onNewPassword,
  } = useForgotPassword();
  return (
    <>
      <Flex
        justify="space-between"
        w="100%"
        px={{ base: 16, sm: 48 }}
        py={{ base: 16, sm: 24 }}
      >
        <Image radius="md" h="auto" w="auto" fit="contain" src={Logo} />
      </Flex>
      <Center mt={{ base: 64, sm: 0 }} px={{ base: 16, sm: 0 }}>
        {pageState === 'success' ? (
          <Flex
            direction="column"
            gap={32}
            w={472}
            justify="center"
            align="center"
          >
            <Image h="auto" w="100px" src={successIcon} />
            <Text variant="body-1" ta="center">
              {t('auth.forgotPassword.resetPasswordSuccessTitle')}
            </Text>
            <Text ta="center">
              {t('auth.forgotPassword.resetPasswordSubtitle')}
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" gap="32px" maw="400px" w="100%">
            {pageState === 'input' && (
              <>
                <Flex direction="column" gap="12px">
                  <Text variant="body-1">{t('auth.forgotPassword.title')}</Text>
                  <Text>{t('auth.forgotPassword.description')}</Text>
                </Flex>
                <Flex direction="column" gap="32px" w="100%" flex={1}>
                  <Flex direction="column" gap="8px" w="100%">
                    <Flex direction="column" gap="16px" w="100%">
                      <Controller
                        name="Email"
                        control={control}
                        rules={{
                          required:
                            t('auth.forgotPassword.emailErrorRequired') || true,
                          pattern: {
                            value: regexs.EMAIL,
                            message: t('auth.forgotPassword.emailErrorInvalid'),
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
                    </Flex>
                  </Flex>
                  <Flex direction="column">
                    <Button
                      loading={isSubmitting}
                      fullWidth
                      onClick={handleSubmit(onSubmit)}
                    >
                      {t('auth.forgotPassword.otpBtn')}
                    </Button>
                  </Flex>
                  <Flex justify="center">
                    <Anchor variant="link">
                      <Link
                        to={routePaths.LOGIN}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {t('auth.forgotPassword.backToLogin')}
                      </Link>
                    </Anchor>
                  </Flex>
                </Flex>
              </>
            )}
            {pageState === 'otp' && (
              <>
                <Flex direction="column" gap="12px">
                  <Text variant="body-1">
                    {t('auth.forgotPassword.otpTitle')}
                  </Text>
                  <Flex direction="row" gap={4}>
                    <Text component="span">
                      {t('auth.forgotPassword.otpDescription')}
                    </Text>
                    <Text variant="subtitle-1" component="span">
                      {getValues('Email')}
                    </Text>
                  </Flex>
                </Flex>
                <Flex direction="column">
                  <Flex direction="column" w="100%">
                    <Controller
                      name="OTP"
                      control={control}
                      render={({ field }) => (
                        <PinInput
                          type="number"
                          length={6}
                          inputMode="numeric"
                          placeholder=""
                          {...field}
                        />
                      )}
                    />
                  </Flex>
                  <Flex direction="column" mt="24px">
                    <Text>{t('auth.forgotPassword.didntReceiveOTP')}</Text>
                    {!showResendLink ? (
                      <Text variant="support-1">
                        {t('auth.forgotPassword.resendOTP', {
                          seconds: timeLeft,
                        })}
                      </Text>
                    ) : (
                      <Anchor
                        variant="link"
                        onClick={handleSubmit(onResendOTP)}
                      >
                        {t('auth.forgotPassword.resendOTPLink')}
                      </Anchor>
                    )}
                  </Flex>
                  <Flex direction="column" mt="24px" mb="28px">
                    <Button
                      loading={isSubmitting}
                      fullWidth
                      onClick={handleSubmit(onVerifyOTP)}
                    >
                      {t('auth.forgotPassword.verifyOTPBtn')}
                    </Button>
                  </Flex>
                  <Flex justify="center">
                    <Anchor variant="link">
                      <Link
                        to={routePaths.LOGIN}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {t('auth.forgotPassword.backToLogin')}
                      </Link>
                    </Anchor>
                  </Flex>
                </Flex>
              </>
            )}
            {pageState === 'newPassword' && (
              <>
                <Flex direction="column" gap="12px">
                  <Text variant="body-1">
                    {t('auth.forgotPassword.createNewPasswordTitle')}
                  </Text>
                  <Text>
                    {t('auth.forgotPassword.createNewPasswordDescription')}
                  </Text>
                </Flex>
                <Flex direction="column" gap="32px" w="100%" flex={1}>
                  <Flex direction="column" gap="8px" w="100%">
                    <Flex direction="column" gap="16px" w="100%">
                      <Controller
                        name="NewPassword"
                        control={control}
                        rules={{
                          required:
                            t('auth.forgotPassword.newPasswordErrorRequired') ||
                            true,
                          pattern: {
                            value: regexs.PASSWORD,
                            message: t(
                              'auth.forgotPassword.newPasswordErrorInvalid'
                            ),
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <PasswordInputCustom
                            label={t('auth.forgotPassword.newPasswordLabel')}
                            placeholder={t(
                              'auth.forgotPassword.newPasswordPlaceholder'
                            )}
                            {...field}
                            error={fieldState.error?.message}
                            variant="default"
                          />
                        )}
                      />
                      <Controller
                        name="ReEnterPassword"
                        control={control}
                        rules={{
                          required:
                            t(
                              'auth.forgotPassword.reEnterPasswordErrorRequired'
                            ) || true,
                          pattern: {
                            value: regexs.PASSWORD,
                            message: t(
                              'auth.forgotPassword.reEnterPasswordErrorInvalid'
                            ),
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <PasswordInputCustom
                            label={t(
                              'auth.forgotPassword.reEnterPasswordLabel'
                            )}
                            placeholder={t(
                              'auth.forgotPassword.reEnterPasswordPlaceholder'
                            )}
                            {...field}
                            error={fieldState.error?.message}
                            variant="default"
                          />
                        )}
                      />
                    </Flex>
                  </Flex>
                  <Flex direction="column">
                    <Button
                      loading={isSubmitting}
                      fullWidth
                      onClick={handleSubmit(onNewPassword)}
                    >
                      {t('auth.forgotPassword.createNewPasswordBtn')}
                    </Button>
                  </Flex>
                </Flex>
              </>
            )}
          </Flex>
        )}
      </Center>
    </>
  );
};
