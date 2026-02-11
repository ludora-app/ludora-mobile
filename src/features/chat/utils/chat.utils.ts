import { ConversationCollectionResponseData } from '@/api/generated/model';

export const isMessageRead = (conversation: ConversationCollectionResponseData, userMeId: string) => {
  const { content: lastMessageContent, globalStatus: lastMessageStatus } = conversation?.lastMessage || {};
  const { uid: senderId } = conversation?.sender || {};

  const isSenderMe = senderId === userMeId;

  const isLastMessageRead = lastMessageStatus === 'READ' || isSenderMe || !lastMessageContent;
  return isLastMessageRead;
};
