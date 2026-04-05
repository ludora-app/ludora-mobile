import { useTranslate } from '@tolgee/react';

import { ErrorResponse } from '@/api/orval.instance';
import { useToast } from '@/components/chill-ui-library';
import { HourPreferenceData } from '@/api/generated/model';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import SettingsFooterSubmit from '../settings-footer-submit.component';
import { checkIsPlanningDirty } from '../../utils/settings-planning.utils';
import { useSettingsPlanningStore } from '../../stores/settings-planning.store';
import { usePutUserHoursPreferences } from '../../queries/user-hours-preferences/put-user-hours-preferences.query';
import { useRemoveUserHoursPreferences } from '../../queries/user-hours-preferences/remove-user-hours-preferences.query';

type SettingsPlanningSubmitProps = {
  initialPlanning: readonly HourPreferenceData[];
};

export default function SettingsPlanningSubmit(props: SettingsPlanningSubmitProps) {
  const { t } = useTranslate();
  const { trackError, trackEvent } = useAnalytics();
  const { toast } = useToast();
  const { initialPlanning } = props;
  const { isPending: putUserHoursPreferencesIsPending, mutateAsync: putUserHoursPreferences } =
    usePutUserHoursPreferences();
  const { isPending: removeUserHoursPreferencesIsPending, mutateAsync: removeUserHoursPreferences } =
    useRemoveUserHoursPreferences();
  const isDirty = useSettingsPlanningStore(state => checkIsPlanningDirty(initialPlanning, state.planning));

  const handleApply = async () => {
    try {
      const { planning: currentPlanning } = useSettingsPlanningStore.getState();
      if (currentPlanning.length === 0) {
        await removeUserHoursPreferences();
      } else {
        await putUserHoursPreferences({ hourPreferences: currentPlanning });
      }
      toast({
        title: t('settings.planning.apply_success'),
        variant: 'success',
      });
      trackEvent({
        data: {
          is_planning_added: initialPlanning?.length === 0 && currentPlanning?.length > 0,
          is_planning_removed: initialPlanning?.length > 0 && currentPlanning?.length === 0,
          is_planning_updated: initialPlanning?.length > 0 && currentPlanning?.length > 0,
        },
        eventName: ANALYTICS_EVENTS.SETTINGS.SETTINGS_PLANNING_EDIT_SUCCESS,
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: {
          error_message: errorResponse?.api_error_detail ?? 'Unknown error',
        },
        eventName: ANALYTICS_EVENTS.SETTINGS.SETTINGS_PLANNING_EDIT_FAILED,
      });
      trackError({ error });
    }
  };

  return (
    <SettingsFooterSubmit
      isDirty={isDirty}
      onPress={handleApply}
      isLoading={putUserHoursPreferencesIsPending || removeUserHoursPreferencesIsPending}
    />
  );
}
