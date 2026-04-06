import { List } from '@ludo/ui';
import { useMemo } from 'react';

import { HEADER_OUTLINED_HEIGHT } from '@/components/ui/navigation/header-outlined/header-outlined.component';

import { useGetMyFriends } from '../../queries/get-my-friends.query';
import SettingsFriendsHeader from './settings-friends-header.component';
import SettingsFriendsListItem from './settings-friends-list-item.component';

const LIST_ITEM_SIZE_HEIGHT = 95;
const GET_FIXED_ITEM_SIZE = () => LIST_ITEM_SIZE_HEIGHT;
const EMPTY_RESULT_PROPS = { title: 'settings.friends.empty_list' } as const;

export default function SettingsFriendsList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } = useGetMyFriends();

  const listHeaderComponent = useMemo(() => <SettingsFriendsHeader />, []);

  return (
    <List
      data={items}
      ItemComponent={SettingsFriendsListItem}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      ListHeaderComponent={listHeaderComponent}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      isRefetching={isRefetching}
      refetch={refetch}
      hasRefreshControl
      contentContainerClassName="grow bg-background px-4 rounded-t-xl"
      hasBottomSafeArea
      hasHeaderTransparent
      hasTopSafeArea
      listHeaderComponentHeight={HEADER_OUTLINED_HEIGHT}
      getFixedItemSize={GET_FIXED_ITEM_SIZE}
      emptyResultProps={EMPTY_RESULT_PROPS}
    />
  );
}
