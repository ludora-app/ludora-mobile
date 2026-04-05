import { createStore } from 'zustand/vanilla';

import { FindOneConversationResponseData, SessionData } from '@/api/generated/model';

export interface ChatRoomStoreState {
  chatRoomId: string | null;
  chatRoomUserId: string | null;
  lastMessageCreatedAt: string | null;
  setChatRoomId: (chatRoomId: string | null) => void;
  setChatRoomUserId: (chatRoomUserId: string | null) => void;
  chatRoomInfo: Partial<FindOneConversationResponseData> | null;
  setLastMessageCreatedAt: (lastMessageCreatedAt: string | null) => void;
  setChatRoomInfo: (chatRoom: Partial<FindOneConversationResponseData> | null) => void;
  addChatRoomInfo: (
    chatRoomInfo: Partial<Omit<FindOneConversationResponseData, 'sessionData'>> & {
      sessionData?: Partial<SessionData> | null;
    },
  ) => void;
}

export const createChatRoomStore = () =>
  createStore<ChatRoomStoreState>(set => ({
    addChatRoomInfo: chatRoomInfo =>
      set(state => ({
        chatRoomInfo: {
          ...(state.chatRoomInfo || {}),
          ...chatRoomInfo,
          sessionData: {
            ...(state.chatRoomInfo?.sessionData || {}),
            ...chatRoomInfo.sessionData,
          } as SessionData,
        },
      })),
    chatRoomId: null,
    chatRoomInfo: null,
    chatRoomUserId: null,
    lastMessageCreatedAt: null,
    setChatRoomId: chatRoomId => set({ chatRoomId }),
    setChatRoomInfo: chatRoomInfo => set({ chatRoomInfo }),
    setChatRoomUserId: chatRoomUserId => set({ chatRoomUserId }),
    setLastMessageCreatedAt: lastMessageCreatedAt => set({ lastMessageCreatedAt }),
  }));
