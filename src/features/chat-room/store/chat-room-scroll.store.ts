import { create } from 'zustand';

interface ChatRoomScrollStoreState {
  scrollToEnd: (() => void) | null;
  setScrollToEnd: (fn: (() => void) | null) => void;
}

export const useChatRoomScrollStore = create<ChatRoomScrollStoreState>(set => ({
  scrollToEnd: null,
  setScrollToEnd: fn => set({ scrollToEnd: fn }),
}));
