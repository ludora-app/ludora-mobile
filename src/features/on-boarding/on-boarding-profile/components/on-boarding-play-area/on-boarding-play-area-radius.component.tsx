import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { BoxRow, Card, Icon, String } from '@ludo/ui';
import Animated, { FadeInDown } from 'react-native-reanimated';

import COLORS from '@/constants/colors.contstants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useOnBoardingStore } from '../../../stores/on-boarding.store';
import { ON_BOARDING_PLAY_AREA_RADIUS_OPTIONS } from '../../constants/on-boarding.constants';

export const OnBoardingPlayAreaRadius = () => {
  const { t } = useTranslate();
  const { trackEvent } = useAnalytics();
  const playAreaRadiusKm = useOnBoardingStore(state => state.playAreaRadiusKm);
  const setPlayAreaRadiusKm = useOnBoardingStore(state => state.setPlayAreaRadiusKm);
  const setIsPlayAreaMapVisible = useOnBoardingStore(state => state.setIsPlayAreaMapVisible);

  const handleShowMap = () => {
    setIsPlayAreaMapVisible(true);
    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.MAP_OPENED });
  };

  return (
    <Animated.View entering={FadeInDown} className="gap-2.5">
      <BoxRow className="items-center justify-between gap-2.5">
        <String variant="body-sm" font="primaryExtraBold" colorVariant="muted" className="shrink">
          {t('on-boarding.play-area.radius_title')}
        </String>
        <Pressable onPress={handleShowMap} className="h-11 flex-row items-center gap-1.5 pl-2">
          <Icon name="map-regular" color={COLORS.primary} />
          <String font="primaryExtraBold" colorVariant="primary">
            {t('on-boarding.play-area.show_map')}
          </String>
        </Pressable>
      </BoxRow>
      <BoxRow className="flex-wrap gap-2.5">
        {ON_BOARDING_PLAY_AREA_RADIUS_OPTIONS.map(radiusKm => (
          <Card
            key={radiusKm}
            onPress={() => setPlayAreaRadiusKm(radiusKm)}
            isSelected={radiusKm === playAreaRadiusKm}
            className="min-h-18 grow basis-[45%] gap-0.5 py-3"
          >
            <String variant="title-1" className="leading-7">
              {t('on-boarding.play-area.radius_value', { radius: radiusKm })}
            </String>
            <String variant="body-sm" font="primarySemiBold" colorVariant="muted">
              {t(`on-boarding.play-area.radius_${radiusKm}`)}
            </String>
          </Card>
        ))}
      </BoxRow>
    </Animated.View>
  );
};
