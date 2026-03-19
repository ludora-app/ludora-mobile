import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { useShallow } from 'zustand/react/shallow';
import { zodResolver } from '@hookform/resolvers/zod';
import { BoxRow, FormInput, Wrapper } from '@ludo/ui';
import { Keyboard, TextInput as RNTextInput } from 'react-native';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import COLORS from '@/constants/colors.contstants';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { useKeyboardStore } from '@/stores/keyboard.store';

import { schema } from '../../schemas/chat-room-input.schema';
import { useChatRoomStore } from '../../store/chat-room.store';
import { useChatRoomScrollStore } from '../../store/chat-room-scroll.store';
import ChatRoomInputSubmitButton from './chat-room-input-submit-button.component';
import useChatRoomInputEmojiPickerStore from '../../store/chat-room-input-emoji-picker.store';
import { useChatRoomMessageOptimisticQueue } from '../../queries/chat-room-message-queue/chat-room-message-queue.query';


const ANDROID_SAFE_AREA_BOTTOM = 5;

export default function ChatRoomInput() {
  const { t } = useTranslate();
  const { insetsBottom } = useSafeArea();
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<RNTextInput>(null);

  const chatRoomId = useChatRoomStore(state => state.chatRoomId);
  const chatRoomUserId = useChatRoomStore(state => state.chatRoomUserId);

  const { clearPendingEmoji, emojiCount, emojiValue, isEmojiPickerOpen, resetEmojiPickerOnConversationChange, toggleEmojiPicker } =
    useChatRoomInputEmojiPickerStore(
      useShallow(state => ({
        clearPendingEmoji: state.clearPendingEmoji,
        emojiCount: state.emojiCount,
        emojiValue: state.emojiValue,
        isEmojiPickerOpen: state.isEmojiPickerOpen,
        resetEmojiPickerOnConversationChange: state.resetEmojiPickerOnConversationChange,
        toggleEmojiPicker: state.toggleEmojiPicker,
      })),
    );
  const isKeyboardVisible = useKeyboardStore((state) => state.isVisible);

  const inputSchema = schema(t);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm<z.infer<typeof inputSchema>>({
    mode: 'onChange',
    resolver: zodResolver(inputSchema),
  });

  const errorMessage = errors?.message?.message;


  const { addOptimisticMessageToQueue } = useChatRoomMessageOptimisticQueue();
  const scrollToEnd = useChatRoomScrollStore((state) => state.scrollToEnd);

  const conversationKey = chatRoomId ?? chatRoomUserId ?? null;
  useEffect(() => {
    resetEmojiPickerOnConversationChange();
  }, [conversationKey, resetEmojiPickerOnConversationChange]);

  useLayoutEffect(() => {
    if (emojiCount > 0 && emojiValue) {
      const currentMessage = watch('message') || '';
      const textBeforeCursor = currentMessage.substring(0, cursorPosition);
      const textAfterCursor = currentMessage.substring(cursorPosition);
      const newText = textBeforeCursor + emojiValue + textAfterCursor;

      setValue('message', newText, { shouldValidate: true });

      const newPosition = cursorPosition + emojiValue.length;
      setCursorPosition(newPosition);
      clearPendingEmoji();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emojiCount]);

  const onSubmit = (values: z.infer<typeof inputSchema>) => {
    addOptimisticMessageToQueue(values.message, 'TEXT');
    setValue('message', '');
    setCursorPosition(0);
    clearPendingEmoji();
    setTimeout(() => scrollToEnd?.(), 100);
  };

  const handleSelectionChange = useCallback((event: { nativeEvent: { selection: { start: number } } }) => {
    setCursorPosition(event.nativeEvent.selection.start);
  }, []);

  const handleToggleEmoji = () => {
    if (isEmojiPickerOpen) {
      inputRef.current?.focus();
    } else {
      if (isKeyboardVisible) {
        Keyboard.dismiss();
      }
      toggleEmojiPicker();
    }
  };

  return (
    <Wrapper style={{ paddingBottom: insetsBottom + (ANDROID_SAFE_AREA_BOTTOM ? 5 : 0) }} className="pt-2">
      <BoxRow className="items-center gap-2">
        <FormInput
          ref={inputRef}
          control={control}
          name="message"
          leftIconAction={{
            color: COLORS.primary,
            name: isEmojiPickerOpen ? 'keyboard-solid' : 'smileys-solid',
            onPress: handleToggleEmoji,
            pressEffectSize: 'xs',
          }}
          className="flex-1 max-h-36"
          onSelectionChange={handleSelectionChange}
          placeholder={t('common.message')}
          multiline
          hasError={errorMessage === 'Message is too long'}
          hasMessageError={errorMessage === 'Message is too long'}
        />
        <ChatRoomInputSubmitButton onPress={handleSubmit(onSubmit)} isDisabled={!isValid} />
      </BoxRow>
    </Wrapper>
  );
}
