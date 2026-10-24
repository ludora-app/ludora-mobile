import { Button } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useUpdateUserMe } from '@/queries/update-user-me.query';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { useOnBoardingStatusStore } from '@/stores/on-boarding-status.store';
import { usePutUserHoursPreferences } from '@/queries/put-user-hours-preferences.query';

import { useOnBoardingStore } from '../../../../stores/on-boarding.store';
import { toHourPreferences } from '../../../utils/on-boarding-availabilities.utils';
import { useCreateSportPreference } from '../../../queries/create-sport-preference.query';

export const OnBoardingFooterButtonSubmit = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { trackError, trackEvent } = useAnalytics();
  const hasAvailabilities = useOnBoardingStore(state => state.availabilities.length > 0);
  const setOnBoardingStatus = useOnBoardingStatusStore(state => state.setOnBoardingStatus);

  const { isPending: isCreatingSportPreference, mutateAsync: createSportPreference } = useCreateSportPreference();
  const { isPending: isPuttingHoursPreferences, mutateAsync: putHoursPreferences } = usePutUserHoursPreferences();
  const { isPending: isUpdatingUserMe, mutateAsync: updateUserMe } = useUpdateUserMe();

  const handleSubmit = async () => {
    const { availabilities, sportPreferences } = useOnBoardingStore.getState();
    try {
      if (sportPreferences.length > 0) {
        await createSportPreference({ sportPreferences });
      }
      if (availabilities.length > 0) {
        await putHoursPreferences({ hourPreferences: toHourPreferences(availabilities) });
      }
      await updateUserMe({ onBoardingStatus: 'COMPLETE' });
      trackEvent({
        data: {
          has_hour_preferences: availabilities.length > 0,
          has_sport_preferences: sportPreferences.length > 0,
        },
        eventName: ANALYTICS_EVENTS.ONBOARDING.ONBOARDING_COMPLETED,
      });
      setOnBoardingStatus('COMPLETE');
      const hasAnswers = sportPreferences.length > 0 || availabilities.length > 0;
      router.replace(hasAnswers ? ROUTES.ON_BOARDING.SESSIONS_READY : ROUTES.HOME.INDEX);
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: { error_message: errorResponse?.api_error_detail ?? 'Unknown error' },
        eventName: ANALYTICS_EVENTS.ONBOARDING.ONBOARDING_FAILED,
      });
      trackError({ error });
    }
  };

  const isPending = isCreatingSportPreference || isPuttingHoursPreferences || isUpdatingUserMe;

  return (
    <Button
      title={hasAvailabilities ? t('common.finish') : t('common.pass')}
      colorVariant={hasAvailabilities ? 'primary' : 'muted'}
      onPress={handleSubmit}
      isLoading={isPending}
      size="xl"
    />
  );
};
