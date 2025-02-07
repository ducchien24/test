import { createBrowserRouter, RouteObject } from 'react-router-dom';
import AuthProvider from '@/common/AuthProvider';
// import AuthProvider from "@common/AuthProvider";
import { LayoutAuthPage } from '@/common/Layout/LayoutAuthPage';
import SettingLayout from '@/common/Layout/SettingLayout';
import { DashBoard } from '@/pages/dashboard';
import { ForgotPassword } from '@/pages/forgot-password';
import { HomePage } from '@/pages/home';
import { Login } from '@/pages/login';
import { NotFoundPage } from '@/pages/NotFound.page';
import { Register } from '@/pages/register';
import { CusTomDomain } from '@/pages/settings/custom-domain';
import { VerifyPage } from '@/pages/verify';


import PageDomainNoReq  from '@/pages/settings/custom-domain-by-chien/DomainPage/PageDomainNoReq'

// import ForgotPassword from '@/features/forgotPassword/ForgotPassword';
// import Login from '@/features/login/Login';

// import Test from '@/features/test';

// import LoggedQuote from "features/quote/LoggedQuote";

export const routePaths = {
  HOME: '/',
  // SALE: '/sales',
  // SALE_DETAIL: (id?: string) => `/quote/summary/${id ?? ':id'}`,
  SALE_CREATE: '/quote/summary',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  REGISTER: '/register',
  VERIFY: '/verify/:email/:otp?',
  DASH_BOARD: '/dashboard',
  SETTINGS_CUSTOM_DOMAIN: '/settings/custom-domain',
  SETTINGS: '/settings',
};

export interface IChildrenRoute {
  icon: JSX.Element;
  name: string;
  pathRoute: string;
  activeRoutes?: string[];
}

export interface IArrayRoute {
  folderName: string;
  childrenRoute: IChildrenRoute[];
}

const routeObjects: RouteObject[] = [
  {
    path: routePaths.LOGIN,
    element: (
      <LayoutAuthPage>
        <Login />
      </LayoutAuthPage>
    ),
  },
  {
    path: routePaths.HOME,
    element: (
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    ),
  },
  {
    path: routePaths.REGISTER,
    element: (
      <LayoutAuthPage>
        <Register />
      </LayoutAuthPage>
    ),
  },
  {
    path: routePaths.VERIFY,
    element: (
      <LayoutAuthPage>
        <VerifyPage />
      </LayoutAuthPage>
    ),
  },
  {
    path: routePaths.FORGOT_PASSWORD,
    element: (
      <LayoutAuthPage>
        <ForgotPassword />
      </LayoutAuthPage>
    ),
  },

  {
    path: routePaths.DASH_BOARD,
    element: (
      <AuthProvider>
        <DashBoard />
      </AuthProvider>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: routePaths.SETTINGS,
    element: (
      <AuthProvider>
        <SettingLayout />
      </AuthProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { element:
        <PageDomainNoReq/>,
        //  <CusTomDomain />,
         path: routePaths.SETTINGS_CUSTOM_DOMAIN },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  // {
  //   path: routePaths.ACCOUNT,
  //   element: (
  //     <AuthProvider>
  //       <AccountLayout />
  //     </AuthProvider>
  //   ),
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to={routePaths.ACCOUNT_PROFILE} />,
  //     },
  //     {
  //       path: routePaths.ACCOUNT_PROFILE,
  //       element: <Profile />,
  //     },
  //     {
  //       path: routePaths.ACCOUNT_PASSWORD,
  //       element: <ResetPassword />,
  //     },
  //     {
  //       path: routePaths.ACCOUNT_NOTIFICATION_SETTING,
  //       element: <NotificationSetting />,
  //     },
  //     // {
  //     //   path: routePaths.ACCOUNT_CREATE_QUOTE,
  //     //   element: <LoggedQuote />,
  //     // },
  //   ],
  // },
];

export const routers = createBrowserRouter(routeObjects);
