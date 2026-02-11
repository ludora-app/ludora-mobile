import { create } from 'zustand';

type ChatRoomMessageDateStore = {
  messageCurrentDate: Date | null;
  setMessageCurrentDate: (date: Date | null) => void;
};

export const useChatRoomMessageOnScreenDateStore = create<ChatRoomMessageDateStore>(set => ({
  messageCurrentDate: null,
  setMessageCurrentDate: (date: Date | null) => set({ messageCurrentDate: date }),
}));
