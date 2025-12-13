import { User } from '../api/utils/api.types';

export const WS_ROOMS = {
  chat: (userID: string) => `chat_${userID}`,
  chatUserConnectedCenter: (centerID: string) => `chatUsersConnected_${centerID}`,
  chatUsers: (userID: string) => `chat_users_${userID}`,
  invitation: (userId: string) => `selfOnboardingInvitation_${userId}`,
  notificationCenter: (userId: string) => `notificationCenter_${userId}`,
  onBoardingUser: (userId: string) => `onBoardingUser_${userId}`,
};

export const WS_RESOURCES = {
  INVITATION: 'INVITATION',
  MESSAGE: 'MESSAGE',
  STRIPE: 'STRIPE',
} as const;

export type TWebSocketMessage<T = any> = {
  action: string;
  resource: (typeof WS_RESOURCES)[keyof typeof WS_RESOURCES];
  payload: T;
  hostname?: string;
  userId?: string;
  wsHostname?: string;
};

export type TPayloadConnectedUsers =
  | {
      id: string;
      userConnectStatus: User['connectStatus'];
    }
  | { items: { id: string; userConnectStatus: User['connectStatus'] }[] };
