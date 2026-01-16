import { useLocalSearchParams } from 'expo-router';

import ROUTES from '@/constants/ROUTES';
import { filterObjectEntries } from '@/utils/filters.utils';
import { RootStackParamList } from '@/types/routes-params.types';

import { useGetUserFriends } from './get-user-friends.query';
import { useInviteFriendsFilterStore } from '../stores/invite-friends-filter.store';

const LIMIT_USER_FRIENDS_ITEMS = 10;

export const useGetUserFriendsByFilter = () => {
  const { sessionUid } = useLocalSearchParams<RootStackParamList[typeof ROUTES.INVITE_PEOPLE.INDEX]>();
  const userFriendsFilter = useInviteFriendsFilterStore(state => state.filter);

  const { data, ...rest } = useGetUserFriends({
    ...filterObjectEntries(userFriendsFilter),
    limit: LIMIT_USER_FRIENDS_ITEMS,
    sessionUid,
  });
  const items = data?.pages.flatMap(page => page.data.items) ?? [];
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { items, totalCount, ...rest };
};
