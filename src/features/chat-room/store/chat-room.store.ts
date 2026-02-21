import { create } from 'zustand';

import { FindOneConversationResponseData } from '@/api/generated/model';

interface ChatRoomStoreState {
  chatRoomId: string | null;
  chatRoomUserId: string | null;
  setChatRoomId: (chatRoomId: string | null) => void;
  chatRoomInfo: Partial<FindOneConversationResponseData>;
  setChatRoomUserId: (chatRoomUserId: string | null) => void;
  setChatRoomInfo: (chatRoom: Partial<FindOneConversationResponseData>) => void;
}

export const useChatRoomStore = create<ChatRoomStoreState>(set => ({
  chatRoomId: null,
  chatRoomInfo: null,
  chatRoomUserId: null,
  setChatRoomId: chatRoomId => set({ chatRoomId }),
  setChatRoomInfo: chatRoomInfo => set({ chatRoomInfo }),
  setChatRoomUserId: chatRoomUserId => set({ chatRoomUserId }),
}));
