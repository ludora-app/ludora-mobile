import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useShallow } from 'zustand/react/shallow';
import { EmojiType, fr, en, useRecentPicksPersistence, EmojiKeyboard } from 'rn-emoji-keyboard';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { useLanguages } from '@/hooks/languages.hook';
import { parse, serialize } from '@/utils/json.utils';
import { mmkvStorage } from '@/utils/mmkv-storage.utils';
import { useKeyboardStore } from '@/stores/keyboard.store';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

import useChatRoomInputEmojiPickerStore from '../../store/chat-room-input-emoji-picker.store';

type ChatRoomInputKeyboardEmojiProps = {
  style?: ViewStyle;
};

export default function ChatRoomInputKeyboardEmoji({ style }: ChatRoomInputKeyboardEmojiProps) {
  const { isEmojiPickerOpen, setEmojiValue } = useChatRoomInputEmojiPickerStore(
    useShallow((state) => ({
      isEmojiPickerOpen: state.isEmojiPickerOpen,
      setEmojiValue: state.setEmojiValue,
    })),
  );
  const isKeyboardVisible = useKeyboardStore((state) => state.isVisible);
  const { getLanguage } = useLanguages();
  const { insetsBottom } = useSafeArea();

  const handlePick = (emojiObject: EmojiType) => {
    setEmojiValue(emojiObject.emoji);
  };

  const getKeyboardLocale = useMemo(() => {
    const locale = getLanguage();
    if (locale === 'fr') return fr;
    return en;
  }, [getLanguage]);

  useRecentPicksPersistence({
    initialization: () => {
      const data = mmkvStorage.getString(MMKV_STORAGE_KEY.EMOJI_PICKER_RECENT_PICKS);
      return data ? parse(data) : [];
    },
    onStateChange: (nextState) => {
      mmkvStorage.setItem(MMKV_STORAGE_KEY.EMOJI_PICKER_RECENT_PICKS, serialize(nextState));
    },
  });

  if (!isEmojiPickerOpen && !isKeyboardVisible) {
    return <Animated.View style={style} />;
  }

  return (
    <Animated.View style={style}>
      <Animated.View style={{ flex: 1, opacity: isEmojiPickerOpen ? 1 : 0 }}>
        <EmojiKeyboard
          onEmojiSelected={handlePick}
          translation={getKeyboardLocale}
          hideHeader
          categoryPosition="top"
          enableRecentlyUsed
          styles={{
            container: {
              borderRadius: 0,
              paddingBottom: insetsBottom,
              paddingTop: 0,
            },
          }}
        />
      </Animated.View>
    </Animated.View>
  );
}
