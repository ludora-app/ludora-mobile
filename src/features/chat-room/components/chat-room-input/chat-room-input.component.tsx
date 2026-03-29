import { cn } from '@chillui/ui';
import { useMemo, useState } from 'react';
import { Box, FormInput } from '@ludo/ui';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { IS_IOS } from '@/constants/platform.constants';

import { useChatRoomScrollStore } from '../../store/chat-room-scroll.store';
import ChatRoomInputSubmitButton from './chat-room-input-submit-button.component';
import { useChatRoomSessionTeam } from '../../utils/chat-room-session-team.utils';
import { ChatRoomInputSchema, schema } from '../../schemas/chat-room-input.schema';
import { useChatRoomMessageOptimisticQueue } from '../../queries/chat-room-message-queue/chat-room-message-queue.query';

export default function ChatRoomInput() {
  const { t } = useTranslate();
  const inputSchema = schema(t);
  const { color, isTeamA, type } = useChatRoomSessionTeam();
  const [isFocused, setIsFocused] = useState(false);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<ChatRoomInputSchema>({
    mode: 'onChange',
    resolver: zodResolver(inputSchema),
  });

  const { addOptimisticMessageToQueue } = useChatRoomMessageOptimisticQueue();
  const scrollToEnd = useChatRoomScrollStore(state => state.scrollToEnd);
  const errorMessage = errors?.message?.message;

  const onSubmit = (values: ChatRoomInputSchema) => {
    addOptimisticMessageToQueue(values.message, 'TEXT');
    setValue('message', '', { shouldValidate: true });
    setTimeout(() => scrollToEnd?.(), 100);
  };

  const focusedBorderColor = useMemo(() => {
    if (!isFocused) return '';
    if (type === 'SESSION' && !isTeamA) {
      return 'border-secondary';
    }
    return 'border-primary';
  }, [isFocused, isTeamA, type]);

  return (
    <Box className="flex-1 flex-row items-center gap-2">
      <FormInput
        control={control}
        name="message"
        className="max-h-36 flex-1"
        placeholder={t('common.message')}
        multiline
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        hasError={errorMessage === 'Message is too long'}
        hasMessageError={errorMessage === 'Message is too long'}
        inputContainerClassName={cn(focusedBorderColor)}
        cursorColor={color}
        selectionColor={IS_IOS ? color : `${color}70`}
        selectionHandleColor={color}
      />
      <ChatRoomInputSubmitButton onPress={handleSubmit(onSubmit)} isDisabled={!isValid} />
    </Box>
  );
}
