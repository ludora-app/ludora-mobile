import { String } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { FooterWrapper } from '@/components/ui/footer-wrapper';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

export const OnBoardingSessionsSuggestionsFooter = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const handlePress = () => {
    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.SESSIONS_CREATE_OWN_PRESSED });
    router.replace(ROUTES.CREATE_SESSION.STEP_1);
  };

  return (
    <FooterWrapper className="items-center" hasBottomSafeArea>
      <Pressable className="h-12 justify-center" onPress={handlePress}>
        <String font="primaryExtraBold" colorVariant="primary" className="underline">
          {t('on-boarding.sessions.suggestions.create_own')}
        </String>
      </Pressable>
    </FooterWrapper>
  );
};
