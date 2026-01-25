import { create } from 'zustand';

interface ChatRoomInputState {
  isInputValueEmpty: boolean;
  setIsInputValueEmpty: (isInputValueEmpty: boolean) => void;
}

const useChatRoomInputStore = create<ChatRoomInputState>(set => ({
  isInputValueEmpty: true,
  setIsInputValueEmpty: isInputValueEmpty => set({ isInputValueEmpty }),
}));

export default useChatRoomInputStore;
