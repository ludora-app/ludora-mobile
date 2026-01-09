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
    FIELD_CARD_PUBLIC_AVAILIBILITIES_FORM_SHEET: '/create-session/create-session-field-card-public-availibilities',
    INDEX: '/create-session',
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
  INVITE_PEOPLE: {
    INDEX: '/invite-people',
  },
  SESSION: {
    DETAILS: '/session',
    FILTER: '(root)/(modals)/session-filter',
    TEAM: '/session/team',
  },
} as const;

export type RouteValues =
  | (typeof ROUTES.AUTH)[keyof typeof ROUTES.AUTH]
  | (typeof ROUTES.CREATE_SESSION)[keyof typeof ROUTES.CREATE_SESSION]
  | (typeof ROUTES.DEV_TOOLS)[keyof typeof ROUTES.DEV_TOOLS]
  | (typeof ROUTES.SESSION)[keyof typeof ROUTES.SESSION]
  | (typeof ROUTES.FILTERS)[keyof typeof ROUTES.FILTERS]
  | (typeof ROUTES.INVITE_PEOPLE)[keyof typeof ROUTES.INVITE_PEOPLE];

export default ROUTES;
