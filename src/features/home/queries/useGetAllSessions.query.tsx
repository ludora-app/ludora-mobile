import { useSessionsFindAllSuggestionsInfinite } from '@generatedApi/sessions/sessions.api';

import { SessionsFindAllSuggestionsParams } from '@/api/generated/model';

export const useGetAllSessions = (filter: SessionsFindAllSuggestionsParams) =>
  useSessionsFindAllSuggestionsInfinite(filter, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });
