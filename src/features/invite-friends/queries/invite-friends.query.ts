import { useSessionInvitationsCreateMany } from '@generatedApi/session-invitations/session-invitations.api';

import { CreateManySessionInvitationDto } from '@/api/generated/model';
import { useInvalidateFriendsFindAllMyFriends } from '@/api/generated/invalidate-queries';

export const useInviteFriends = (sessionUid: string) => {
  const invalidateQueryUserFriends = useInvalidateFriendsFindAllMyFriends();
  const mutation = useSessionInvitationsCreateMany({
    mutation: {
      onSuccess: () => {
        invalidateQueryUserFriends();
      },
    },
  });

  const mutateAsync = (data: CreateManySessionInvitationDto) => mutation.mutateAsync({ data, sessionUid });

  return {
    ...mutation,
    mutateAsync,
  };
};
