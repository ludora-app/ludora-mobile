import { useSessionsGetMyStats } from '@generatedApi/sessions/sessions.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

/** True while the player has neither joined nor created any session. */
export const useGetIsFirstSessionPending = () => {
  const { data, error, isError, ...rest } = useSessionsGetMyStats();

  useGetMethodErrorTracking({ error, extra: { context: 'useGetIsFirstSessionPending' }, isError });

  const stats = data?.data;
  const isFirstSessionPending = !!stats && stats.organizedCount + stats.participatedCount === 0;

  return { isFirstSessionPending, ...rest };
};
