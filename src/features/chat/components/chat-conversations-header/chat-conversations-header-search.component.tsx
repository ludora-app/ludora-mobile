import { useEffect, useRef } from 'react';
import { isString, debounce } from 'radash';
import { useTranslate } from '@tolgee/react';
import { FormInput, Wrapper } from '@ludo/ui';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useChatStore } from '../../store/chat.store';
import { ChatInputSchema, schema } from '../../schemas/chat.schema';

const DEBOUNCE_DELAY = 300;

export default function ChatConversationsHeaderSearch() {
  const { t } = useTranslate();
  const { control } = useForm<ChatInputSchema>({
    resolver: zodResolver(schema),
  });

  const search = useWatch({ control, name: 'search' });
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
    <Wrapper className="pt-safe-offset-1">
      <FormInput
        control={control}
        name="search"
        placeholder={t('chat.search_placeholder')}
        inputContainerClassName="rounded-full"
        leftIconAction={{
          color: '#000',
          name: 'search-regular',
        }}
      />
    </Wrapper>
  );
}
