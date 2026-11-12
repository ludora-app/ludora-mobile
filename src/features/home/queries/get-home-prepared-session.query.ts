import { useMemo, useState } from 'react';
import { useFieldsFindAllVerifiedInfinite } from '@generatedApi/fields/fields.api';

import { useUserMe } from '@/queries/user-me.query';
import { FieldsFindAllVerifiedType } from '@/api/generated/model';
import { getPreparedSession } from '@/utils/prepared-session.utils';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useGetMyPreferences } from './get-my-preferences.query';

/**
 * The session Ludora prepares from the player's preferences (same rules as the on-boarding, D7), and the nearest
 * public field hosting its sport inside the play area. Computed again on each opening of the home screen:
 * nothing is saved before publishing (no draft).
 */
export const useGetHomePreparedSession = ({ isEnabled }: { isEnabled: boolean }) => {
  const { userMe } = useUserMe();
  const { availabilities, isSettled, sportPreferences } = useGetMyPreferences();
  // Fixed at mount, so that the prepared values stay the same while the screen is open
  const [now] = useState(() => new Date());

  // A failed availabilities query reads as "no availability", like the featured state does
  const preparedSession = useMemo(
    () => (isSettled ? getPreparedSession({ availabilities, now, sportPreferences }) : null),
    [availabilities, isSettled, now, sportPreferences],
  );

  const hasPlayArea = !!userMe?.playArea;
  const isFieldQueryEnabled = isEnabled && !!preparedSession && hasPlayArea;

  // Without position, the backend searches around the play area, nearest first
  const { data, error, isError, isLoading } = useFieldsFindAllVerifiedInfinite(
    {
      limit: 1,
      sports: preparedSession ? [preparedSession.sport] : [],
      type: FieldsFindAllVerifiedType.PUBLIC,
    },
    { query: { enabled: isFieldQueryEnabled, getNextPageParam: lastPage => lastPage?.data?.nextCursor } },
  );

  useGetMethodErrorTracking({ error, extra: { context: 'useGetHomePreparedSession' }, isError });

  const field = isFieldQueryEnabled ? (data?.pages[0]?.data.items[0] ?? null) : null;

  return {
    field,
    isLoading: !preparedSession || (isFieldQueryEnabled && isLoading),
    preparedSession,
  };
};
