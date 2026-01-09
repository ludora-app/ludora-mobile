import { filterObjectEntries } from '@/utils/filters.utils';

import { useGetUserFriends } from './get-user-friends.query';
import { useInviteFriendsFilterStore } from '../stores/invite-friends-filter.store';

export const useGetUserFriendsByFilter = () => {
  const userFriendsFilter = useInviteFriendsFilterStore(state => state.filter);

  const { data, ...rest } = useGetUserFriends({
    ...filterObjectEntries(userFriendsFilter),
    limit: 10,
  });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { items, totalCount, ...rest };
};
