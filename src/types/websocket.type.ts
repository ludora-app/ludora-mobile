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
  MESSAGES_READ: 'MESSAGES_READ',
  NEW_MESSAGE: 'NEW_MESSAGE',
  SESSION_INVITATION: 'SESSION_INVITATION',
} as const;

export type TWebSocketMessage = {
  data: any;
  type: (typeof WS_TYPES)[keyof typeof WS_TYPES];
  title: string;
  timestamp: string;
  message: string;
};
