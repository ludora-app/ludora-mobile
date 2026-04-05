import { InfiniteData } from '@tanstack/react-query';

import {
  MessageDtoType,
  PaginationResponseConversationCollectionResponseData,
  PaginationResponseMessageCollectionItemDto,
  UserSimpleDisplayWithUidData,
} from '@/api/generated/model';

// ─── WebSocket Types ─────────────────────────────────────────────

type WsResponse<T, E> = {
  data: T;
  error: E;
};

type WsDataSendMessageResponse = {
  conversationUid: string;
  messageUid: string;
};

type WsErrorSendMessageResponse = {
  code: string;
  message: string;
};

export type WsSendMessageResponse = WsResponse<WsDataSendMessageResponse, WsErrorSendMessageResponse>;

// ─── Message Types ───────────────────────────────────────────────

export type MessagesInfiniteData = InfiniteData<PaginationResponseMessageCollectionItemDto>;
export type ConversationsInfiniteData = InfiniteData<PaginationResponseConversationCollectionResponseData>;

export interface CreateMessageDto {
  file?: any;

  content?: string;

  sessionUid?: string;

  type: MessageDtoType;

  recipientUid?: string;

  conversationUid?: string;
}

// ─── Shared Context ──────────────────────────────────────────────

export interface MessageQueueContext {
  chatRoomId: string | null;
  chatRoomUserId: string | null;
  lastMessageCreatedAt: string | null;
  setChatRoomId: (id: string | null) => void;
  setChatRoomUserId: (id: string | null) => void;
  getQueryKey: () => readonly unknown[] | undefined;
  currentUserSender: UserSimpleDisplayWithUidData | undefined;
}

// ─── Constants ───────────────────────────────────────────────────

export const ERROR_SENDING_MESSAGE = 'MESSAGE_SEND_FAILED';
export const MESSAGE_SEND_TIMEOUT_MS = 15_000;
export const CONVERSATIONS_LIST_QUERY_KEY = '/conversations/list/collection';
