import { useSessionsGetMyStats } from '@generatedApi/sessions/sessions.api';

export const useGetSessionsMeStats = () => {
  const query = useSessionsGetMyStats();

  const { data } = query?.data ?? {};

  return { ...query, data };
};
