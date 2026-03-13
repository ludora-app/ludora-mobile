import { create } from 'zustand';

interface ChatRoomInputState {
  emojiValue: string;
  emojiCount: number;
  isEmojiPickerOpen: boolean;
  toggleEmojiPicker: () => void;
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
  toggleEmojiPicker: () => {
    set({ isEmojiPickerOpen: !get().isEmojiPickerOpen });
  },
}));

export default useChatRoomInputEmojiPickerStore;
