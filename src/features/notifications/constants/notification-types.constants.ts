import { TIconsAll } from '@/constants/icons.constants';

export const SESSION_NOTIFICATION_TYPES = [
  'SESSION_INVITATION',
  'SESSION_JOINED',
  'SESSION_CANCELLED',
  'SESSION_REMINDER',
  'SESSION_UPDATED',
] as const;

export type TSessionNotificationType = (typeof SESSION_NOTIFICATION_TYPES)[number];

export const NOTIFICATION_ICON_MAP: Record<string, TIconsAll> = {
  DEFAULT: 'bell-regular',
  FRIEND_ACCEPTED: 'heart-regular',
  FRIEND_REQUEST: 'user-regular',
  SESSION_CANCELLED: 'info-circle-regular',
  SESSION_INVITATION: 'calendar-regular',
  SESSION_JOINED: 'user-regular',
  SESSION_REMINDER: 'bell-regular',
  SESSION_UPDATED: 'calendar-regular',
} as const;
