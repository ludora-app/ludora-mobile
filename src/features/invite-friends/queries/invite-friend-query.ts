import { useSessionInvitationsCreate } from '@generatedApi/session-invitations/session-invitations.api';

import { CreateSessionInvitationDto } from '@/api/generated/model';

export const useInviteFriend = () => {
  const mutation = useSessionInvitationsCreate();
  const mutateAsync = async (data: CreateSessionInvitationDto) => mutation.mutateAsync({ data });
  const mutate = async (data: CreateSessionInvitationDto) => mutation.mutate({ data });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
