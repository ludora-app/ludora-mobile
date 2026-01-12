import { useSessionsFindOne } from '@generatedApi/sessions/sessions.api';

export const useGetSessionById = (id: string) => {
  const query = useSessionsFindOne(id, {
    query: {
      enabled: !!id,
    },
  });
  const sessionData = query?.data?.data;
  return { ...query, data: sessionData };
};
