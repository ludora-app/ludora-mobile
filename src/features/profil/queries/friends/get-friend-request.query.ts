import { useFriendsFindMyFriendRequest } from '@generatedApi/friends/friends.api';

import { ErrorResponse } from '@/api/orval.instance';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useGetFriendRequest = (userUid?: string) => {
  const query = useFriendsFindMyFriendRequest(userUid ?? '', {
    query: {
      enabled: !!userUid,
      retry: (failureCount, error: ErrorResponse) => {
        if (error?.api_error_status === 404) {
          return false;
        }
        return failureCount < 3;
      },
    },
  });

  const { data } = query?.data || {};

  const { error, isError } = query || {};

  const is404 = error?.api_error?.statusCode === 404 || error?.api_error_status === 404;

  useGetMethodErrorTracking({ error, isError: isError && !is404 });

  return {
    ...query,
    data: is404 ? undefined : data,
  };
};
