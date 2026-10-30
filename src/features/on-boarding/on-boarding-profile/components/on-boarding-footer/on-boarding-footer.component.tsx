import { FooterWrapper } from '@/components/ui/footer-wrapper';

import { OnBoardingFooterNote } from './on-boarding-footer-note.component';
import { ON_BOARDING_PLAY_AREA_STEP, ON_BOARDING_STEPS_COUNT } from '../../constants/on-boarding.constants';
import { useGetOnBoardingStep, useIsOnBoardingPlayAreaMapVisible } from '../../hooks/on-boarding-steps.hook';
import { OnBoardingFooterButtonNext } from './on-boarding-footer-button/on-boarding-footer-button-next.component';
import { OnBoardingFooterButtonSubmit } from './on-boarding-footer-button/on-boarding-footer-button-submit.component';

export const OnBoardingFooter = () => {
  const { activeStep } = useGetOnBoardingStep();
  const isPlayAreaMapVisible = useIsOnBoardingPlayAreaMapVisible();

  const isFinalStep = activeStep === ON_BOARDING_STEPS_COUNT;
  const isPlayAreaStep = activeStep === ON_BOARDING_PLAY_AREA_STEP;

  // The map view has its own bottom sheet with the next button
  if (isPlayAreaMapVisible) return null;

  return (
    <FooterWrapper className="pt-4" hasBottomSafeArea>
      {isFinalStep ? <OnBoardingFooterButtonSubmit /> : <OnBoardingFooterButtonNext />}
      {isPlayAreaStep && (
        <OnBoardingFooterNote iconName="hidden-lock-regular" labelKey="on-boarding.play-area.footer_note" />
      )}
      {isFinalStep && <OnBoardingFooterNote iconName="user-regular" labelKey="on-boarding.availabilities.footer_note" />}
    </FooterWrapper>
  );
};
