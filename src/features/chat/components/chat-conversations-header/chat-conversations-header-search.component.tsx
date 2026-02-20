import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, WrapperSafeAreaView } from '@ludo/ui';

import { useChatStore } from '../../store/chat.store';
import { ChatInputSchema, schema } from '../../schemas/chat.schema';



export default function ChatConversationsHeaderSearch() {
  const { control, watch } = useForm<ChatInputSchema>(
    {
      resolver: zodResolver(schema),
    }
  );

  const search = watch('search');

  const setFilters = useChatStore((state) => state.setFilters);

  useEffect(() => {
    setFilters({ name: search });
  }, [search, setFilters]);

  return (
    <WrapperSafeAreaView edges={['top']} fill={false}>
      <FormInput
        control={control}
        name="search"
        placeholder="Rechercher une conversation..."
        inputContainerClassName="rounded-full"
        leftIconAction={{
          color: '#000',
          name: 'search-regular',
        }}
      />
    </WrapperSafeAreaView>
  );
}
