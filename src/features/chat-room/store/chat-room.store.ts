import { create } from 'zustand';

interface ChatRoomStoreState {
  chatRoomId: string | null;
  chatRoomUserId: string | null;
  setChatRoomId: (chatRoomId: string | null) => void;
  setChatRoomUserId: (chatRoomUserId: string | null) => void;
}

export const useChatRoomStore = create<ChatRoomStoreState>(set => ({
  chatRoomId: null,
  chatRoomUserId: null,
  setChatRoomId: chatRoomId => set({ chatRoomId }),
  setChatRoomUserId: chatRoomUserId => set({ chatRoomUserId }),
}));
