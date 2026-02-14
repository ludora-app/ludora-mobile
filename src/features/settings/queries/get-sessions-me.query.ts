import { useSessionsFindAllMySessionsInfinite } from '@generatedApi/sessions/sessions.api';

import { filterObjectEntries } from '@/utils/filters.utils';
import { SessionsFindAllMySessionsParams } from '@/api/generated/model';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useSettingsHistoryFilterStore } from '../stores/settings-history-filter.store';

const LIMIT = 10;

export const useGetSessionsMe = () => {
  const filterStore = useSettingsHistoryFilterStore(state => state.filter);

  const cleanedFilters = filterObjectEntries(filterStore);

  const filter: SessionsFindAllMySessionsParams = {
    ...cleanedFilters,
    limit: LIMIT,
    startDateSortOrder: 'desc',
  };

  const { data, error, isError, ...rest } = useSessionsFindAllMySessionsInfinite(filter, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
      staleTime: Infinity,
    },
  });

  useGetMethodErrorTracking({ error, isError });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];

  return { ...rest, items };
};
