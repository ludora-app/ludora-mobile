import { useFriendsFindAllMyFriendsInfinite } from '@generatedApi/friends/friends.api';

const LIMIT = 10;

export const useGetMyFriends = () => {
  const { data, ...rest } = useFriendsFindAllMyFriendsInfinite(
    { limit: LIMIT },
    {
      query: {
        getNextPageParam: lastPage => lastPage?.data?.nextCursor,
      },
    },
  );

  const items = data?.pages.flatMap(page => page.data.items) ?? [];

  return { ...rest, items };
};
