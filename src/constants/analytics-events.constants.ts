type JsonType = string | number | boolean | null | { [key: string]: JsonType } | JsonType[];

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
    RESET_PASSWORD_SEND_CODE_WITH_EMAIL_SUCCESS: 'reset_password_send_code_with_email_success',

    // Mot de passe oublié (reset password verify code)
    RESET_PASSWORD_VERIFY_CODE_FAILED: 'reset_password_verify_code_failed',
    RESET_PASSWORD_VERIFY_CODE_SUCCESS: 'reset_password_verify_code_success',

    // Mot de passe oublié (reset password new password)
    RESET_PASSWORD_NEW_PASSWORD_FAILED: 'reset_password_new_password_failed',
    RESET_PASSWORD_NEW_PASSWORD_SUCCESS: 'reset_password_new_password_success',
  },

  CREATE_SESSION: {
    SESSION_CREATED: 'create_session_completed',
    SESSION_FAILED: 'create_session_failed',
    STEP_1_COMPLETED: 'create_session_step_1_completed',
    STEP_2_COMPLETED: 'create_session_step_2_completed',
  },

  FILTERS: {
    FILTER_FIELDS_APPLIED: 'filter_fields_applied',
    FILTER_SESSIONS_ALL_APPLIED: 'filter_sessions_all_applied',
  },
  SESSION: {
    SESSION_JOINED: 'session_joined',
    SESSION_JOINED_FAILED: 'session_joined_failed',
    SESSION_TEAM_SELECTED: 'session_team_selected',
  },
} as const;

export interface AnalyticsEventData {

  // auth events
  [ANALYTICS_EVENTS.AUTH.RESET_PASSWORD_NEW_PASSWORD_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.AUTH.LOGIN_FAILED]: {
    error_message: string;
    method: "google" | "email";
  };
  [ANALYTICS_EVENTS.AUTH.SIGNUP_FAILED]: {
    error_message: string;
    method: "google" | "email";
  };
  [ANALYTICS_EVENTS.AUTH.LOGIN_SUCCESS]: {
    method: "google" | "email";
    auto_login_from_signup?: boolean;
  };

  [ANALYTICS_EVENTS.AUTH.SIGNUP_SUCCESS]: {
    auto_register_from_login?: boolean;
    method: "google" | "email";
  };
  

  // session events
  [ANALYTICS_EVENTS.SESSION.SESSION_TEAM_SELECTED]: {
    source_screen: string;
  };
  [ANALYTICS_EVENTS.SESSION.SESSION_JOINED_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.SESSION.SESSION_JOINED]: {
    session_uid: string;
    team_uid: string;
  };

  // forgot password events
  [ANALYTICS_EVENTS.AUTH.RESET_PASSWORD_VERIFY_CODE_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.AUTH.RESET_PASSWORD_SEND_CODE_WITH_EMAIL_FAILED]: {
    error_message: string;
  };


}

type DeepValue<T> = T extends string ? T : T extends object ? DeepValue<T[keyof T]> : never;

export type AnalyticsEvent = DeepValue<typeof ANALYTICS_EVENTS>;

export type AnalyticsEventWithDataType<T extends AnalyticsEvent> = T extends keyof AnalyticsEventData
  ? {
      eventName: T;
      data: AnalyticsEventData[T];
    }
  : {
      eventName: T;
      data?: Record<string, JsonType> | undefined;
    };
