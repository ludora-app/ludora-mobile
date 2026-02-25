import { useFieldsFindAllMyFieldsInfinite } from '@generatedApi/fields/fields.api';

import { filterObjectEntries } from '@/utils/filters.utils';
import { FieldsFindAllMyFieldsParams } from '@/api/generated/model';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useMyFieldsFilterStore } from '../stores/my-fields-filter.store';

const LIMIT = 10;

export const useGetMyFields = () => {
  const filterStore = useMyFieldsFilterStore(state => state.filter);

  const cleanedFilters = filterObjectEntries(filterStore);

  const filter: FieldsFindAllMyFieldsParams = {
    ...cleanedFilters,
    limit: LIMIT,
  };

  const { data, error, isError, ...rest } = useFieldsFindAllMyFieldsInfinite(filter, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
      staleTime: Infinity,
    },
  });

  useGetMethodErrorTracking({ error, isError });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];

  return { ...rest, items };
};
