import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { isString, debounce } from 'radash';
import { FormInput, Wrapper } from '@ludo/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useChatStore } from '../../store/chat.store';
import { ChatInputSchema, schema } from '../../schemas/chat.schema';

const DEBOUNCE_DELAY = 300;


export default function ChatConversationsHeaderSearch() {
  const { control, watch } = useForm<ChatInputSchema>({
    resolver: zodResolver(schema),
  });

  const search = watch('search');
  const setFilters = useChatStore(state => state.setFilters);

  const debouncedSearchRef = useRef(
    debounce({ delay: DEBOUNCE_DELAY }, (searchValue: string) => {
      setFilters({ name: searchValue });
    }),
  );

  useEffect(() => {
    if (isString(search)) {
      debouncedSearchRef.current(search);
    }
  }, [search]);

  return (
    <Wrapper className='pt-safe-offset-1'>
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
    </Wrapper>
  );
}
