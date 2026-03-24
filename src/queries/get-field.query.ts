import { useFieldsFindOne } from '@generatedApi/fields/fields.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useGetField = (id: string) => {
  const query = useFieldsFindOne(id, {
    query: {
      enabled: !!id,
    },
  });

  const { data, error, isError, ...rest } = query;

  useGetMethodErrorTracking({
    error,
    extra: { context: 'useGetField' },
    isError,
  });

  return { data: data?.data, ...rest };
};
