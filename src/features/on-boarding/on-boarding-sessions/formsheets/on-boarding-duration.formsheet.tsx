import { useState } from 'react';
import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { Box, Button, String } from '@ludo/ui';

import dayjs from '@/lib/dayjs';
import ROUTES from '@/constants/routes.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { formatSessionStartDate } from '@/utils/sessions.utils';
import { DurationPicker } from '@/components/ui/duration-picker';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { FormSheetFooter } from '@/components/ui/form-sheet/components/form-sheet-footer.component';
import { FormSheetHeader } from '@/components/ui/form-sheet/components/form-sheet-header.component';
import { FormSheetWrapper } from '@/components/ui/form-sheet/components/form-sheet-wrapper.component';
import { FormSheetContent } from '@/components/ui/form-sheet/components/form-sheet-content.component';

import { useOnBoardingSessionsStore } from '../../stores/on-boarding-sessions.store';
import { ON_BOARDING_SESSION_DEFAULT_DURATION_MINUTES } from '../constants/on-boarding-sessions.constants';

export const OnBoardingDurationFormSheet = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const pendingSlot = useOnBoardingSessionsStore(state => state.pendingSlot);
  const preparedSession = useOnBoardingSessionsStore(state => state.preparedSession);
  const setPreparedSession = useOnBoardingSessionsStore(state => state.setPreparedSession);
  const setSelectedField = useOnBoardingSessionsStore(state => state.setSelectedField);

  const [duration, setDuration] = useState(() =>
    preparedSession
      ? dayjs(preparedSession.endDate).diff(preparedSession.startDate, 'minute')
      : ON_BOARDING_SESSION_DEFAULT_DURATION_MINUTES,
  );

  if (!pendingSlot || !preparedSession) return null;

  const { field, startDate } = pendingSlot;

  const handleValidate = () => {
    setPreparedSession({
      ...preparedSession,
      endDate: dayjs(startDate).add(duration, 'minute').toDate(),
      startDate,
    });
    setSelectedField(field);
    trackEvent({
      data: { duration_minutes: duration, field_uid: field.uid, has_position: field.userDistance != null },
      eventName: ANALYTICS_EVENTS.ONBOARDING.FIELD_CHOSEN,
    });
    toast({ message: t('on-boarding.sessions.fields.chosen'), variant: 'success' });
    router.dismissTo(ROUTES.ON_BOARDING.SESSIONS_PREPARED);
  };

  return (
    <FormSheetWrapper>
      <FormSheetHeader />
      <FormSheetContent className="gap-4">
        <Box className="gap-1">
          <String variant="title-1">{t('on-boarding.sessions.duration.title')}</String>
          <String variant="body-sm" font="primarySemiBold" colorVariant="muted">
            {`${field.name ?? field.shortAddress} · ${formatSessionStartDate(startDate.toISOString())}`}
          </String>
        </Box>
        <DurationPicker startDate={startDate} value={duration} onChange={setDuration} />
      </FormSheetContent>
      <FormSheetFooter>
        <Button title={t('common.validate')} colorVariant="secondary" size="xl" onPress={handleValidate} />
      </FormSheetFooter>
    </FormSheetWrapper>
  );
};
