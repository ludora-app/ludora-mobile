import { useMemo } from 'react';
import { useFieldsFindAllVerifiedInfinite } from '@generatedApi/fields/fields.api';

import { Sport } from '@/types/sports.types';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';
import { FieldsFindAllVerifiedParams, FieldsFindAllVerifiedType } from '@/api/generated/model';

const FIELDS_LIMIT = 10;

/**
 * The public fields hosting the sport. With a position, they are sorted by distance (30 km max);
 * without, the backend falls back on the play area if there is one.
 */
export const useGetPreparedSessionFields = ({
  position,
  sport,
}: {
  position: { latitude: number; longitude: number } | null;
  sport?: Sport;
}) => {
  const params = useMemo<FieldsFindAllVerifiedParams>(
    () => ({
      limit: FIELDS_LIMIT,
      sports: sport ? [sport] : [],
      type: FieldsFindAllVerifiedType.PUBLIC,
      ...(position && { userLat: position.latitude, userLon: position.longitude }),
    }),
    [position, sport],
  );

  const { data, error, isError, ...rest } = useFieldsFindAllVerifiedInfinite(params, {
    query: {
      enabled: !!sport,
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  useGetMethodErrorTracking({ error, extra: { context: 'useGetPreparedSessionFields' }, isError });

  const fields = useMemo(() => data?.pages.flatMap(page => page?.data.items ?? []) ?? [], [data]);
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { fields, isError, totalCount, ...rest };
};
