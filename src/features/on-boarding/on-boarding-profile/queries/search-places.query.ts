import { useSearchPlaces } from '@/api/hooks/search-places.hook';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { ON_BOARDING_PLACES_MAX_SUGGESTIONS, ON_BOARDING_PLACES_MIN_QUERY_LENGTH } from '../constants/on-boarding.constants';

export const useSearchPlayAreaPlaces = (query: string) => {
  const { data, error, isError, ...rest } = useSearchPlaces({
    limit: ON_BOARDING_PLACES_MAX_SUGGESTIONS,
    minQueryLength: ON_BOARDING_PLACES_MIN_QUERY_LENGTH,
    query,
  });

  useGetMethodErrorTracking({ error, extra: { context: 'useSearchPlayAreaPlaces' }, isError });

  return { places: data ?? [], ...rest };
};
