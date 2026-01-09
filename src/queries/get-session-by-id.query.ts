import { useSessionsFindOne } from '@generatedApi/sessions/sessions.api';

export const useGetSessionById = (id: string) => {
  const query = useSessionsFindOne(id, {
    query: {
      enabled: !!id,
    },
  });
  return { ...query, data: query.data.data };
};
