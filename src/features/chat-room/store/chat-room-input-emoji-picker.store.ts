import { create } from 'zustand';

interface ChatRoomInputState {
  emojiValue: string;
  emojiCount: number;
  isEmojiPickerOpen: boolean;
  toggleEmojiPicker: () => void;
  clearPendingEmoji: () => void;
  setEmojiValue: (value: string) => void;
  setEmojiPickerOpen: (value: boolean) => void;
  resetEmojiPickerOnConversationChange: () => void;
}

const useChatRoomInputEmojiPickerStore = create<ChatRoomInputState>((set, get) => ({
  clearPendingEmoji: () => set({ emojiCount: 0, emojiValue: '' }),
  emojiCount: 0,
  emojiValue: '',
  isEmojiPickerOpen: false,
  resetEmojiPickerOnConversationChange: () =>
    set({
      emojiCount: 0,
      emojiValue: '',
      isEmojiPickerOpen: false,
    }),
  setEmojiPickerOpen: value => {
    set({
      isEmojiPickerOpen: value,
    });
  },
  setEmojiValue: value => {
    set({ emojiCount: get().emojiCount + 1, emojiValue: value });
  },
  toggleEmojiPicker: () => {
    const nextOpen = !get().isEmojiPickerOpen;
    set({
      isEmojiPickerOpen: nextOpen,
    });
  },
}));

export default useChatRoomInputEmojiPickerStore;
