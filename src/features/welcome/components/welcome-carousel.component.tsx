import { ludoMeet } from 'assets';
import { useTranslate } from '@tolgee/react';
import { Box, Icon, Image, String } from '@ludo/ui';
import { Carousel, CarouselContent, CarouselDots, CarouselElement, CarouselItem, cn, OutlinedString } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';
import { TIconsAll } from '@/constants/icons.constants';

type CarouselItemProps = {
  className: string;
  content: string;
  id: number;
  icon?: {
    name: TIconsAll;
    className?: string;
  }
  image?: {
    source: string;
    className?: string;
  }
  title: string;
}

const carouselItems: CarouselItemProps[] = [
  {
    className: 'ml-2',
    content: 'welcome.slide_1_description',
    icon: {
      className: "w-2/3 h-36",
      name: "ludo-pompom-border",
    },
    id: 1,
    title: 'welcome.slide_1_title',
  },
  {
    className: 'ml-1',
    content: 'welcome.slide_2_description',
    id: 2,
    image: {
      className: "w-2/3 h-40",
      source: ludoMeet,
    },
    title: 'welcome.slide_2_title',
  },
  {
    className: 'ml-1',
    content: 'welcome.slide_3_description',
    icon: {
      className: "w-2/3 h-36",
      name: "ludo-idea-2",
    },
    id: 3,
    title: 'welcome.slide_3_title',
  },
];

export default function WelcomeCarousel() {
  const { t } = useTranslate();
  return (
    <Carousel className="flex-1" autoPlay autoPlayLoop>
      <CarouselContent>
        {carouselItems.map(item => (
          <CarouselItem key={item.id} className="items-center justify-center px-5 pb-10">
            <Box className="items-center justify-center gap-4">
              <Box className="w-screen items-center">
                {item.icon && <Icon name={item.icon.name} className={cn(item.icon.className)} />}
                {item.image && <Image source={item.image.source} alt="ludo-meet" className={cn(item.image.className)} contentFit="contain" />}
              </Box>
              <Box className="items-center justify-center">
                <OutlinedString
                  text={t(item.title)}
                  fontSize={40}
                  fillColor={COLORS.primary}
                  strokeColor="#FFFFFF"
                  strokeWidth={3}
                  fontFamily="NunitoSans700Bold"
                  className={item.className}
                />
                <String className="px-3 text-center" variant="body-3" font="primaryBold">
                  {t(item.content)}
                </String>
              </Box>
            </Box>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselElement>
        <CarouselDots />
      </CarouselElement>
    </Carousel >
  );
}
