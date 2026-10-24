import { useTranslate } from '@tolgee/react';
import { BoxRowCenter, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { FooterWrapper } from '@/components/ui/footer-wrapper';

import { useGetOnBoardingStep } from '../../hooks/on-boarding-steps.hook';
import { ON_BOARDING_STEPS_COUNT } from '../../constants/on-boarding.constants';
import { OnBoardingFooterButtonNext } from './on-boarding-footer-button/on-boarding-footer-button-next.component';
import { OnBoardingFooterButtonSubmit } from './on-boarding-footer-button/on-boarding-footer-button-submit.component';

export const OnBoardingFooter = () => {
  const { t } = useTranslate();
  const { activeStep } = useGetOnBoardingStep();

  const isFinalStep = activeStep === ON_BOARDING_STEPS_COUNT;

  return (
    <FooterWrapper className="pt-4" hasBottomSafeArea>
      {isFinalStep ? <OnBoardingFooterButtonSubmit /> : <OnBoardingFooterButtonNext />}
      {isFinalStep && (
        <BoxRowCenter className="gap-1.5">
          <Icon name="user-regular" size="xs" color={COLORS.primary} />
          <String variant="body-xs" font="primarySemiBold" colorVariant="muted">
            {t('on-boarding.availabilities.footer_note')}
          </String>
        </BoxRowCenter>
      )}
    </FooterWrapper>
  );
};
