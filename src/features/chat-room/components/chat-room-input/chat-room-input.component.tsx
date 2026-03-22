import { Box, FormInput } from '@ludo/ui';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useChatRoomScrollStore } from '../../store/chat-room-scroll.store';
import ChatRoomInputSubmitButton from './chat-room-input-submit-button.component';
import { ChatRoomInputSchema, schema } from '../../schemas/chat-room-input.schema';
import { useChatRoomMessageOptimisticQueue } from '../../queries/chat-room-message-queue/chat-room-message-queue.query';




export default function ChatRoomInput() {
  const { t } = useTranslate()
  const inputSchema = schema(t);
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
    setValue('message', "", { shouldValidate: true });
    setTimeout(() => scrollToEnd?.(), 100);
  };

  return (
    <Box className='flex-row items-center gap-2 flex-1'>
      <FormInput
        control={control}
        name="message"
        className="flex-1 max-h-36"
        placeholder={t('common.message')}
        multiline
        hasError={errorMessage === 'Message is too long'}
        hasMessageError={errorMessage === 'Message is too long'}
      />
      <ChatRoomInputSubmitButton onPress={handleSubmit(onSubmit)} isDisabled={!isValid} />
    </Box>
  );
}
