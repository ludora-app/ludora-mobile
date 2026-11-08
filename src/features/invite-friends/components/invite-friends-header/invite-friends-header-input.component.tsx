import { debounce, isString } from 'radash';
import { useTranslate } from '@tolgee/react';
import { FormInput, Wrapper } from '@ludo/ui';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useRef } from 'react';

import { inviteFriendsSearchSchema } from '../../schemas/invite-friends.schema';
import { useInviteFriendsFilterStore } from '../../stores/invite-friends-filter.store';
import InviteFriendsHeaderInvitedFriends from './invite-friends-header-invited-friends.component';

export default function InviteFriendsHeaderInput() {
  const { t } = useTranslate();
  const setFilter = useInviteFriendsFilterStore(state => state.setFilter);
  const { control } = useForm({
    defaultValues: { search: '' },
    resolver: zodResolver(inviteFriendsSearchSchema),
  });
  const inputValue = useWatch({ control, name: 'search' });

  const handleSearch = useCallback(
    async (searchValue: string) => {
      setFilter({ name: searchValue });
    },
    [setFilter],
  );

  const debouncedSearchRef = useRef(
    debounce({ delay: 300 }, (searchValue: string) => {
      handleSearch(searchValue);
    }),
  );

  useEffect(() => {
    if (isString(inputValue)) {
      debouncedSearchRef.current(inputValue);
    }
  }, [inputValue]);

  return (
    <>
      <Wrapper fill={false} className="gap-3 bg-white pt-2 pb-3">
        <FormInput
          control={control}
          name="search"
          placeholder={t('invite-friends.header_input_placeholder')}
          leftIconAction={{ color: '#000', name: 'search-regular', size: 'sm' }}
        />
      </Wrapper>
      <InviteFriendsHeaderInvitedFriends />
    </>
  );
}
