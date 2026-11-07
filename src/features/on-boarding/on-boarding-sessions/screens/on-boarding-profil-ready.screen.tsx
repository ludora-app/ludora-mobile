import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { BoxCenter, Button, String, Wrapper } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { useUserMe } from '@/queries/user-me.query';
import { MascotHalo } from '@/components/ui/mascot-halo';
import { useDisableBack } from '@/hooks/navigation.hooks';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useGetRecommendedSessions } from '../queries/get-recommended-sessions.query';

function getDescriptionKey({ hasPlayArea, hasSuggestions }: { hasPlayArea: boolean; hasSuggestions: boolean }) {
  if (!hasPlayArea) return 'on-boarding.sessions.ready.description_no_place';
  if (hasSuggestions) return 'on-boarding.sessions.ready.description_suggestions';
  return 'on-boarding.sessions.ready.description_no_match';
}

export const OnBoardingProfilReadyScreen = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { trackEvent } = useAnalytics();
  const { isLoading: isLoadingUserMe, userMe } = useUserMe();
  const { isError, isLoading: isLoadingSuggestions, suggestions } = useGetRecommendedSessions();

  useDisableBack();

  const isLoading = isLoadingUserMe || isLoadingSuggestions;
  const hasPlayArea = !!userMe?.playArea;
  // Without place, the suggestions are skipped: the prepared session asks for it
  const hasSuggestions = hasPlayArea && (suggestions.length > 0 || isError);

  const handlePress = () => {
    trackEvent({
      data: { has_play_area: hasPlayArea, suggestions_count: suggestions.length },
      eventName: ANALYTICS_EVENTS.ONBOARDING.SESSIONS_READY_CONTINUED,
    });
    router.navigate(hasSuggestions ? ROUTES.ON_BOARDING.SESSIONS_SUGGESTIONS : ROUTES.ON_BOARDING.SESSIONS_PREPARED);
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
            {t(getDescriptionKey({ hasPlayArea, hasSuggestions }))}
          </String>
        )}
      </BoxCenter>
      <Button
        title={t(hasSuggestions ? 'on-boarding.sessions.ready.see_sessions' : 'on-boarding.sessions.ready.see_my_session')}
        colorVariant="secondary"
        size="xl"
        isLoading={isLoading}
        onPress={handlePress}
      />
    </Wrapper>
  );
};
