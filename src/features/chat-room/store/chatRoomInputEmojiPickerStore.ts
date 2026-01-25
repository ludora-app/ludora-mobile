import { create } from 'zustand';

interface ChatRoomInputState {
  emojiValue: string;
  emojiCount: number;
  isEmojiPickerOpen: boolean;
  setEmojiValue: (value: string) => void;
  setEmojiPickerOpen: (value: boolean) => void;
}

const useChatRoomInputEmojiPickerStore = create<ChatRoomInputState>((set, get) => ({
  emojiCount: 0,
  emojiValue: '',
  isEmojiPickerOpen: false,
  setEmojiPickerOpen: value => {
    set({ isEmojiPickerOpen: value });
  },
  setEmojiValue: value => {
    set({ emojiCount: get().emojiCount + 1, emojiValue: value });
  },
}));

export default useChatRoomInputEmojiPickerStore;
