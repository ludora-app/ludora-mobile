import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '../utils/api.queryKey';
import { POST as postPlaces } from '../queries/places.query';
import { GET as getGeopfSearch } from '../queries/geopf.query';
import { toSearchPlaceFromGeopf, toSearchPlaceFromGoogle } from '../utils/search-places.utils';

type SearchPlacesParams = {
  limit: number;
  query: string;
  signal: AbortSignal;
};

// IGN first (free), Google Places only when IGN fails or times out
const searchPlaces = async ({ limit, query, signal }: SearchPlacesParams) => {
  try {
    const { features } = await getGeopfSearch({ limit, query, signal });
    return features.map(toSearchPlaceFromGeopf);
  } catch (error) {
    if (signal.aborted) throw error;
    const { suggestions = [] } = await postPlaces({ input: query, signal });
    return suggestions.slice(0, limit).map(toSearchPlaceFromGoogle);
  }
};

/**
 * Searches places in France with the IGN geocoding API, falling back to Google Places.
 * The query must already be debounced by the caller.
 */
export const useSearchPlaces = ({
  limit,
  minQueryLength,
  query,
}: {
  limit: number;
  minQueryLength: number;
  query: string;
}) => {
  const trimmedQuery = query.trim();

  return useQuery({
    enabled: trimmedQuery.length >= minQueryLength,
    queryFn: ({ signal }) => searchPlaces({ limit, query: trimmedQuery, signal }),
    queryKey: QUERY_KEY.SEARCH_PLACES(trimmedQuery),
    staleTime: 1000 * 60 * 5,
  });
};
