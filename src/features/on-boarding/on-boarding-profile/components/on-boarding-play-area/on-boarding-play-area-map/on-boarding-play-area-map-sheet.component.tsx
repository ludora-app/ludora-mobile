import { useTranslate } from '@tolgee/react';
import { BoxRow, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { FooterWrapper } from '@/components/ui/footer-wrapper';

import { useOnBoardingStore } from '../../../../stores/on-boarding.store';
import { OnBoardingPlayAreaMapRadiusSlider } from './on-boarding-play-area-map-radius-slider.component';
import { OnBoardingFooterButtonNext } from '../../on-boarding-footer/on-boarding-footer-button/on-boarding-footer-button-next.component';

export const OnBoardingPlayAreaMapSheet = () => {
  const { t } = useTranslate();
  const playArea = useOnBoardingStore(state => state.playArea);
  const playAreaRadiusKm = useOnBoardingStore(state => state.playAreaRadiusKm);

  const placeName = playArea?.isCurrentLocation
    ? `${t('on-boarding.play-area.around_you_title')} · ${playArea.label}`
    : [playArea?.label, playArea?.description].filter(Boolean).join(' · ');

  return (
    <FooterWrapper className="gap-3 rounded-t-sheet px-6 pt-5" hasBottomSafeArea>
      <BoxRow className="items-center justify-between gap-3">
        <String variant="title-1">{t('on-boarding.play-area.title')}</String>
        <String variant="body-3" font="secondaryExtraBold" colorVariant="primary">
          {t('on-boarding.play-area.radius_value', { radius: playAreaRadiusKm })}
        </String>
      </BoxRow>
      <BoxRow className="items-center gap-2">
        <Icon name="location-regular" size="sm" color={COLORS.primary} />
        <String variant="body-sm" font="primaryBold" className="shrink" truncate>
          {placeName}
        </String>
      </BoxRow>
      <OnBoardingPlayAreaMapRadiusSlider />
      <OnBoardingFooterButtonNext />
    </FooterWrapper>
  );
};
