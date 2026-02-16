import { useFriendsFindMyFriendRequest } from '@generatedApi/friends/friends.api';

export const useGetFriendRequest = (userUid?: string) => {
  const query = useFriendsFindMyFriendRequest(userUid, {
    query: {
      enabled: !!userUid,
    },
  });

  const { data } = query?.data || {};

  return {
    ...query,
    data,
  };
};
