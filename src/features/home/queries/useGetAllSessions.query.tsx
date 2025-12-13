import { useSessionsFindAllInfinite } from '@generatedApi/sessions/sessions.api';

import { SessionsFindAllParams } from '@/api/generated/model';

export const useGetAllSessions = (filter: SessionsFindAllParams) =>
  useSessionsFindAllInfinite(filter, {
    query: {
      getNextPageParam: lastPage => lastPage.data.nextCursor,
    },
  });
