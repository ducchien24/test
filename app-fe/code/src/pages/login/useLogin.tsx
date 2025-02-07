import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '@/common/systems/systemSlice';
import loginService from '@/services/loginService';
import { showCustomNotification } from '@/utils/commonFunc/func';
import { routePaths } from '@/utils/constants/routePaths';
import { useAppDispatch } from '@/utils/hook/redux';

interface LoginForm {
  Username: string;
  Password: string;
  isRememberMe: boolean;
}

const loginFormDefault = {
  Username: '',
  Password: '',
  isRememberMe: true,
};

export const useLogin = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: loginFormDefault,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //   const [firstTimeLoginState, setFirstTimeLoginState] = useState<any | null>(null);
  //   const [verifyState, setVerifyState] = useState<any | null>(null);

  const onSubmit = async (values: any) => {
    const response = await loginService.authenticate(
      values.Username,
      values.Password,
      values.isRememberMe
    );
    const { success, data, error } = response;
    if (data?.type === 'onSuccess' && success) {
      const { type, ...user } = data;
      if (user instanceof CognitoUserSession) {
        const idToken = user.getIdToken();
        const accessToken = user.getAccessToken();
        const refreshToken = user.getRefreshToken();
        const idTokenPayload = JSON.parse(
          atob(idToken.getJwtToken().split('.')[1])
        );
        const email = idTokenPayload.email;
        const userInfo = {
          idToken: idToken.getJwtToken(),
          accessToken: accessToken.getJwtToken(),
          refreshToken: refreshToken.getToken(),
          name: idTokenPayload.name,
          apiKey: idTokenPayload['custom:api_key_value'],
          email,
        };
        dispatch(setUserInfo(userInfo));
      }
      navigate(routePaths.DASH_BOARD);
    } else if (data?.type === 'newPasswordRequired') {
      showCustomNotification(
        'You need to change your password.',
        'Password Change Required',
        'error'
      );
      // setFirstTimeLoginState(res);
    } else if (data?.type === 'userNotConfirmedException') {
      showCustomNotification(
        'Your account is not confirmed. Please check your email for confirmation instructions.',
        'User Not Confirmed',
        'error'
      );
      // setVerifyState(res);
    }
    if (error) {
      error.toString() &&
        showCustomNotification(error?.toString(), undefined, 'error');
    }
  };

  //   const handleVerifySuccess = () => {
  //     // setFirstTimeLoginState(null);
  //     // setVerifyState(null);
  //     handleSubmit(onSubmit)();
  //   };
  return {
    handleSubmit,
    onSubmit,
    navigate,
    control,
    t,
    isSubmitting,
  };
};
