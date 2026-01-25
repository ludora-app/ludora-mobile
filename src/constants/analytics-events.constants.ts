import { Filters } from '@/features/filters/filters/store/filters.store';

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
    STEP_3_COMPLETED: 'create_session_step_3_completed',
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
    method: 'google' | 'email';
  };
  [ANALYTICS_EVENTS.AUTH.SIGNUP_FAILED]: {
    error_message: string;
    method: 'google' | 'email';
  };
  [ANALYTICS_EVENTS.AUTH.LOGIN_SUCCESS]: {
    method: 'google' | 'email';
    auto_login_from_signup?: boolean;
  };

  [ANALYTICS_EVENTS.AUTH.SIGNUP_SUCCESS]: {
    auto_register_from_login?: boolean;
    method: 'google' | 'email';
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

  // **
  // create session events
  // **
  [ANALYTICS_EVENTS.CREATE_SESSION.SESSION_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.CREATE_SESSION.STEP_1_COMPLETED]: {
    game_mode: string;
    level: number;
    sport: string;
    visibility: string;
  };
  [ANALYTICS_EVENTS.CREATE_SESSION.STEP_3_COMPLETED]: {
    has_title: boolean;
    has_description: boolean;
    has_team_a_name: boolean;
    has_team_b_name: boolean;
    title_source: 'user' | 'suggestion' | 'none';
  };
  [ANALYTICS_EVENTS.CREATE_SESSION.STEP_2_COMPLETED]: {
    end_date: string;
    field_uid: string;
    is_partner: boolean;
    price: number;
    price_per_player: number;
    slot_uid: string;
    start_date: string;
  };
  [ANALYTICS_EVENTS.CREATE_SESSION.SESSION_CREATED]: {
    end_date: string;
    field_uid: string;
    game_mode: string;
    is_partner: boolean;
    level: number;
    session_visibility: string;
    start_date: string;
  };

  // **
  // filters events
  // **
  [ANALYTICS_EVENTS.FILTERS.FILTER_FIELDS_APPLIED]: {
    filters: Partial<Filters>;
    numberOfFilters: number;
  };
  [ANALYTICS_EVENTS.FILTERS.FILTER_SESSIONS_ALL_APPLIED]: {
    numberOfFilters: number;
    filters: Partial<Filters>;
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
