const ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    NEW_PASSWORD: '/auth/new-password',
    REGISTER_STEP_1: '/auth/register/step-1',
    REGISTER_STEP_2: '/auth/register/step-2',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_CODE: '/auth/verify-code',
  },
  HOME: '/',
  SESSION: {
    CREATE_SESSION: '/create-session',
    DETAILS: '/session',
    FILTER: '(root)/(modals)/session-filter',
    TEAM: '/session/team',
  },
} as const;

export type RouteValues =
  | typeof ROUTES.HOME
  | (typeof ROUTES.AUTH)[keyof typeof ROUTES.AUTH]
  | (typeof ROUTES.SESSION)[keyof typeof ROUTES.SESSION];

export default ROUTES;
