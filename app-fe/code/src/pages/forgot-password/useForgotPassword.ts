import loginService from '@/services/loginService';
import { showCustomNotification } from '@/utils/commonFunc/func';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordForm {
  Email: string;
  OTP: string;
  NewPassword: string;
  ReEnterPassword: string;
}

type ForgotPasswordPageState = 'input' | 'otp' | 'newPassword' | 'success';
const forgotPasswordFormDefault = {
  Email: '',
  OTP: '',
  NewPassword: '',
  ReEnterPassword: '',
};
export const useForgotPassword = () => {
  const [pageState, setPageState] = useState<ForgotPasswordPageState>('input');

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResendLink, setShowResendLink] = useState(false);
  const [currentCognitoUser, setCurrentCognitoUser] = useState<CognitoUser>();
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    setShowResendLink(true);
  }, [timeLeft]);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    setValue,
  } = useForm<ForgotPasswordForm>({
    defaultValues: forgotPasswordFormDefault,
  });

  const onSubmit = async (values: any) => {
    try {
      const { data } = await loginService.forgotPassword(values.Email);
      setCurrentCognitoUser(data?.cognitoUser);
      setPageState('otp');
      setTimeLeft(60);
    } catch (e: any) {
      showCustomNotification(e.message, t('error'), 'error');
    }
  };
  const onResendOTP = async (values: ForgotPasswordForm) => {
    setShowResendLink(false);
    setTimeLeft(60);
    setValue('OTP', '');
    try {
      await loginService.resendConfirmationCode(values.Email);
    } catch (e: any) {
      showCustomNotification(e.message, t('error'), 'error');
    }
  };
  const onVerifyOTP = async () => {
    setPageState('newPassword');
  };

  const onNewPassword = async (values: ForgotPasswordForm) => {
    if (!currentCognitoUser) {
      return;
    }
    try {
      const { success, error } = await loginService.confirmPassword(
        currentCognitoUser,
        values.OTP,
        values.NewPassword
      );
      if (success) {
        setPageState('success');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        showCustomNotification(error?.toString() || '', t('error'), 'error');
        setPageState('otp');
      }
    } catch (err: any) {
      showCustomNotification(err.message, t('error'), 'error');
      setPageState('otp');
    }
  };

  return {
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    pageState,
    getValues,
    showResendLink,
    timeLeft,
    onResendOTP,
    setValue,
    onVerifyOTP,
    onNewPassword,
  };
};
