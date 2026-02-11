import { useMemo } from 'react';
import EmojiPicker, { EmojiType, fr, en, useRecentPicksPersistence } from 'rn-emoji-keyboard';

import { useLanguages } from '@/hooks/languages.hook';
import { parse, serialize } from '@/utils/json.utils';
import { mmkvStorage } from '@/utils/mmkv-storage.utils';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

import useChatRoomInputEmojiPickerStore from '../../store/chat-room-input-emoji-picker.store';

type ChatRoomInputKeyboardEmojiProps = {
  onSelect: (emoji: EmojiType) => void;
};

export default function ChatRoomInputKeyboardEmoji({ onSelect }: ChatRoomInputKeyboardEmojiProps) {
  const { isEmojiPickerOpen, setEmojiPickerOpen } = useChatRoomInputEmojiPickerStore();
  const { getLanguage } = useLanguages();

  const handlePick = (emojiObject: EmojiType) => {
    onSelect(emojiObject);
    setEmojiPickerOpen(false);
  };

  const getKeyboardLocale = useMemo(() => {
    const locale = getLanguage();
    if (locale === 'fr') return fr;
    return en;
  }, [getLanguage]);

  useRecentPicksPersistence({
    initialization: () => parse(mmkvStorage.getString(MMKV_STORAGE_KEY.EMOJI_PICKER_RECENT_PICKS)),
    onStateChange: next => mmkvStorage.setItem(MMKV_STORAGE_KEY.EMOJI_PICKER_RECENT_PICKS, serialize(next)),
  });

  return (
    <EmojiPicker
      onEmojiSelected={handlePick}
      open={isEmojiPickerOpen}
      onClose={() => setEmojiPickerOpen(false)}
      translation={getKeyboardLocale}
      enableRecentlyUsed
      categoryPosition="top"
    />
  );
}
