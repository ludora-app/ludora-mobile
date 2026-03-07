import { Filters } from '@/features/filters/filters/store/filters.store';
import {
  FindMeUserResponseDataSex,
  SportPreferenceResponseDataGameModesItem,
  SportPreferenceResponseDataLevel,
  SportPreferenceResponseDataSport,
} from '@/api/generated/model';

type JsonType = string | number | boolean | null | Date | { [key: string]: JsonType } | JsonType[];

export const ANALYTICS_EVENTS = {
  MY_FIELDS: {
    ADD_FIELD_FAILED: 'add_field_failed',
    ADD_FIELD_SUCCESS: 'add_field_success',
  },
  // Global
  API_SLOW_REQUEST: 'api_slow_request',

  // Onboarding
  ONBOARDING: {
    ONBOARDING_COMPLETED: 'onboarding_completed',
    ONBOARDING_FAILED: 'onboarding_failed',
  },

  // Dialog Confirm
  DIALOG_CONFIRM: {
    DIALOG_CONFIRM_OPEN: 'dialog_confirm_open',
  },

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

    // Mot de passe oublié (reset password verify code resend)
    RESET_PASSWORD_VERIFY_CODE_RESEND_FAILED: 'reset_password_verify_code_resend_failed',
    RESET_PASSWORD_VERIFY_CODE_RESEND_SUCCESS: 'reset_password_verify_code_resend_success',
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
    PLAYERS_SUGGESTIONS_APPLIED: 'players_suggestions_applied',
  },
  PROFIL: {
    PROFIL_EDIT_AVATAR_FAILED: 'profil_edit_avatar_failed',
    PROFIL_EDIT_AVATAR_SUCCESS: 'profil_edit_avatar_success',
    PROFIL_EDIT_BIO_FAILED: 'profil_edit_bio_failed',
    PROFIL_EDIT_BIO_SUCCESS: 'profil_edit_bio_success',
    PROFIL_EDIT_BIRTHDATE_FAILED: 'profil_edit_birthdate_failed',
    PROFIL_EDIT_BIRTHDATE_SUCCESS: 'profil_edit_birthdate_success',
    PROFIL_EDIT_EMAIL_FAILED: 'profil_edit_email_failed',
    PROFIL_EDIT_EMAIL_SUCCESS: 'profil_edit_email_success',
    PROFIL_EDIT_NAME_FAILED: 'profil_edit_name_failed',
    PROFIL_EDIT_NAME_SUCCESS: 'profil_edit_name_success',
    PROFIL_EDIT_PASSWORD_FAILED: 'profil_edit_password_failed',
    PROFIL_EDIT_PASSWORD_SUCCESS: 'profil_edit_password_success',
    PROFIL_EDIT_SEX_FAILED: 'profil_edit_sex_failed',
    PROFIL_EDIT_SEX_SUCCESS: 'profil_edit_sex_success',
    PROFIL_HEADER_ACTIONS_BLOCK_USER: 'profil_header_actions_blocked_user',
    PROFIL_HEADER_ACTIONS_REPORT_USER: 'profil_header_actions_reported_user',
  },
  SESSION: {
    SESSION_JOINED: 'session_joined',
    SESSION_JOINED_FAILED: 'session_joined_failed',
    SESSION_LEFT: 'session_left_completed',
    SESSION_LEFT_FAILED: 'session_left_failed',
    SESSION_SHARED: 'session_shared',
    SESSION_TEAM_SELECTED: 'session_team_selected',
  },
  SETTINGS: {
    SETTINGS_PLANNING_EDIT_FAILED: 'settings:settings_planning_edit_failed',
    SETTINGS_PLANNING_EDIT_SUCCESS: 'settings:settings_planning_edit_success',
    SETTINGS_PREFERENCES_SPORTS_EDIT_FAILED: 'settings:settings_preferences_sports_edit_failed',
    SETTINGS_PREFERENCES_SPORTS_EDIT_SUCCESS: 'settings:settings_preferences_sports_edit_success',
  },
} as const;

export interface AnalyticsEventData {
  // onboarding events
  [ANALYTICS_EVENTS.ONBOARDING.ONBOARDING_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.ONBOARDING.ONBOARDING_COMPLETED]: {
    has_sport_preferences: boolean;
    has_profile_picture: boolean;
  };

  // auth events
  [ANALYTICS_EVENTS.AUTH.RESET_PASSWORD_NEW_PASSWORD_FAILED]: {
    error_message: string;
    flow: 'Authentication';
  };
  [ANALYTICS_EVENTS.AUTH.LOGIN_FAILED]: {
    error_message: string;
    method: 'google' | 'email';
    flow: 'Authentication';
  };
  [ANALYTICS_EVENTS.AUTH.SIGNUP_FAILED]: {
    error_message: string;
    method: 'google' | 'email';
    flow: 'Authentication';
  };
  [ANALYTICS_EVENTS.AUTH.LOGIN_SUCCESS]: {
    method: 'google' | 'email';
    auto_login_from_signup?: boolean;
    flow: 'Authentication';
  };

  [ANALYTICS_EVENTS.AUTH.SIGNUP_SUCCESS]: {
    auto_register_from_login?: boolean;
    method: 'google' | 'email';
    flow: 'Authentication';
  };

  // session events
  [ANALYTICS_EVENTS.SESSION.SESSION_LEFT]: {
    session_uid: string;
  };
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
  [ANALYTICS_EVENTS.SESSION.SESSION_LEFT_FAILED]: {
    session_uid: string;
    error_message: string;
  };

  // forgot password events
  [ANALYTICS_EVENTS.AUTH.RESET_PASSWORD_VERIFY_CODE_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.AUTH.RESET_PASSWORD_VERIFY_CODE_RESEND_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.AUTH.RESET_PASSWORD_SEND_CODE_WITH_EMAIL_FAILED]: {
    error_message: string;
  };

  // **
  // create session events
  // **
  [ANALYTICS_EVENTS.MY_FIELDS.ADD_FIELD_SUCCESS]: {
    sport: string;
  };
  [ANALYTICS_EVENTS.MY_FIELDS.ADD_FIELD_FAILED]: {
    error_message: string;
  };
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
    has_description: boolean;
    has_team_a_name: boolean;
    has_team_b_name: boolean;
    has_title: boolean;
    title_source: 'user' | 'suggestion' | 'none';
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
  [ANALYTICS_EVENTS.FILTERS.PLAYERS_SUGGESTIONS_APPLIED]: {
    numberOfFilters: number;
    filters: Partial<Filters>;
  };

  // **
  // profil events
  // **
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_BIO_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_SEX_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_NAME_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_EMAIL_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_AVATAR_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_PASSWORD_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_BIRTHDATE_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_SEX_SUCCESS]: {
    is_sex_added: boolean;
    is_sex_updated: boolean;
  };
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_AVATAR_SUCCESS]: {
    is_avatar_added: boolean;
    is_avatar_updated: boolean;
  };
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_NAME_SUCCESS]: {
    is_firstname_changed: boolean;
    is_lastname_changed: boolean;
  };
  [ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_BIO_SUCCESS]: {
    is_bio_added: boolean;
    is_bio_removed: boolean;
    is_bio_updated: boolean;
  };

  // **
  // settings events
  // **
  [ANALYTICS_EVENTS.SETTINGS.SETTINGS_PLANNING_EDIT_FAILED]: {
    error_message: string;
  };
  [ANALYTICS_EVENTS.SETTINGS.SETTINGS_PREFERENCES_SPORTS_EDIT_FAILED]: {
    error_message: string;
  };

  [ANALYTICS_EVENTS.SETTINGS.SETTINGS_PLANNING_EDIT_SUCCESS]: {
    is_planning_added: boolean;
    is_planning_removed: boolean;
    is_planning_updated: boolean;
  };
  [ANALYTICS_EVENTS.SETTINGS.SETTINGS_PREFERENCES_SPORTS_EDIT_SUCCESS]: {
    is_sport_preference_added: boolean;
    is_sport_preference_removed: boolean;
    is_sport_preference_updated: boolean;
  };

  // **
  // dialog confirm events
  // **
  [ANALYTICS_EVENTS.DIALOG_CONFIRM.DIALOG_CONFIRM_OPEN]: {
    source: string;
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

export type TrackIdentityProperties = {
  sports_preferences?: SportPreferenceResponseDataSport[];
  level_padel?: SportPreferenceResponseDataLevel;
  level_tennis?: SportPreferenceResponseDataLevel;
  level_football?: SportPreferenceResponseDataLevel;
  level_basketball?: SportPreferenceResponseDataLevel;
  game_mode_padel?: SportPreferenceResponseDataGameModesItem[];
  game_mode_tennis?: SportPreferenceResponseDataGameModesItem[];
  game_mode_football?: SportPreferenceResponseDataGameModesItem[];
  game_mode_basketball?: SportPreferenceResponseDataGameModesItem[];
  gender?: FindMeUserResponseDataSex;
  birthdate?: string;
};
