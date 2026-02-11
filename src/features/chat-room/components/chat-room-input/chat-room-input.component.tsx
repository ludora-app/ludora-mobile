import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { useCallback, useState } from 'react';
import { EmojiType } from 'rn-emoji-keyboard';
import { useLocalSearchParams } from 'expo-router';
import { BoxRow, FormInput, Wrapper } from '@ludo/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import COLORS from '@/constants/COLORS';
import { useSafeArea } from '@/hooks/safe-area.hook';

import ChatRoomInputSubmitButton from './chat-room-input-submit-button.component';
import { ChatRoomInputSchema, schema } from '../../schemas/chat-room-input.schema';
import ChatRoomInputKeyboardEmoji from './chat-room-input-keyboard-emoji.component';
import useChatRoomInputEmojiPickerStore from '../../store/chat-room-input-emoji-picker.store';
import { useChatRoomMessageOptimisticQueue } from '../../queries/chat-room-message-queue.query';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px -4px 10px 0px rgba(0, 0, 0, 0.1)',
  },
});

export default function ChatRoomInput() {
  const { bottom } = useSafeArea();
  const [cursorPosition, setCursorPosition] = useState(0);

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm<ChatRoomInputSchema>({
    resolver: zodResolver(schema),
  });
  const inputValue = watch('message') || '';

  const { id: chatRoomId } = useLocalSearchParams<{ id: string }>();

  const { addOptimisticMessageToQueue } = useChatRoomMessageOptimisticQueue(chatRoomId);

  const { setEmojiPickerOpen } = useChatRoomInputEmojiPickerStore();

  const onSubmit = (values: ChatRoomInputSchema) => {
    addOptimisticMessageToQueue(values.message, 'TEXT');
    setValue('message', '');
    setCursorPosition(0);
  };

  const handleEmojiPick = (emoji: EmojiType) => {
    if (!emoji || emoji === undefined || emoji.emoji === undefined) return;
    const textBeforeCursor = inputValue.substring(0, cursorPosition);
    const textAfterCursor = inputValue.substring(cursorPosition);
    const newText = textBeforeCursor + emoji.emoji + textAfterCursor;
    setValue('message', newText, { shouldValidate: true });
    setCursorPosition(cursorPosition + emoji.emoji.length);
  };

  const handleSelectionChange = useCallback((event: { nativeEvent: { selection: { start: number } } }) => {
    setCursorPosition(event.nativeEvent.selection.start);
  }, []);

  return (
    <Wrapper style={[styles.shadow, { paddingBottom: bottom }]} className="bg-white pt-2">
      <ChatRoomInputKeyboardEmoji onSelect={handleEmojiPick} />
      <BoxRow className="items-center gap-2">
        <FormInput
          control={control}
          name="message"
          leftIconAction={{
            color: COLORS.muted,
            name: 'emoji-smile-grinning-regular',
            onPress: () => {
              setEmojiPickerOpen(true);
            },
            pressEffectSize: 'xs',
          }}
          className="flex-1"
          onSelectionChange={handleSelectionChange}
        />
        <ChatRoomInputSubmitButton onPress={handleSubmit(onSubmit)} isDisabled={!isValid} />
      </BoxRow>
    </Wrapper>
  );
}
