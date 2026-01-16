import { List } from '@ludo/ui';

import { useGetUserFriendsByFilter } from '../../queries/get-user-friends-by-filter.query';
import InviteFriendsHeader from '../invite-friends-header/invite-friends-header.component';
import InviteFriendsListItem from './invite-friends-list-item/invite-friends-list-item.component';
import InviteFriendsHeaderInput from '../invite-friends-header/invite-friends-header-input.component';
import InviteFriendsListItemSkeleton from './invite-friends-list-item/invite-friends-list-item-skeleton.component';

export default function InviteFriendsList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items } =
    useGetUserFriendsByFilter();

  return (
    <List
      data={items}
      isRefetching={isRefetching}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      ItemComponent={InviteFriendsListItem}
      SkeletonComponent={InviteFriendsListItemSkeleton}
      ListHeaderComponent={InviteFriendsHeader}
      ListStickyComponent={InviteFriendsHeaderInput}
      emptyResultTitle="invite-friends.no_result_title_v"
    />
  );
}
