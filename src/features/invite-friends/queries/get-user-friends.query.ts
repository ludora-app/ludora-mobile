import { useFriendsFindAllMyFriendsInfinite } from '@generatedApi/friends/friends.api';

import { FriendsFindAllMyFriendsParams } from '@/api/generated/model';

export const useGetUserFriends = (filter: FriendsFindAllMyFriendsParams) =>
  useFriendsFindAllMyFriendsInfinite(filter, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });
