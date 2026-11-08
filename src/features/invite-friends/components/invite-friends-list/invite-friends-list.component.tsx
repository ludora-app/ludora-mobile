import { GetListFixedItemSize, List } from '@ludo/ui';

import { useGetUserFriendsByFilter } from '../../queries/get-user-friends-by-filter.query';
import InviteFriendsHeader from '../invite-friends-header/invite-friends-header.component';
import InviteFriendsListItem from './invite-friends-list-item/invite-friends-list-item.component';
import InviteFriendsHeaderInput from '../invite-friends-header/invite-friends-header-input.component';
import InviteFriendsListItemSkeleton from './invite-friends-list-item/invite-friends-list-item-skeleton.component';

const LIST_STICKY_COMPONENT_HEIGHT = 66;
const LIST_ITEM_HEIGHT = 94;

const GET_FIXED_ITEM_SIZE: GetListFixedItemSize = (_item, _index, type) =>
  type === 'sticky' ? LIST_STICKY_COMPONENT_HEIGHT : LIST_ITEM_HEIGHT;

const EMPTY_RESULT_PROPS = {
  hasRandomTitle: true,
  title: 'invite-friends.no_result_title_v',
} as const;

export default function InviteFriendsList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetUserFriendsByFilter();

  return (
    <List
      data={items}
      isRefetching={isRefetching}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isLoading={isLoading}
      hasRefreshControl
      refetch={refetch}
      isFetchingNextPage={isFetchingNextPage}
      ItemComponent={InviteFriendsListItem}
      SkeletonComponent={InviteFriendsListItemSkeleton}
      ListHeaderComponent={InviteFriendsHeader}
      ListStickyComponent={InviteFriendsHeaderInput}
      getFixedItemSize={GET_FIXED_ITEM_SIZE}
      emptyResultProps={EMPTY_RESULT_PROPS}
    />
  );
}
