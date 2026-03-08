import { useSessionsFindOne } from '@generatedApi/sessions/sessions.api';

import { ErrorResponse } from '@/api/orval.instance';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useGetSessionById = (id: string) => {
  const query = useSessionsFindOne(id, {
    query: {
      enabled: !!id,
      retry: (failureCount, error: ErrorResponse) => {
        if (error?.api_error_status === 404) {
          return false;
        }
        return failureCount < 3;
      },
    },
  });
  const { data, error, isError } = query || {};

  const isSessionNotFoundError = error?.api_error_status === 404;

  useGetMethodErrorTracking({
    error,
    isError: isError && !isSessionNotFoundError,
  });

  const sessionData = data?.data;

  return { ...query, data: isSessionNotFoundError ? undefined : sessionData };
};
