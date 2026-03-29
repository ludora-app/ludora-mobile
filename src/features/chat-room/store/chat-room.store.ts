import { create } from 'zustand';

import { FindOneConversationResponseData, SessionData } from '@/api/generated/model';

interface ChatRoomStoreState {
  chatRoomId: string | null;
  chatRoomUserId: string | null;
  setChatRoomId: (chatRoomId: string | null) => void;
  setChatRoomUserId: (chatRoomUserId: string | null) => void;
  chatRoomInfo: Partial<FindOneConversationResponseData> | null;
  setChatRoomInfo: (chatRoom: Partial<FindOneConversationResponseData> | null) => void;
  addChatRoomInfo: (
    chatRoomInfo: Partial<Omit<FindOneConversationResponseData, 'sessionData'>> & {
      sessionData?: Partial<SessionData> | null;
    },
  ) => void;
}

export const useChatRoomStore = create<ChatRoomStoreState>(set => ({
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
  setChatRoomId: chatRoomId => set({ chatRoomId }),
  setChatRoomInfo: chatRoomInfo => set({ chatRoomInfo }),
  setChatRoomUserId: chatRoomUserId => set({ chatRoomUserId }),
}));
