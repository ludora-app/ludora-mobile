import { GetListFixedItemSize, List } from '@ludo/ui';

import { SESSION_CARD_LIST_ITEM_HEIGHT, SessionCardSkeleton } from '@/components/ui/session-card';

import { useGetRecommendedSessions } from '../../queries/get-recommended-sessions.query';
import OnBoardingSessionsSuggestionsItem from './on-boarding-sessions-suggestions-item.component';

const ITEM_HEIGHT = 220;
const EMPTY_RESULT_PROPS = { title: 'on-boarding.sessions.suggestions.empty' } as const;

const GET_FIXED_ITEM_SIZE: GetListFixedItemSize = (_item, _index, type) => {
  if (type === 'row') return ITEM_HEIGHT;
  if (type === 'skeleton') return SESSION_CARD_LIST_ITEM_HEIGHT;
  return undefined;
};

export const OnBoardingSessionsSuggestionsList = () => {
  const { fetchNextPage, isError, isFetchingNextPage, isLoading, isRefetching, refetch, suggestions } =
    useGetRecommendedSessions();

  return (
    <List
      data={suggestions}
      ItemComponent={OnBoardingSessionsSuggestionsItem}
      SkeletonComponent={SessionCardSkeleton}
      emptyResultProps={EMPTY_RESULT_PROPS}
      isError={isError}
      getFixedItemSize={GET_FIXED_ITEM_SIZE}
      isLoading={isLoading}
      isRefetching={isRefetching}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={false}
      refetch={refetch}
      contentContainerClassName="px-4 pt-5.5 pb-6"
    />
  );
};
