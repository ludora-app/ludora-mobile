import { useTranslate } from '@tolgee/react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { List } from '@/components/ludo-ui';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID } from '@/constants/platform.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import { PlayersListProvider } from '../../context/players-list.context';
import PlayersListItem from './players-list-item/players-list-item.component';
import { useSendFriendInvitation } from '../../queries/send-friend-invitation.query';
import PlayersListHeaderSticky from './players-list-headers/players-list-header-sticky.component';
import { useGetUsersSuggestionByFilter } from '../../queries/get-users-suggestion-by-filter.query';
import PlayersListHeaderTopList from './players-list-headers/players-list-header-top-list.component';

const LIST_HEADER_HEIGHT = 156;
const ESTIMATED_ITEM_SIZE = 220;

export default function PlayersList() {
  const { bottomTab } = useSafeArea();
  const { t } = useTranslate();
  const { trackError } = useAnalytics();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetUsersSuggestionByFilter();
  const { mutateAsync: sendFriendInvitation } = useSendFriendInvitation();

  const sendFriendInvitationRef = useRef(sendFriendInvitation);
  const trackErrorRef = useRef(trackError);
  const tRef = useRef(t);

  useEffect(() => {
    sendFriendInvitationRef.current = sendFriendInvitation;
  }, [sendFriendInvitation]);

  useEffect(() => {
    trackErrorRef.current = trackError;
  }, [trackError]);

  useEffect(() => {
    tRef.current = t;
  }, [t]);

  const onInvite = useCallback(async (userUid: string) => {
    try {
      await sendFriendInvitationRef.current(userUid);
    } catch (error) {
      trackErrorRef.current({ error });
    }
  }, []);

  const stableT = useCallback(
    (...args: Parameters<typeof t>) => (tRef.current as typeof t)(...args),
    [],
  ) as typeof t;

  const contextValue = useMemo(() => ({ onInvite, t: stableT }), [onInvite, stableT]);

  const contentContainerStyle = useMemo(() => {
    const paddingBottom = IS_ANDROID ? bottomTab + LIST_HEADER_HEIGHT : bottomTab;
    return { paddingBottom };
  }, [bottomTab]);

  return (
    <PlayersListProvider value={contextValue}>
      <List
        data={items}
        ItemComponent={PlayersListItem}
        ListHeaderComponent={PlayersListHeaderTopList}
        ListStickyComponent={PlayersListHeaderSticky}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        isRefetching={isRefetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        contentContainerClassName="bg-background px-4 rounded-t-xl"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        listHeaderComponentHeight={LIST_HEADER_HEIGHT}
        estimatedItemSize={ESTIMATED_ITEM_SIZE}
        hasListStickyComponentTopSafeArea
        hasHeaderTransparent
        contentContainerStyle={contentContainerStyle}
        refetch={refetch}
        hasRefreshControl
      />
    </PlayersListProvider>
  );
}
