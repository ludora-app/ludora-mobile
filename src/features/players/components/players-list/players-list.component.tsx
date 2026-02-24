import React from 'react';

import { List } from '@/components/ludo-ui';
import { useSafeArea } from '@/hooks/safe-area.hook';

import PlayersListItem from './players-list-item/players-list-item.component';
import PlayersListHeaderSticky from './players-list-headers/players-list-header-sticky.component';
import { useGetUsersSuggestionByFilter } from '../../queries/get-users-suggestion-by-filter.query';
import PlayersListHeaderTopList from './players-list-headers/players-list-header-top-list.component';

const LIST_HEADER_HEIGHT = 152;

export default function PlayersList() {
  const { bottomTab } = useSafeArea();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetUsersSuggestionByFilter();

  return (
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
      hasListStickyComponentTopSafeArea
      hasHeaderTransparent
      contentContainerStyle={{ paddingBottom: bottomTab }}
      refetch={refetch}
      hasRefreshControl
    />
  );
}