export const ANALYTICS_EVENTS = {
  // Global
  API_SLOW_REQUEST: 'api_slow_request',

  // Auth Flow
  AUTH: {
    // Inscription
    SIGNUP_FAILED: 'signup_failed',
    SIGNUP_REQUESTED: 'signup_requested',
    SIGNUP_SUCCESS: 'signup_success',

    // Connexion
    LOGIN_FAILED: 'login_failed',
    LOGIN_REQUESTED: 'login_requested',
    LOGIN_SUCCESS: 'login_success',

    // Mot de passe oublié (reset password send code with email)
    RESET_PASSWORD_SEND_CODE_WITH_EMAIL_FAILED: 'reset_password_send_code_with_email_failed',
    RESET_PASSWORD_SEND_CODE_WITH_EMAIL_REQUESTED: 'reset_password_send_code_with_email_requested',
    RESET_PASSWORD_SEND_CODE_WITH_EMAIL_SUCCESS: 'reset_password_send_code_with_email_success',

    // Mot de passe oublié (reset password verify code)
    RESET_PASSWORD_VERIFY_CODE_FAILED: 'reset_password_verify_code_failed',
    RESET_PASSWORD_VERIFY_CODE_REQUESTED: 'reset_password_verify_code_requested',
    RESET_PASSWORD_VERIFY_CODE_SUCCESS: 'reset_password_verify_code_success',

    // Mot de passe oublié (reset password new password)
    RESET_PASSWORD_NEW_PASSWORD_FAILED: 'reset_password_new_password_failed',
    RESET_PASSWORD_NEW_PASSWORD_REQUESTED: 'reset_password_new_password_requested',
    RESET_PASSWORD_NEW_PASSWORD_SUCCESS: 'reset_password_new_password_success',
  },

  CREATE_SESSION: {
    SESSION_CREATED: 'create_session_completed',
    STEP_1_COMPLETED: 'create_session_step_1_completed',
    STEP_2_COMPLETED: 'create_session_step_2_completed',
  },
} as const;

type DeepValue<T> = T extends string ? T : T extends object ? DeepValue<T[keyof T]> : never;

export type AnalyticsEvent = DeepValue<typeof ANALYTICS_EVENTS>;
