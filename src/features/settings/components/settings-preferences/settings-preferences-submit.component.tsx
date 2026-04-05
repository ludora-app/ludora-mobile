import { useMemo } from 'react';
import { useTranslate } from '@tolgee/react';

import { useUserMe } from '@/queries/user-me.query';
import { ErrorResponse } from '@/api/orval.instance';
import { useToast } from '@/components/chill-ui-library';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { usePutUserSportPreferences } from '@/queries/put-user-sport-preferences.query';

import SettingsFooterSubmit from '../settings-footer-submit.component';
import { useSettingsPreferencesStore } from '../../stores/settings-preferences.store';
import { useRemoveUserSportPreferences } from '../../queries/remove-user-sport-preferences.query';
import { checkIsPreferencesDirty, formatPreferencesForComparison } from '../../utils/settings-preferences.utils';

export default function SettingsPreferencesSubmit() {
  const { t } = useTranslate();
  const { trackError, trackEvent } = useAnalytics();
  const { toast } = useToast();
  const { userMe } = useUserMe();
  const { sportPreferences: userSportPreferences } = userMe || {};
  const { isPending: isPutUserSportPreferencesLoading, mutateAsync: putUserSportPreferences } =
    usePutUserSportPreferences();
  const { isPending: isRemoveUserSportPreferencesLoading, mutateAsync: removeUserSportPreferences } =
    useRemoveUserSportPreferences();
  const sportPreferences = useSettingsPreferencesStore(state => state.sportPreferences);

  const initialPreferences = useMemo(
    () => formatPreferencesForComparison(userSportPreferences ?? []),
    [userSportPreferences],
  );

  const isDirty = useMemo(
    () => checkIsPreferencesDirty(initialPreferences, sportPreferences),
    [initialPreferences, sportPreferences],
  );

  const handleApply = async () => {
    try {
      const { sportPreferences: currentSportPreferences } = useSettingsPreferencesStore.getState();
      if (currentSportPreferences?.length === 0) {
        await removeUserSportPreferences();
      } else {
        await putUserSportPreferences({ sportPreferences: currentSportPreferences });
      }
      trackEvent({
        data: {
          is_sport_preference_added: userSportPreferences?.length === 0 && currentSportPreferences.length > 0,
          is_sport_preference_removed: (userSportPreferences?.length ?? 0) > 0 && currentSportPreferences.length === 0,
          is_sport_preference_updated: (userSportPreferences?.length ?? 0) > 0 && currentSportPreferences.length > 0,
        },
        eventName: ANALYTICS_EVENTS.SETTINGS.SETTINGS_PREFERENCES_SPORTS_EDIT_SUCCESS,
      });
      toast({
        title: t('settings.preferences.success'),
        variant: 'success',
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackError({ error });
      trackEvent({
        data: { error_message: errorResponse?.api_error_detail ?? 'Unknown error' },
        eventName: ANALYTICS_EVENTS.SETTINGS.SETTINGS_PREFERENCES_SPORTS_EDIT_FAILED,
      });
    }
  };

  const isPendingApply = isPutUserSportPreferencesLoading || isRemoveUserSportPreferencesLoading;

  return <SettingsFooterSubmit isDirty={isDirty} onPress={handleApply} isLoading={isPendingApply} />;
}
