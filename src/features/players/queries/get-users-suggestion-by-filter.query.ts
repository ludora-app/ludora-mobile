import { useMemo } from 'react';

import { UsersFindAllParams } from '@/api/generated/model';
import { filterObjectEntries } from '@/utils/filters.utils';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useGetUsersSuggestion } from './get-users-suggestion.query';
import { usePlayersFiltersStore } from '../stores/players-filters.store';

const LIMIT_RESULTS_PLAYERS = 10;

export const useGetUsersSuggestionByFilter = () => {
  const playersFilters = usePlayersFiltersStore(state => state.filters);
  const cleanedFilters = filterObjectEntries(playersFilters);

  const params = useMemo(
    (): UsersFindAllParams => ({
      limit: LIMIT_RESULTS_PLAYERS,
      ...cleanedFilters,
    }),
    [cleanedFilters],
  );

  const { data, error, isError, ...rest } = useGetUsersSuggestion(params);

  useGetMethodErrorTracking({ error, extra: { context: 'useGetUsersSuggestionByFilter' }, isError });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { error, isError, items, totalCount, ...rest };
};
