import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { BoxCenter, Button, String, Wrapper } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { MascotHalo } from '@/components/ui/mascot-halo';
import { useDisableBack } from '@/hooks/navigation.hooks';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useGetRecommendedSessions } from '../queries/get-recommended-sessions.query';

export const OnBoardingProfilReadyScreen = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { trackEvent } = useAnalytics();
  const { isError, isLoading, suggestions } = useGetRecommendedSessions();

  useDisableBack();

  const hasSuggestions = suggestions.length > 0 || isError;

  const handlePress = () => {
    trackEvent({
      data: { suggestions_count: suggestions.length },
      eventName: ANALYTICS_EVENTS.ONBOARDING.SESSIONS_READY_CONTINUED,
    });
    if (hasSuggestions) {
      router.navigate(ROUTES.ON_BOARDING.SESSIONS_SUGGESTIONS);
      return;
    }
    router.dismissTo(ROUTES.HOME.INDEX);
  };

  return (
    <Wrapper fill className="bg-tertiary" safeArea={['top', 'bottom-4']}>
      <BoxCenter className="flex-1 gap-4.5 px-4">
        <MascotHalo name="ludo-pompom" size="xl" isAnimated />
        <String variant="title-1" className="text-center">
          {t('on-boarding.sessions.ready.title')}
        </String>
        {!isLoading && (
          <String variant="body-2" font="primarySemiBold" className="text-center">
            {t(
              hasSuggestions
                ? 'on-boarding.sessions.ready.description_suggestions'
                : 'on-boarding.sessions.ready.description_no_match',
            )}
          </String>
        )}
      </BoxCenter>
      <Button
        title={t(hasSuggestions ? 'on-boarding.sessions.ready.see_sessions' : 'on-boarding.sessions.go_home')}
        colorVariant="secondary"
        size="xl"
        isLoading={isLoading}
        onPress={handlePress}
      />
    </Wrapper>
  );
};
