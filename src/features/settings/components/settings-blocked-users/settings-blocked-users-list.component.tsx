import { List } from '@ludo/ui';
import { useMemo } from 'react';

import { EmptyResultProps } from '@/components/ui/empty-resulat/empty-result.component';
import { HEADER_OUTLINED_HEIGHT } from '@/components/ui/navigation/header-outlined/header-outlined.component';

import { useGetBlockedUsers } from '../../queries/get-blocked-users.query';
import SettingsBlockedUsersHeader from './settings-blocked-users-header.component';
import SettingsBlockedUsersListItem from './settings-blocked-users-list-item/settings-blocked-users-list-item.component';
import SettingsBlockedUsersListItemSkeleton from './settings-blocked-users-list-item/settings-blocked-users-list-item-skeleton.component';

const LIST_ITEM_SIZE_HEIGHT = 95;
const GET_FIXED_ITEM_SIZE = () => LIST_ITEM_SIZE_HEIGHT;
const NOOP_FETCH_NEXT_PAGE = () => {};

const EMPTY_RESULT_PROPS: EmptyResultProps = {
  hasRandomTitle: true,
  iconNames: ['ludo-eating-pizza'],
  randomOptions: 3,
  title: 'settings.blocked_users.empty_list_v',
};

export default function SettingsBlockedUsersList() {
  const { isLoading, isRefetching, items, refetch } = useGetBlockedUsers();

  const listHeaderComponent = useMemo(() => <SettingsBlockedUsersHeader />, []);

  return (
    <List
      data={items ?? []}
      fetchNextPage={NOOP_FETCH_NEXT_PAGE}
      isFetchingNextPage={false}
      hasNextPage={false}
      ItemComponent={SettingsBlockedUsersListItem}
      SkeletonComponent={SettingsBlockedUsersListItemSkeleton}
      ListHeaderComponent={listHeaderComponent}
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
