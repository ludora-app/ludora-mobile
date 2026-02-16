export const WS_ROOMS = {
  chat: (userID: string) => `chat_${userID}`,
  chatUserConnectedCenter: (centerID: string) => `chatUsersConnected_${centerID}`,
  chatUsers: (userID: string) => `chat_users_${userID}`,
  invitation: (userId: string) => `selfOnboardingInvitation_${userId}`,
  notificationCenter: (userId: string) => `notificationCenter_${userId}`,
  onBoardingUser: (userId: string) => `onBoardingUser_${userId}`,
};

export const WS_TYPES = {
  FRIEND_ACCEPTED: 'FRIEND_ACCEPTED',
  FRIEND_REQUEST: 'FRIEND_REQUEST',
  SESSION_INVITATION: 'SESSION_INVITATION',
} as const;

export type TWebSocketMessage = {
  data: Record<string, string>;
  type: (typeof WS_TYPES)[keyof typeof WS_TYPES];
  title: string;
  timestamp: string;
  message: string;
};
