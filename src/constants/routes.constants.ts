import { Flatten } from '@/types';

const ROUTES = {
  APP_CHECK: {
    INDEX: '/app-check',
  },
  AUTH: {
    LOGIN: '/auth/login',
    NEW_PASSWORD: '/auth/new-password',
    REGISTER_STEP_1: '/auth/register/step-1',
    REGISTER_STEP_2: '/auth/register/step-2',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_CODE: '/auth/verify-code',
  },
  CHAT_ROOM: {
    INDEX: '/chat-room/[chatRoomId]',
    INDEX_UID: (chatRoomId: string) => `/chat-room/${chatRoomId}`,
    INFO_PRIVATE: '/chat-room/[chatRoomId]/info/private',
    INFO_PRIVATE_UID: (chatRoomId: string) => `/chat-room/${chatRoomId}/info/private`,
    INFO_SESSION: '/chat-room/[chatRoomId]/info/session',
    INFO_SESSION_UID: (chatRoomId: string) => `/chat-room/${chatRoomId}/info/session`,
    MESSAGE_ACTIONS: '/chat-room/[chatRoomId]/message-actions/[messageId]',
    MESSAGE_ACTIONS_UID: ({ chatRoomId, messageId }: { chatRoomId: string; messageId: string }) =>
      `/chat-room/${chatRoomId}/message-actions/${messageId}`,
    USER_PROFILE: '/chat-room/user-profile/[userId]',
    USER_PROFILE_UID: (userId: string) => `/chat-room/user-profile/${userId}`,
  },
  CREATE_SESSION: {
    INDEX: '/create-session',
    STEP_1: '/create-session/step-1',
    STEP_2: '/create-session/step-2',
    STEP_2_DURATION_FORM_SHEET: '/public-field-duration',
    STEP_3: '/create-session/step-3',
    STEP_3_PAYMENT: '/create-session/create-session-step-3-payment',
    STEP_4: '/create-session/step-4',
    STEP_5: '/(root)/create-session/step-5',
  },
  CREATE_SESSION_CREATED: {
    INDEX: '/(root)/create-session-created',
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
  IMAGE_PICKER: {
    INDEX: '/image-picker',
  },
  INVITE_FRIENDS: {
    INDEX: '/invite-friends',
    INDEX_UID: (sessionUid: string) => `/invite-friends/${sessionUid}`,
  },
  LEGAL: {
    CGU_MENTIONS: '/legal/cgu-mentions',
    CGV: '/legal/cgv',
    NON_DISCRIMINATION: '/legal/non-discrimination',
    PRIVACY: '/legal/privacy',
  },
  MY_FIELDS: {
    ADD: '/my-fields/add',
    INDEX: '/my-fields',
  },
  NOT_FOUND: {
    INDEX: '/not-found',
  },
  NOTIFICATIONS: {
    INDEX: '/notifications',
  },
  ON_BOARDING: {
    STEP_1: '/on-boarding/step-1',
    STEP_2: '/on-boarding/step-2',
    STEP_3: '/on-boarding/step-3',
  },
  PROFIL: {
    ACTIONS: '/profil/[id]/actions',
    ACTIONS_UID: (uid: string) => `/profil/${uid}/actions`,
    EDIT: '/profil/profil-edit',
    EDIT_BIO: '/profil/profil-edit/bio',
    EDIT_BIRTHDATE: '/profil/profil-edit/birthdate',
    EDIT_EMAIL: '/profil/profil-edit/email',
    EDIT_NAME: '/profil/profil-edit/name',
    EDIT_PASSWORD: '/profil/profil-edit/password',
    EDIT_SEX: '/profil/profil-edit/sex',
    INDEX: '/profil/[id]/index',
    INDEX_UID: (uid: string) => `/profil/${uid}`,
  },
  SESSION: {
    INDEX: '/session',
    INDEX_UID: (uid: string) => `/session/${uid}`,
    JOINED: '/session/[id]/session-joined',
    JOINED_UID: (uid: string) => `session/${uid}/session-joined`,
    TEAM_UID: (uid: string) => `/session/${uid}/session-teams`,
  },
  SETTINGS: {
    BLOCKED_USERS: '/settings/blocked-users',
    CONTACT: '/settings/contact',
    FAQ: '/settings/faq',
    FAVORITES: '/settings/favorites',
    FRIENDS: '/settings/friends',
    HISTORY: '/settings/history',
    INDEX: '/settings',
    PLANNING: '/settings/planning',
    PREFERENCES: '/settings/preferences',
  },
  TABS: {
    INDEX: '/(tabs)',
    PLAYERS: '/(tabs)/players',
  },
} as const;

export type RouteValues = Flatten<typeof ROUTES>;

export default ROUTES;
