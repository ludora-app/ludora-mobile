
import { FooterWrapper } from '@/components/ui/footer-wrapper';

import { useGetOnBoardingStep } from '../../hooks/on-boarding-steps.hook';
import OnBoardingFooterButtonNext from './on-boarding-footer-button/on-boarding-footer-button.next.component';
import OnBoardingFooterButtonSubmit from './on-boarding-footer-button/on-boarding-footer-button-submit.component';



export default function OnBoardingFooter() {
  const { activeStep } = useGetOnBoardingStep();

  const isFinalStep = activeStep === 3;

  return (
    <FooterWrapper hasBottomSafeArea>
      {isFinalStep ? <OnBoardingFooterButtonSubmit /> : <OnBoardingFooterButtonNext />}
    </FooterWrapper>
  );
}
