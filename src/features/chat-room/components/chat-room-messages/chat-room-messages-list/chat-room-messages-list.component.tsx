import { BoxGrow } from '@ludo/ui';
import { FlatList } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { MessageCollectionItemDto } from '@/api/generated/model';
import { useChatRoomStore } from '@/features/chat-room/context/chat-room-store-context';

import ChatRoomMessagesListEmpty from './chat-room-messages-list-empty';
import { useChatRoomScrollStore } from '../../../store/chat-room-scroll.store';
import ChatRoomMessagesListLoading from './chat-room-messages-list-loading.component';
import { useGetMessagesByChatroomId } from '../../../queries/get-messages-by-chatroom-id.query';
import ChatRoomMessagesListScrollButton from './chat-room-messages-list-scroll-button.component';
import ChatRoomMessagesListLoadMoreLoading from './chat-room-messages-list-load-more-loading.component';
import ChatRoomMessageListItem from './chat-room-message-list-item/chat-room-message-list-item.component';
import ChatRoomMessageActionsMenu from '../chat-room-message-actions/chat-room-message-actions-menu.component';

const AUTO_SCROLL_THRESHOLD = 200;
const MIN_INDEX_FOR_VISIBLE = 0;
const ITEM_VISIBLE_PERCENT_THRESHOLD = 50;

const keyExtractor = (item: MessageCollectionItemDto) => item.uid;

const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: ITEM_VISIBLE_PERCENT_THRESHOLD };

const MAINTAIN_VISIBLE_CONTENT_POSITION = {
  autoscrollToTopThreshold: AUTO_SCROLL_THRESHOLD,
  minIndexForVisible: MIN_INDEX_FOR_VISIBLE,
};

/** Defer list mount until a certain number of items are loaded. */
const DEFER_LIST_MOUNT_ITEM_THRESHOLD = 20;
const DEFER_LIST_MOUNT_DELAY_MS = 300;

export default function ChatRoomMessagesList() {
  const [isReady, setIsReady] = useState(false);

  const isChatRoomGroup = useChatRoomStore(
    state => state.chatRoomInfo?.type === 'SESSION' || state.chatRoomInfo?.type === 'GROUP',
  );
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isSuccess, items } = useGetMessagesByChatroomId();

  // defer list mount when list is long to avoic Ui flickering
  useEffect(() => {
    if (!isSuccess) {
      return () => {};
    }

    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (items.length < DEFER_LIST_MOUNT_ITEM_THRESHOLD) {
      setIsReady(true);
    } else {
      timeout = setTimeout(() => setIsReady(true), DEFER_LIST_MOUNT_DELAY_MS);
    }

    return () => {
      if (timeout !== undefined) clearTimeout(timeout);
    };
  }, [items.length, isSuccess]);

  const listRef = useRef<FlatList<MessageCollectionItemDto>>(null);
  const setScrollToEnd = useChatRoomScrollStore(state => state.setScrollToEnd);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const showScrollButtonRef = useRef(false);

  const invertList = items?.length > 0;

  useEffect(() => {
    setScrollToEnd(() => {
      listRef.current?.scrollToIndex({ animated: true, index: 0 });
    });
    return () => setScrollToEnd(null);
  }, [setScrollToEnd]);

  const handleScroll = useCallback((event: any) => {
    const { contentOffset } = event.nativeEvent;
    const shouldShow = contentOffset.y > AUTO_SCROLL_THRESHOLD;

    if (shouldShow !== showScrollButtonRef.current) {
      showScrollButtonRef.current = shouldShow;
      setShowScrollButton(shouldShow);
    }
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleScrollToTop = useCallback(() => {
    listRef.current?.scrollToIndex({ animated: true, index: 0 });
  }, []);

  const renderItem = useCallback(
    (info: { item: MessageCollectionItemDto }) => (
      <ChatRoomMessageListItem item={info.item} isChatRoomGroup={isChatRoomGroup} />
    ),
    [isChatRoomGroup],
  );

  const listFooter = useMemo(
    () => <ChatRoomMessagesListLoadMoreLoading isFetchingNextPage={isFetchingNextPage} />,
    [isFetchingNextPage],
  );

  if (isLoading || !isReady) {
    return <ChatRoomMessagesListLoading />;
  }

  return (
    <BoxGrow>
      <FlatList
        ref={listRef}
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        inverted={invertList}
        viewabilityConfig={VIEWABILITY_CONFIG}
        onEndReached={handleEndReached}
        ListFooterComponent={listFooter}
        showsVerticalScrollIndicator
        maintainVisibleContentPosition={MAINTAIN_VISIBLE_CONTENT_POSITION}
        contentContainerClassName="grow px-4 py-3 gap-3"
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ChatRoomMessagesListEmpty}
      />

      <ChatRoomMessagesListScrollButton
        isVisible={showScrollButton}
        onPress={handleScrollToTop}
        lastMessage={items?.[0]}
      />
      <ChatRoomMessageActionsMenu />
    </BoxGrow>
  );
}
