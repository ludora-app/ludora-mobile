import { useState } from 'react';
import { debounce } from 'radash';

import { SearchPlace } from '@/api/utils/api.types';
import { useGetPlace } from '@/api/hooks/places.hook';
import { useSearchPlaces } from '@/api/hooks/search-places.hook';

import { useGetMethodErrorTracking } from './analytics-trackers.hook';

const SEARCH_DEBOUNCE_MS = 300;

/**
 * Debounced place search for an input whose text is `query`. `search` follows each keystroke,
 * `resetSearch` drops the pending one, `getCoordinates` resolves the coordinates of a suggestion.
 */
export const usePlaceSearch = ({
  context,
  limit,
  minQueryLength,
  query,
}: {
  context: string;
  limit: number;
  minQueryLength: number;
  query: string;
}) => {
  const getPlace = useGetPlace();
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [search] = useState(() => debounce({ delay: SEARCH_DEBOUNCE_MS }, setDebouncedQuery));
  const { data, error, isError, isLoading } = useSearchPlaces({ limit, minQueryLength, query: debouncedQuery });

  useGetMethodErrorTracking({ error, extra: { context }, isError });

  const resetSearch = () => {
    search.cancel();
    setDebouncedQuery('');
  };

  // Google Places suggestions have no coordinates: they come from the place details
  const getCoordinates = async ({ id, location }: SearchPlace) => location ?? (await getPlace(id))?.location ?? null;

  return {
    getCoordinates,
    isSearching: isLoading || query.trim() !== debouncedQuery.trim(),
    places: data ?? [],
    resetSearch,
    search,
  };
};
