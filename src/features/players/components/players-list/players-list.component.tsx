import React from 'react'

import { List } from '@/components/ludo-ui'

import { playersMock } from '../../mocks/players.mocks'
import PlayersListItem from './players-list-item/players-list-item.component'
import PlayersListHeaderTopList from './players-list-headers/players-list-header-top-list.component'
import HomeSessionListHeaderSticky from './players-list-headers/home-session-list-header-sticky.component'


const LIST_HEADER_HEIGHT = 152

export default function PlayersList() {
  return (

    <List
      data={playersMock}
      ItemComponent={PlayersListItem}
      ListHeaderComponent={PlayersListHeaderTopList}
      ListStickyComponent={HomeSessionListHeaderSticky}
      isLoading={false}
      isFetchingNextPage={false}
      isRefetching={false}
      hasNextPage={false}
      fetchNextPage={() => { }}
      contentContainerClassName='bg-background px-4 rounded-t-xl'
      listHeaderComponentHeight={LIST_HEADER_HEIGHT}
      hasListStickyComponentTopSafeArea
      hasHeaderTransparent
      refetch={() => { }}
    />

  )
}