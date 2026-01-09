import { useFriendsCreate } from '@generatedApi/friends/friends.api';

import { CreateFriendDto } from '@/api/generated/model';

export const useInviteFriend = () => {
  const mutation = useFriendsCreate();
  const mutateAsync = async (data: CreateFriendDto) => mutation.mutateAsync({ data });
  const mutate = async (data: CreateFriendDto) => mutation.mutate({ data });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
