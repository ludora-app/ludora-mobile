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
  CHAT_ROOM: {
    INDEX: '/chat-room/[chatRoomId]',
    INDEX_UID: (chatRoomId: string) => `/chat-room/${chatRoomId}`,
    MESSAGE_ACTIONS: '/chat-room/[chatRoomId]/message-actions/[messageId]',
    MESSAGE_ACTIONS_UID: ({ chatRoomId, messageId }: { chatRoomId: string; messageId: string }) =>
      `/chat-room/${chatRoomId}/message-actions/${messageId}`,
  },
  CREATE_SESSION: {
    INDEX: '/create-session',
    STEP_1: '/create-session/step-1',
    STEP_2: '/create-session/step-2',
    STEP_2_DURATION_FORM_SHEET: '/create-session/step-2/public-field-duration',
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
  INVITE_PEOPLE: {
    INDEX: '/invite-people',
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
    JOINED_UID: (uid: string) => `session/${uid}/session-joined`,
    TEAM_UID: (uid: string) => `/session/${uid}/session-teams`,
  },
  SETTINGS: {
    FAVORITES: '/settings/favorites',
    HISTORY: '/settings/history',
    INDEX: '/settings',
    PLANNING: '/settings/planning',
    PREFERENCES: '/settings/preferences',
    PRIVACY_POLICY: '/settings/privacy-policy',
    TERMS: '/settings/terms',
  },
  TABS: {
    INDEX: '/(tabs)',
    PLAYERS: '/(tabs)/players',
  },
} as const;

export type RouteValues = Flatten<typeof ROUTES>;

export default ROUTES;
