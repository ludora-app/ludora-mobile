import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Button, Card, CardDescription, CardTitle } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { MascotHalo } from '@/components/ui/mascot-halo';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useGetHasSportPreferences } from '../queries/get-has-sport-preferences.query';
import { useGetIsFirstSessionPending } from '../queries/get-is-first-session-pending.query';

export const HomeFirstSessionCard = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { trackEvent } = useAnalytics();
  const { isFirstSessionPending } = useGetIsFirstSessionPending();
  const { hasSportPreferences, isLoading: isLoadingSportPreferences } = useGetHasSportPreferences({
    isEnabled: isFirstSessionPending,
  });

  if (!isFirstSessionPending) return null;

  const handleJoin = () => {
    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.REMINDER_CARD_JOIN_PRESSED });
    router.navigate(ROUTES.ON_BOARDING.SESSIONS_SUGGESTIONS);
  };

  // The prepared session needs a sport: without one, the regular create-session flow
  const handleCreate = () => {
    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.REMINDER_CARD_CREATE_PRESSED });
    router.navigate(hasSportPreferences ? ROUTES.ON_BOARDING.SESSIONS_PREPARED : ROUTES.CREATE_SESSION.STEP_1);
  };

  return (
    <Card className="gap-3.5 bg-tertiarySoft p-4">
      <BoxRow className="items-center gap-3">
        <MascotHalo name="ludo-idea" size="sm" />
        <Box className="flex-1">
          <CardTitle variant="body-1" font="primaryExtraBold">
            {t('home.first_session_card.title')}
          </CardTitle>
          <CardDescription>{t('home.first_session_card.description')}</CardDescription>
        </Box>
      </BoxRow>
      <BoxRow className="gap-2.5">
        <Button
          title={t('home.first_session_card.join')}
          variant="outlined"
          colorVariant="primary"
          size="sm"
          className="flex-1"
          onPress={handleJoin}
        />
        <Button
          title={t('home.first_session_card.create')}
          colorVariant="secondary"
          size="sm"
          className="flex-1"
          // The destination depends on the sport preferences: no tap before they are known
          isLoading={isLoadingSportPreferences}
          onPress={handleCreate}
        />
      </BoxRow>
    </Card>
  );
};
