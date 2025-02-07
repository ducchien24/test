import Logo from '@/icons/Logo.svg';
import { routePaths } from '@/utils/constants/routePaths';
import {
  Anchor,
  Button,
  Center,
  Flex,
  Image,
  LoadingOverlay,
  PinInput,
  Text,
} from '@mantine/core';
import { t } from 'i18next';
import { Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useVerify } from './useVerify';

export const VerifyPage = () => {
  const {
    email,
    timeLeft,
    showResendLink,
    control,
    handleSubmit,
    isSubmitting,
    onResendOTP,
    onVerifyOTP,
    visible,
  } = useVerify();
  const navigate = useNavigate();
  return (
    <>
      <LoadingOverlay visible={visible} />
      <Flex justify="space-between" w="100%" px={48} py={24}>
        <Image radius="md" h="auto" w="auto" fit="contain" src={Logo} />
        <Flex direction="row" gap="8px" justify-content="center" align="center">
          <Text>{t('auth.signup.registerNowDescription')}</Text>
          <Button
            variant="outline-2"
            onClick={() => navigate(routePaths.LOGIN)}
          >
            {t('auth.signup.loginBtn')}
          </Button>
        </Flex>
      </Flex>
      <Center>
        <Flex direction="column" gap="32px" maw="400px" w="100%">
          <>
            <Flex direction="column" gap="12px">
              <Text variant="body-1">{t('auth.forgotPassword.otpTitle')}</Text>
              <Flex direction="row" gap={4}>
                <Text component="span">
                  {t('auth.forgotPassword.otpDescription')}
                </Text>
                <Text variant="subtitle-1" component="span">
                  {email}
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
                    {t('auth.forgotPassword.resendOTP', { seconds: timeLeft })}
                  </Text>
                ) : (
                  <Anchor variant="link" onClick={handleSubmit(onResendOTP)}>
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
        </Flex>
      </Center>
    </>
  );
};
