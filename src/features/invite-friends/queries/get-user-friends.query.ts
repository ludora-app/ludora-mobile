import { useFriendsFindAllInfinite } from '@generatedApi/friends/friends.api';

import { FriendsFindAllParams } from '@/api/generated/model';

export const useGetUserFriends = (filter: FriendsFindAllParams) =>
  useFriendsFindAllInfinite(filter, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });
