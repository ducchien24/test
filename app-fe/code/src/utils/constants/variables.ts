import { IAuthenticationCallback } from 'amazon-cognito-identity-js';

export const localStorageVariables = {
  USER_INFO: 'USER_INFO',
};

export const BREAKPOINTS = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1400,
} as const;

export const regexs = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  USERNAME: /^[a-zA-Z0-9]+$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

export type AuthenticationCallbackTypes = keyof IAuthenticationCallback;

export const saleDetailTabs = [
  { labelId: 'request' },
  { labelId: 'quotation' },
  { labelId: 'negotiation' },
  { labelId: 'operations' },
  { labelId: 'booking' },
  { labelId: 'conversation' },
  { labelId: 'internalNotes' },
];

export const dateFormats = {
  CURRENT_MONTH_FORMAT: 'MM-YYYY',
  DDMMYYYY: 'DD-MM-YYYY',
  DDMMYYYY_SLASH: 'DD/MM/YYYY',
  hhmm: 'HH:mm',
};
export const langs = {
  en: 'en',
  vi: 'vi',
};
