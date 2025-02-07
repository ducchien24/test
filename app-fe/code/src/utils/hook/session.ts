import { selectUser, setUserInfo } from '@/common/systems/systemSlice';
import loginService from '@/services/loginService';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { routePaths } from '../constants/routePaths';
import { useAppSelector } from './redux';

export const useSession = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userState = useAppSelector(selectUser);
  const checkSession = async () => {
    try {
      const res = await loginService.getSession();
      const { success, data } = res;

      if (success && data instanceof CognitoUserSession) {
        const idToken = data.getIdToken();
        const accessToken = data.getAccessToken();
        const refreshToken = data.getRefreshToken();
        const idTokenPayload = JSON.parse(
          atob(idToken.getJwtToken().split('.')[1])
        );
        const email = idTokenPayload.email;
        const userInfo = {
          idToken: idToken.getJwtToken(),
          accessToken: accessToken.getJwtToken(),
          refreshToken: refreshToken.getToken(),
          name: idTokenPayload.name, // Trích xuất tên người dùng từ payload của idToken
          apiKey: idTokenPayload['custom:api_key_value'], // Thêm các thông tin cần thiết khác nếu có
          email,
          // Thêm các thông tin cần thiết khác nếu có
        };
        !userState && dispatch(setUserInfo(userInfo));
        if (pathname === routePaths.HOME) {
          navigate(routePaths.DASH_BOARD);
        }
      } else if (pathname === routePaths.HOME) {
        navigate(routePaths.HOME);
      } else {
        navigate(routePaths.LOGIN);
      }
    } catch (e) {
      navigate(routePaths.LOGIN);
    }
  };
  return { checkSession } as const;
};
