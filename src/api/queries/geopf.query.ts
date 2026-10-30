import ky from 'ky';

import { GeopfSearchResponse } from '../utils/api.types';

// IGN Géoplateforme geocoding (free, no key, France only): the API rejects queries under 3 characters
const GEOPF_SEARCH_URL = 'https://data.geopf.fr/geocodage/search';

// Short timeout so the Google Places fallback kicks in quickly when the service is down
const GEOPF_TIMEOUT_MS = 4_000;

export type GetGeopfSearchParams = {
  limit: number;
  query: string;
  signal?: AbortSignal;
};

export const GET = async ({ limit, query, signal }: GetGeopfSearchParams) =>
  ky
    .get(GEOPF_SEARCH_URL, {
      retry: 0,
      searchParams: { autocomplete: 1, index: 'address', limit, q: query },
      signal,
      timeout: GEOPF_TIMEOUT_MS,
    })
    .json<GeopfSearchResponse>();
