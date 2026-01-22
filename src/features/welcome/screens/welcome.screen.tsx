import { bigLogo } from 'assets';
import { WrapperSafeAreaView, Image } from '@ludo/ui';

import WelcomeFooter from '../components/welcome-footer.component';
import WelcomeCarousel from '../components/welcome-carousel.component';

export default function WelcomeComponent() {
  return (
    // top2 : #ede9d0
    <WrapperSafeAreaView px='none' className="bg-[#ffe7d6] items-center justify-center">
      <Image source={bigLogo} contentFit="contain" className="size-36" />
      <WelcomeCarousel />
      <WelcomeFooter />
    </WrapperSafeAreaView>
  );
}
