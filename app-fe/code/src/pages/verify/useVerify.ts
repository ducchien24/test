import loginService from '@/services/loginService';
import { showCustomNotification } from '@/utils/commonFunc/func';
import { routePaths } from '@/utils/constants/routePaths';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

interface VerifyForm {
  OTP: string;
}

export const useVerify = () => {
  const { email, otp } = useParams();
  const navigate = useNavigate();
  const [showResendLink, setShowResendLink] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [visible, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    setShowResendLink(true);
  }, [timeLeft]);
  useEffect(() => {
    if (otp) {
      onVerifyOTP({ OTP: otp as string });
    }
  }, [otp]);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setValue,
  } = useForm<VerifyForm>({
    defaultValues: { OTP: otp },
  });
  const onResendOTP = async () => {
    try {
      await loginService.resendConfirmationCode(email as string);
    } catch (e: any) {
      showCustomNotification(e.message, t('errors'), 'error');
    } finally {
      navigate(`/verify/${email}`);
    }
  };
  const onVerifyOTP = async (values: VerifyForm) => {
    open();
    try {
      const res = await loginService.doConfirmRegistration(
        email as string,
        values.OTP as string
      );
      if (res.success) {
        showCustomNotification('Verify success', 'Success', 'success');
        setTimeout(() => {
          navigate(routePaths.LOGIN);
        }, 1000);
      } else {
        showCustomNotification(
          res.error?.toString() || '',
          t('errors'),
          'error'
        );
      }
    } catch (e: any) {
      showCustomNotification(e.message, t('errors'), 'error');
    } finally {
      close();
    }
  };

  return {
    email,
    otp,
    timeLeft,
    showResendLink,
    control,
    handleSubmit,
    isSubmitting,
    errors,
    getValues,
    setValue,
    onResendOTP,
    onVerifyOTP,
    visible,
  } as const;
};
