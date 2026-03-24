import { useUsersFindMe } from '@generatedApi/users/users.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useUserMe = (isEnabled: boolean = true) => {
  const query = useUsersFindMe({
    query: {
      enabled: isEnabled,
    },
  });

  const { data: userMe, ...rest } = query;

  const { error, isError } = query || {};

  useGetMethodErrorTracking({
    error,
    extra: { context: 'useUserMe' },
    isError,
  });

  const userMeData = userMe?.data;
  const userMeId = userMeData?.uid;

  return { userMe: userMeData, userMeId, ...rest };
};
