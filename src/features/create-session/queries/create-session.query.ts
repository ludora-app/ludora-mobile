import { useSessionsCreate } from '@generatedApi/sessions/sessions.api';

import { CreateSessionFromRequestDto } from '@/api/generated/model';
import { useInvalidateSessionsFindAllByUserUid } from '@/api/generated/invalidate-queries';

export const useCreateSession = () => {
  const invalidateIncommingSessionMe = useInvalidateSessionsFindAllByUserUid({
    limit: 1,
    scope: 'UPCOMING',
    startDateSortOrder: 'asc',
  });
  const mutation = useSessionsCreate({
    mutation: {
      onSuccess: () => {
        invalidateIncommingSessionMe();
      },
    },
  });

  const mutateAsync = (data: CreateSessionFromRequestDto) => mutation.mutateAsync({ data });
  const mutate = (data: CreateSessionFromRequestDto) => mutation.mutate({ data });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
