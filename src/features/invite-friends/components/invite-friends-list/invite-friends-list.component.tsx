import { Box, List } from '@ludo/ui';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';

import { useCustomFlatListHook } from '../../hooks/useFlatlistHook';
import { useGetUserFriendsByFilter } from '../../queries/get-user-friends-by-filter.query';
import InviteFriendsHeader from '../invite-friends-header/invite-friends-header.component';
import InviteFriendsListItem from './invite-friends-list-item/invite-friends-list-item.component';
import InviteFriendsHeaderInput from '../invite-friends-header/invite-friends-header-input.component';
import InviteFriendsListItemSkeleton from './invite-friends-list-item/invite-friends-list-item-skeleton.component';

const AnimatedList = Animated.createAnimatedComponent(List);

export default function InviteFriendsList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items } =
    useGetUserFriendsByFilter();
  const [scrollY, styles, onLayoutHeaderElement, onLayoutStickyElement] = useCustomFlatListHook();

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Box className="flex-1">
      <Animated.View onLayout={onLayoutStickyElement} style={styles.stickyElement}>
        <InviteFriendsHeaderInput />
      </Animated.View>

      {/* <Animated.View onLayout={onLayoutTopListElement} style={styles.topElement}>
        <InviteFriendsHeaderInvitedFriends />
      </Animated.View> */}
      <AnimatedList
        items={items}
        isRefetching={isRefetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        itemComponent={InviteFriendsListItem}
        skeletonComponent={InviteFriendsListItemSkeleton}
        onScroll={onScroll}
        ListHeaderComponent={
          <Animated.View onLayout={onLayoutHeaderElement} style={styles.header}>
            <InviteFriendsHeader />
          </Animated.View>
        }
      />
    </Box>
  );
}
