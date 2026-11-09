import { useEffect } from 'react';
import { useFieldsFindAllVerifiedInfinite } from '@generatedApi/fields/fields.api';
import { useHourPreferencesFindMyHourPreferences } from '@generatedApi/hour-preferences/hour-preferences.api';
import { useSportPreferencesFindMySportPreferences } from '@generatedApi/sport-preferences/sport-preferences.api';

import { useUserMe } from '@/queries/user-me.query';
import { useGetSports } from '@/queries/get-sports.query';
import { FieldsFindAllVerifiedType } from '@/api/generated/model';
import { getPreparedSession } from '@/utils/prepared-session.utils';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useOnBoardingSessionsStore } from '../../stores/on-boarding-sessions.store';

/**
 * The first session Ludora prepares from the player's preferences, and the nearest public field
 * hosting its sport inside the play area. The values are computed once, then kept in the store.
 */
export const useGetPreparedSession = () => {
  const { isLoading: isLoadingUserMe, userMe } = useUserMe();
  const { sports } = useGetSports();
  const sportPreferencesQuery = useSportPreferencesFindMySportPreferences();
  const hourPreferencesQuery = useHourPreferencesFindMyHourPreferences();
  const preparedSession = useOnBoardingSessionsStore(state => state.preparedSession);
  const selectedField = useOnBoardingSessionsStore(state => state.selectedField);
  const setPreparedSession = useOnBoardingSessionsStore(state => state.setPreparedSession);

  const hasPlayArea = !!userMe?.playArea;
  const sportPreferencesData = sportPreferencesQuery.data;
  const hourPreferencesData = hourPreferencesQuery.data;
  const hasLoadedPreferences = sportPreferencesQuery.isSuccess && hourPreferencesQuery.isSuccess;

  useEffect(() => {
    if (preparedSession || !hasLoadedPreferences) return;
    // The backend answers `data: null` when the player has no preference yet
    setPreparedSession(
      getPreparedSession({
        availabilities: hourPreferencesData?.data?.items ?? [],
        now: new Date(),
        sportPreferences: sportPreferencesData?.data?.items ?? [],
      }),
    );
  }, [hasLoadedPreferences, hourPreferencesData, preparedSession, setPreparedSession, sportPreferencesData]);

  const isFieldQueryEnabled = !!preparedSession && hasPlayArea && !selectedField;

  // Without position, the backend searches around the play area, nearest first
  const fieldQuery = useFieldsFindAllVerifiedInfinite(
    {
      limit: 1,
      sports: preparedSession ? [preparedSession.sport] : [],
      type: FieldsFindAllVerifiedType.PUBLIC,
    },
    {
      query: {
        enabled: isFieldQueryEnabled,
        getNextPageParam: lastPage => lastPage?.data?.nextCursor,
      },
    },
  );

  // A disabled field query keeps its last state: it must neither fail the screen nor be refetched
  const isFieldError = isFieldQueryEnabled && fieldQuery.isError;
  const error = sportPreferencesQuery.error ?? hourPreferencesQuery.error ?? (isFieldError ? fieldQuery.error : null);
  const isError = sportPreferencesQuery.isError || hourPreferencesQuery.isError || isFieldError;
  useGetMethodErrorTracking({ error, extra: { context: 'useGetPreparedSession' }, isError });

  const nearestField = hasPlayArea ? (fieldQuery.data?.pages[0]?.data.items[0] ?? null) : null;
  const field = selectedField ?? nearestField;
  const playersPerTeam =
    sports
      .find(sport => sport.code === preparedSession?.sport)
      ?.gameModes.find(gameMode => gameMode.code === preparedSession?.gameMode)?.playersPerTeam ?? null;

  return {
    field,
    hasPlayArea,
    isError,
    isLoading:
      isLoadingUserMe || sportPreferencesQuery.isLoading || hourPreferencesQuery.isLoading || !preparedSession,
    isLoadingField: !selectedField && fieldQuery.isLoading,
    playersPerTeam,
    preparedSession,
    refetch: () =>
      Promise.all([
        sportPreferencesQuery.refetch(),
        hourPreferencesQuery.refetch(),
        ...(isFieldQueryEnabled ? [fieldQuery.refetch()] : []),
      ]),
  };
};
