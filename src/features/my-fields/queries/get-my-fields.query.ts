import { useMemo } from 'react';
import { useFieldsFindAllMyFieldsInfinite } from '@generatedApi/fields/fields.api';

import { filterObjectEntries } from '@/utils/filters.utils';
import { FieldsFindAllMyFieldsParams } from '@/api/generated/model';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useMyFieldsFilterStore } from '../stores/my-fields-filter.store';

const LIMIT = 10;

export const useGetMyFields = () => {
  const filterStore = useMyFieldsFilterStore(state => state.filter);

  const cleanedFilters = useMemo(() => filterObjectEntries(filterStore), [filterStore]);

  const filter: FieldsFindAllMyFieldsParams = useMemo(() => ({
    ...cleanedFilters,
    limit: LIMIT,
  }), [cleanedFilters]);

  const { data, error, isError, ...rest } = useFieldsFindAllMyFieldsInfinite(filter, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
      staleTime: Infinity,
    },
  });

  useGetMethodErrorTracking({ error, isError });

  const items = useMemo(() => data?.pages.flatMap(page => page.data.items) ?? [], [data]);

  return { ...rest, items };
};
