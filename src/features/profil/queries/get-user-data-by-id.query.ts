import { useUsersFindOne } from '@generatedApi/users/users.api';

import { ErrorResponse } from '@/api/orval.instance';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useGetUserDataById = (userId: string) => {
  const query = useUsersFindOne(userId, {
    query: {
      enabled: !!userId,
      retry: (failureCount, error: ErrorResponse) => {
        if (error?.api_error_status === 404) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: Infinity,
    },
  });

  const { data } = query?.data || {};
  const { error } = query || {};

  const isUserNotFoundError = error?.api_error_status === 404;

  useGetMethodErrorTracking({
    error: query.error,
    isError: query.isError && !isUserNotFoundError,
  });

  return {
    ...query,
    data: isUserNotFoundError ? undefined : data,
  };
};
