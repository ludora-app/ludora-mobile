import { Flatten } from '@/types';

const ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    NEW_PASSWORD: '/auth/new-password',
    REGISTER_STEP_1: '/auth/register/step-1',
    REGISTER_STEP_2: '/auth/register/step-2',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_CODE: '/auth/verify-code',
  },
  CREATE_SESSION: {
    INDEX: '/create-session',
    STEP_2_DURATION_FORM_SHEET: '/create-session/create-session-duration',
    STEP_3_PAYMENT: '/create-session/create-session-step-3-payment',
  },
  DEV_TOOLS: {
    INDEX: '/dev-tools',
    STORYBOOK: '/storybook',
  },
  FILTERS: {
    FILTER: '/filters',
    FILTER_ADDRESSES: '/filters/filters-addresses',
    FILTER_CALENDAR: '/filters/filters-calendar',
  },
  HOME: {
    INDEX: '/',
  },
  INVITE_PEOPLE: {
    INDEX: '/invite-people',
  },
  SESSION: {
    INDEX: '/session',
    INDEX_UID: (uid: string) => `/session/${uid}`,
    JOINED_UID: (uid: string) => `session/${uid}/session-joined`,
    TEAM_UID: (uid: string) => `/session/${uid}/session-teams`,
  },
} as const;

export type RouteValues = Flatten<typeof ROUTES>;

export default ROUTES;
