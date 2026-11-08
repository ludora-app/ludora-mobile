import { useTranslate } from '@tolgee/react';
import { LoadingIndicator } from '@chillui/ui';
import { Box, BoxCenter, Card, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';

import { useOnBoardingStore } from '../../../stores/on-boarding.store';
import { useOnBoardingPlayAreaLocation } from '../../hooks/on-boarding-play-area-location.hook';

export const OnBoardingPlayAreaLocationCard = () => {
  const { t } = useTranslate();
  const playArea = useOnBoardingStore(state => state.playArea);
  const { isLocating, locate } = useOnBoardingPlayAreaLocation();

  const isCurrentLocation = !!playArea?.isCurrentLocation;

  const getTexts = () => {
    if (!playArea) {
      return {
        description: t('on-boarding.play-area.around_me_description'),
        title: t('on-boarding.play-area.around_me_title'),
      };
    }
    if (isCurrentLocation) {
      return {
        description: t('on-boarding.play-area.around_you_description', { label: playArea.label }),
        title: t('on-boarding.play-area.around_you_title'),
      };
    }
    return { description: playArea.description, title: playArea.label };
  };

  const { description, title } = getTexts();

  const handlePress = () => {
    if (isLocating) return;
    locate();
  };

  return (
    <Card onPress={handlePress} isSelected={isCurrentLocation} className="min-h-16 flex-row items-center gap-3.5 py-3">
      <BoxCenter className="size-11 rounded-full bg-primarySoft">
        {isLocating ? (
          <LoadingIndicator name="swing" color={COLORS.primary} />
        ) : (
          <Icon name={isCurrentLocation ? 'checked-circle-solid' : 'gps-location-regular'} color={COLORS.primary} />
        )}
      </BoxCenter>
      <Box className="flex-1">
        <String font="primaryExtraBold" truncate>
          {title}
        </String>
        {!!description && (
          <String variant="body-sm" font="primarySemiBold" colorVariant="muted" truncate>
            {description}
          </String>
        )}
      </Box>
    </Card>
  );
};
