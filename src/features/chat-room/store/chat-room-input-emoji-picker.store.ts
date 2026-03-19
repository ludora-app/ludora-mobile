import { create } from 'zustand';

interface ChatRoomInputState {
  emojiValue: string;
  emojiCount: number;
  isEmojiPickerOpen: boolean;
  toggleEmojiPicker: () => void;
  setEmojiValue: (value: string) => void;
  setEmojiPickerOpen: (value: boolean) => void;
  /** Après insertion dans le champ : évite de réinjecter l’emoji au remount / changement de focus. */
  clearPendingEmoji: () => void;
  /** Nouvelle conversation : pending + fermeture du picker emoji. */
  resetEmojiPickerOnConversationChange: () => void;
}

const useChatRoomInputEmojiPickerStore = create<ChatRoomInputState>((set, get) => ({
  clearPendingEmoji: () => set({ emojiCount: 0, emojiValue: '' }),
  emojiCount: 0,
  emojiValue: '',
  isEmojiPickerOpen: false,
  resetEmojiPickerOnConversationChange: () => set({ emojiCount: 0, emojiValue: '', isEmojiPickerOpen: false }),
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
