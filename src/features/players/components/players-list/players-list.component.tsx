import React from 'react'

import { List } from '@/components/ludo-ui'
import { useSafeArea } from '@/hooks/safe-area.hook'

import { playersMock } from '../../mocks/players.mocks'
import PlayersListItem from './players-list-item/players-list-item.component'
import PlayersListHeaderSticky from './players-list-headers/players-list-header-sticky.component'
import PlayersListHeaderTopList from './players-list-headers/players-list-header-top-list.component'


const LIST_HEADER_HEIGHT = 152

export default function PlayersList() {
  const { bottomTab } = useSafeArea();
  return (

    <List
      data={playersMock}
      ItemComponent={PlayersListItem}
      ListHeaderComponent={PlayersListHeaderTopList}
      ListStickyComponent={PlayersListHeaderSticky}
      isLoading={false}
      isFetchingNextPage={false}
      isRefetching={false}
      hasNextPage={false}
      fetchNextPage={() => { }}
      contentContainerClassName='bg-background px-4 rounded-t-xl'
      listHeaderComponentHeight={LIST_HEADER_HEIGHT}
      hasListStickyComponentTopSafeArea
      hasHeaderTransparent
      contentContainerStyle={{ paddingBottom: bottomTab }}
      refetch={() => { }}
    />

  )
}