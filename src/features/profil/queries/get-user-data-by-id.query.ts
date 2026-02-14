import { useUsersFindOne } from '@generatedApi/users/users.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useGetUserDataById = (userId: string) => {
  const query = useUsersFindOne(userId, {
    query: {
      enabled: !!userId,
      staleTime: Infinity,
    },
  });
  const { data } = query?.data || {};

  useGetMethodErrorTracking({ error: query.error, isError: query.isError });

  return {
    ...query,
    data,
  };
};
