import { useSessionsCreate } from '@generatedApi/sessions/sessions.api';

import { CreateSessionFromRequestDto } from '@/api/generated/model';
import {
  useInvalidateConversationsFindAllByUserUid,
  useInvalidateSessionsFindAllMySessions,
} from '@/api/generated/invalidate-queries';

export const useCreateSession = () => {
  const invalidateIncommingSessionMe = useInvalidateSessionsFindAllMySessions();
  const invalidateConversationsFindAllMe = useInvalidateConversationsFindAllByUserUid();

  const mutation = useSessionsCreate({
    mutation: {
      onSuccess: () => {
        invalidateIncommingSessionMe();
        invalidateConversationsFindAllMe();
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
