import { useMemo } from 'react';

import { filterObjectEntries } from '@/utils/filters.utils';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';
import { ConversationsFindAllByUserUidParams } from '@/api/generated/model';

import { useChatStore } from '../store/chat.store';
import { useGetAllChatRooms } from './get-chatrooms.query';

const LIMIT_RESULTS_SESSIONS = 20;

export const useGetAllChatRoomsByFilter = () => {
  const chatRoomsFilters = useChatStore(state => state.filters);
  const cleanedFilters = filterObjectEntries(chatRoomsFilters);

  const params = useMemo(
    (): ConversationsFindAllByUserUidParams => ({
      limit: LIMIT_RESULTS_SESSIONS,
      ...cleanedFilters,
    }),
    [cleanedFilters],
  );

  const { data, error, isError, ...rest } = useGetAllChatRooms(params);

  useGetMethodErrorTracking({ error, extra: { context: 'useGetAllChatRoomsByFilter' }, isError });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];

  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { error, isError, items, totalCount, ...rest };
};
