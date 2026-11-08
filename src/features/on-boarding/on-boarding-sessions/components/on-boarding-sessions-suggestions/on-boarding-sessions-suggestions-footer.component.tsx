import { Button } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { FooterWrapper } from '@/components/ui/footer-wrapper';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

export const OnBoardingSessionsSuggestionsFooter = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const handleCreateOwn = () => {
    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.SESSIONS_CREATE_OWN_PRESSED });
    router.navigate(ROUTES.ON_BOARDING.SESSIONS_PREPARED);
  };

  const handleGoHome = () => {
    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.SESSIONS_GO_HOME_PRESSED });
    router.dismissTo(ROUTES.HOME.INDEX);
  };

  return (
    <FooterWrapper className="gap-2.5" hasBottomSafeArea>
      <Button
        title={t('on-boarding.sessions.suggestions.create_own')}
        variant="outlined"
        colorVariant="primary"
        size="md"
        onPress={handleCreateOwn}
      />
      <Button title={t('on-boarding.sessions.go_home')} colorVariant="muted" size="md" onPress={handleGoHome} />
    </FooterWrapper>
  );
};
