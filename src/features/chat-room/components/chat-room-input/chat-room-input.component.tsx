import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { useCallback, useState } from 'react';
import { EmojiType } from 'rn-emoji-keyboard';
import { BoxRow, FormInput, Wrapper } from '@ludo/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import COLORS from '@/constants/colors.contstants';
import { useSafeArea } from '@/hooks/safe-area.hook';

import { schema } from '../../schemas/chat-room-input.schema';
import { useChatRoomScrollStore } from '../../store/chat-room-scroll.store';
import ChatRoomInputSubmitButton from './chat-room-input-submit-button.component';
import ChatRoomInputKeyboardEmoji from './chat-room-input-keyboard-emoji.component';
import useChatRoomInputEmojiPickerStore from '../../store/chat-room-input-emoji-picker.store';
import { useChatRoomMessageOptimisticQueue } from '../../queries/chat-room-message-queue.query';


export default function ChatRoomInput() {
  const { t } = useTranslate();
  const { bottom } = useSafeArea();
  const [cursorPosition, setCursorPosition] = useState(0);

  const inputSchema = schema(t)

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

  const inputValue = watch('message') || '';

  const { addOptimisticMessageToQueue } = useChatRoomMessageOptimisticQueue();
  const scrollToEnd = useChatRoomScrollStore(state => state.scrollToEnd);

  const { setEmojiPickerOpen } = useChatRoomInputEmojiPickerStore();

  const onSubmit = (values: z.infer<typeof inputSchema>) => {
    addOptimisticMessageToQueue(values.message, 'TEXT');
    setValue('message', '');
    setCursorPosition(0);
    setTimeout(() => scrollToEnd?.(), 100);
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
    <Wrapper style={{ paddingBottom: bottom }} className="pt-2">
      <ChatRoomInputKeyboardEmoji onSelect={handleEmojiPick} />
      <BoxRow className="items-center gap-2">
        <FormInput
          control={control}
          name="message"
          leftIconAction={{
            color: COLORS.primary,
            name: 'smileys-solid',
            onPress: () => {
              setEmojiPickerOpen(true);
            },
            pressEffectSize: 'xs',
          }}
          className="flex-1 max-h-36"
          onSelectionChange={handleSelectionChange}
          placeholder={t('common.message')}
          multiline
          hasError={errorMessage === "Message is too long"}
          hasMessageError={errorMessage === "Message is too long"}
        />
        <ChatRoomInputSubmitButton onPress={handleSubmit(onSubmit)} isDisabled={!isValid} />
      </BoxRow>
    </Wrapper>
  );
}
