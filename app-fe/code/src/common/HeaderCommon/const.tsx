// import { routePaths } from '@/utils/constants/routePaths';
import AnalysIcon from '@/icons/AnalysIcon.svg';
import LinkAggregationIcon from '@/icons/LinkAggregationIcon.svg';
import ShortLinksIcon from '@/icons/ShortLinksIcon.svg';
// import { t } from 'i18next';
const routePaths = {
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
export const ListURL = [
  {
    url: '',
    name: 'Shortlinks',
    icon: AnalysIcon,
  },
  { url: '', name: 'LinkAggregation', icon: LinkAggregationIcon },
  { url: '', name: 'LinkAggregation', icon: ShortLinksIcon },
];
export const LinkPage = [
  { url: '', name: 'Users' },
  { url: routePaths.SETTINGS_CUSTOM_DOMAIN, name: 'Custom Domain' },
  { url: '', name: 'Single sign-on' },
  { url: '', name: 'Plan & Billing' },
  { url: '', name: 'Webhooks' },
  { url: '', name: 'CSV bulk Shortening' },
  { url: '', name: 'Scheduled Redirects' },
  { url: '', name: 'Disclaimer' },
  { url: '', name: 'Monitoring' },
  { url: '', name: 'API Documentation ' },
  { url: '', name: 'Support ' },
  { url: '', name: 'Terms of use ' },
];
