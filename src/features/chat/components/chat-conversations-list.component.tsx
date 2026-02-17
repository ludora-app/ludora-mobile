import { List, Wrapper } from '@ludo/ui';
import { SharedValue } from 'react-native-reanimated';

import { useSafeArea } from '@/hooks/safe-area.hook';

import { useGetAllChatRoomsByFilter } from '../queries/get-chatrooms-by-filter.query';
import ChatConversationsListItem from './chat-conversations-list-item/chat-conversations-list-item.component';
import ChatConversationsListItemSkeleton from './chat-conversations-list-item/chat-conversations-list-item-skeleton.component';

type ChatConversationsListProps = {
  scrollY: SharedValue<number>;
};

const ITEM_HEIGHT = 81;

export default function ChatConversationsList({ scrollY }: ChatConversationsListProps) {
  const { bottomTab } = useSafeArea();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetAllChatRoomsByFilter();

  console.log("items", items)


  const scrollYRef = scrollY;

  return (
    <Wrapper>
      <List
        data={items}
        ItemComponent={ChatConversationsListItem}
        SkeletonComponent={ChatConversationsListItemSkeleton}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        isRefetching={isRefetching}
        refetch={refetch}
        hasRefreshControl
        hasNextPage={hasNextPage}
        onScroll={e => {
          'worklet';

          scrollYRef.value = e.nativeEvent.contentOffset.y;
        }}
        getFixedItemSize={() => ITEM_HEIGHT}
        contentContainerStyle={{
          paddingBottom: bottomTab + 150,
          paddingTop: 20,
        }}
      />
    </Wrapper>
  );
}
