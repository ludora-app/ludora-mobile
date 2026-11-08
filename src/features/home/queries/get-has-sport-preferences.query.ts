import { useSportPreferencesFindMySportPreferences } from '@generatedApi/sport-preferences/sport-preferences.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

/** True when the player has chosen at least one sport. */
export const useGetHasSportPreferences = ({ isEnabled }: { isEnabled: boolean }) => {
  const { data, error, isError, ...rest } = useSportPreferencesFindMySportPreferences({
    query: { enabled: isEnabled },
  });

  useGetMethodErrorTracking({ error, extra: { context: 'useGetHasSportPreferences' }, isError });

  // The backend answers `data: null` when the player has no preference yet
  return { hasSportPreferences: !!data?.data?.items.length, ...rest };
};
