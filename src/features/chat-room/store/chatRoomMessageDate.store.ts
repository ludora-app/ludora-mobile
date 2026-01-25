import { create } from 'zustand';

type ChatRoomMessageDateStore = {
  messageCurrentDate: string | null;
  setMessageCurrentDate: (messageCurrentDate: string | null) => void;
};

export const useChatRoomMessageDateStore = create<ChatRoomMessageDateStore>(set => ({
  messageCurrentDate: null,
  setMessageCurrentDate: (messageCurrentDate: string | null) => set({ messageCurrentDate }),
}));
