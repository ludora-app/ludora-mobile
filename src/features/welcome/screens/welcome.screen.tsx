import { bigLogo } from 'assets';
import { BoxGrow, Image, Wrapper } from '@ludo/ui';

import WelcomeFooter from '../components/welcome-footer.component';
import WelcomeCarousel from '../components/welcome-carousel.component';

export default function WelcomeComponent() {

  return (
    // top2 : #ede9d0
    <BoxGrow className="bg-[#ffe7d6]">
      <Wrapper px='none' hasSafeArea className='items-center justify-center' fill >
        <Image source={bigLogo} contentFit="contain" className="size-36" />
        <WelcomeCarousel />
        <WelcomeFooter />
      </Wrapper>
    </BoxGrow>
  );
}
