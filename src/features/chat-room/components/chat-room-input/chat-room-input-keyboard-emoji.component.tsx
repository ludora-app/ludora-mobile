import { Box } from '@ludo/ui';
import { PropsWithChildren, useMemo } from 'react';
import { OverKeyboardView } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { EmojiType, fr, en, useRecentPicksPersistence, EmojiKeyboard } from 'rn-emoji-keyboard';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { useLanguages } from '@/hooks/languages.hook';
import { parse, serialize } from '@/utils/json.utils';
import { mmkvStorage } from '@/utils/mmkv-storage.utils';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

import useChatRoomInputEmojiPickerStore from '../../store/chat-room-input-emoji-picker.store';

type ChatRoomInputKeyboardEmojiProps = {
  style?: StyleProp<ViewStyle>;
};

export default function ChatRoomInputKeyboardEmoji(props: PropsWithChildren<ChatRoomInputKeyboardEmojiProps>) {
  const { children, style } = props;
  const isEmojiPickerOpen = useChatRoomInputEmojiPickerStore((state) => state.isEmojiPickerOpen);
  const setEmojiPickerOpen = useChatRoomInputEmojiPickerStore((state) => state.setEmojiPickerOpen);
  const setEmojiValue = useChatRoomInputEmojiPickerStore((state) => state.setEmojiValue);
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

  return (
    <OverKeyboardView visible={isEmojiPickerOpen}>
      <GestureHandlerRootView className="flex-1">
        <TouchableWithoutFeedback
          onPress={() => setEmojiPickerOpen(false)}
        >
          <Box className="flex-1 justify-end">
            {children}
            <Box
              style={style}
              className='bg-white'
              onStartShouldSetResponder={() => true}
            >
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
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </OverKeyboardView>
  );
}
