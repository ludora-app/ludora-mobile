import { BoxGrow } from '@ludo/ui';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useEffect, useRef, useState } from 'react';

import Loading from '@/components/ui/loading/loading.component';
import { MessageCollectionItemDto } from '@/api/generated/model';
import { useChatRoomStore } from '@/features/chat-room/store/chat-room.store';

import ChatRoomMessagesListEmpty from './chat-room-messages-list-empty';
import { useChatRoomScrollStore } from '../../../store/chat-room-scroll.store';
import VirtualizedListScrollView from './virtualized-list-scroll-view.component';
import { useGetMessagesByChatroomId } from '../../../queries/get-messages-by-chatroom-id.query';
import ChatRoomMessagesListScrollButton from './chat-room-messages-list-scroll-button.component';
import ChatRoomMessageListItem from './chat-room-message-list-item/chat-room-message-list-item.component';
import ChatRoomMessageActionsMenu from '../chat-room-message-actions/chat-room-message-actions-menu.component';

export default function ChatRoomMessagesList() {
  const isChatRoomGroup =
    useChatRoomStore(state => state.chatRoomInfo?.type === 'SESSION' || state.chatRoomInfo?.type === 'GROUP');
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, items } = useGetMessagesByChatroomId();

  // @ts-ignore - FlashList typing is throwing a "value used as type" error in this context
  const listRef = useRef<FlashList<MessageCollectionItemDto>>(null);
  const setScrollToEnd = useChatRoomScrollStore(state => state.setScrollToEnd);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    setScrollToEnd(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
    return () => setScrollToEnd(null);
  }, [setScrollToEnd]);

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    // distanceToBottom checks how far the viewport is from the maximum scroll height
    const distanceToBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
    const shouldShow = distanceToBottom > 200; // Show if user is further than 200px from bottom

    if (shouldShow !== showScrollButton) {
      setShowScrollButton(shouldShow);
    }
  };
  const memoList = useCallback(
    (props: any) => <VirtualizedListScrollView {...props} />,
    [],
  );

  if (isLoading) {
    return <Loading />;
  }



  return (
    <BoxGrow>
      <FlashList
        ref={listRef}
        data={items}
        renderItem={({ item }) => (
          <ChatRoomMessageListItem item={item} isChatRoomGroup={isChatRoomGroup} />
        )}
        keyExtractor={item => item.uid}
        maintainVisibleContentPosition={{
          autoscrollToBottomThreshold: 0.2,
          startRenderingFromBottom: true,
        }}
        renderScrollComponent={memoList}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onStartReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        contentContainerClassName='grow px-4 pt-4'
        onStartReachedThreshold={0.5}
        ListEmptyComponent={ChatRoomMessagesListEmpty}
      />

      <ChatRoomMessagesListScrollButton
        isVisible={showScrollButton}
        onPress={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      <ChatRoomMessageActionsMenu />
    </BoxGrow>
  );
}
