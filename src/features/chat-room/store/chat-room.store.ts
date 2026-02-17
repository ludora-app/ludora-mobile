import { create } from 'zustand';

interface ChatRoomStoreState {
  chatRoomId: string | null;
  setChatRoomId: (chatRoomId: string | null) => void;
}

export const useChatRoomStore = create<ChatRoomStoreState>(set => ({
  chatRoomId: null,
  setChatRoomId: (chatRoomId: string | null) => set({ chatRoomId }),
}));
