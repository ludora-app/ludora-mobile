import { ConversationCollectionResponseData } from '@/api/generated/model';

export const isMessageRead = (conversation: ConversationCollectionResponseData) => {
  const {
    content: lastMessageContent,
    globalStatus: lastMessageStatus,
    isSender: isLastMessageSenderMe,
  } = conversation?.lastMessage || {};

  const isLastMessageRead = lastMessageStatus === 'READ' || isLastMessageSenderMe || !lastMessageContent;
  return isLastMessageRead;
};
