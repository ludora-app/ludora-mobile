import { useSessionsCreate } from '@generatedApi/sessions/sessions.api';

import { CreateSessionFromRequestDto } from '@/api/generated/model';

export const useCreateSession = () => {
  const mutation = useSessionsCreate();

  const mutateAsync = (data: CreateSessionFromRequestDto) => mutation.mutateAsync({ data });
  const mutate = (data: CreateSessionFromRequestDto) => mutation.mutate({ data });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
