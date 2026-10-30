import { Slider } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { useOnBoardingStore } from '../../../../stores/on-boarding.store';
import { ON_BOARDING_PLAY_AREA_RADIUS_OPTIONS } from '../../../constants/on-boarding.constants';

export const OnBoardingPlayAreaMapRadiusSlider = () => {
  const { t } = useTranslate();
  const playAreaRadiusKm = useOnBoardingStore(state => state.playAreaRadiusKm);
  const setPlayAreaRadiusKm = useOnBoardingStore(state => state.setPlayAreaRadiusKm);

  return (
    <Slider
      values={ON_BOARDING_PLAY_AREA_RADIUS_OPTIONS}
      value={playAreaRadiusKm}
      onChange={setPlayAreaRadiusKm}
      getLabel={radius => t('on-boarding.play-area.radius_value', { radius })}
    />
  );
};
