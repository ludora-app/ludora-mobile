import { z } from 'zod';
import { TextInput } from 'react-native';
import { Box, FormInput } from '@ludo/ui';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { useShallow } from 'zustand/react/shallow';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import COLORS from '@/constants/colors.contstants';

import { schema } from '../../schemas/chat-room-input.schema';
import { useChatRoomScrollStore } from '../../store/chat-room-scroll.store';
import ChatRoomInputSubmitButton from './chat-room-input-submit-button.component';
import useChatRoomInputEmojiPickerStore from '../../store/chat-room-input-emoji-picker.store';
import { useChatRoomMessageOptimisticQueue } from '../../queries/chat-room-message-queue/chat-room-message-queue.query';

export default function ChatRoomInput() {
  const { t } = useTranslate()
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
  const inputRef = useRef<TextInput>(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const errorMessage = errors?.message?.message;
  const { addOptimisticMessageToQueue } = useChatRoomMessageOptimisticQueue();
  const scrollToEnd = useChatRoomScrollStore(state => state.scrollToEnd);

  const {
    clearPendingEmoji,
    emojiCount,
    emojiValue,
    isEmojiPickerOpen,
    toggleEmojiPicker,
  } = useChatRoomInputEmojiPickerStore(
    useShallow(state => ({
      clearPendingEmoji: state.clearPendingEmoji,
      emojiCount: state.emojiCount,
      emojiValue: state.emojiValue,
      isEmojiPickerOpen: state.isEmojiPickerOpen,
      toggleEmojiPicker: state.toggleEmojiPicker,
    })),
  );

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

  const handleSelectionChange = useCallback((event: { nativeEvent: { selection: { start: number } } }) => {
    setCursorPosition(event.nativeEvent.selection.start);
  }, []);

  const handleToggleEmoji = () => {
    toggleEmojiPicker();
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const onSubmit = (values: z.infer<typeof inputSchema>) => {
    addOptimisticMessageToQueue(values.message, 'TEXT');
    setValue('message', '');
    setCursorPosition(0);
    clearPendingEmoji();
    setTimeout(() => scrollToEnd?.(), 100);
  };



  return (
    <Box className='flex-row items-center gap-2 flex-1'>
      <FormInput
        ref={inputRef}
        control={control}
        name="message"
        inputAccessoryViewID="chat-room-input-accessory-view"
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
    </Box>
  );
}
