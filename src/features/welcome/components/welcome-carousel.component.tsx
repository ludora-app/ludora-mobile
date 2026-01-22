import { useTranslate } from '@tolgee/react';
import { Box, Image, String } from '@ludo/ui';
import { basketPlayer, tennisPlayer, footballPlayer } from 'assets';
import { Carousel, CarouselContent, CarouselDots, CarouselElement, CarouselItem, OutlinedString } from '@chillui/ui';

import COLORS from '@/constants/COLORS';

const carouselItems = [
  {
    className: 'ml-2',
    content: 'welcome.slide_1_description',
    id: 1,
    image: tennisPlayer,
    title: 'welcome.slide_1_title',
  },
  {
    className: 'ml-1',
    content: 'welcome.slide_2_description',
    id: 2,
    image: footballPlayer,
    title: 'welcome.slide_2_title',
  },
  {
    className: 'ml-1',
    content: 'welcome.slide_3_description',
    id: 3,
    image: basketPlayer,
    title: 'welcome.slide_3_title',
  },
];


export default function WelcomeCarousel() {
  const { t } = useTranslate();
  return (
    <Carousel className="flex-1" autoPlay autoPlayLoop>
      <CarouselContent >
        {carouselItems.map(item => (
          <CarouselItem key={item.id} className="items-center justify-center px-5 pb-10">
            <Box className="items-center justify-center gap-3">
              <Box className='h-1/2 w-screen '>
                <Image source={item.image} contentFit="contain" className="size-full" />
              </Box>
              <OutlinedString
                text={t(item.title)}
                fontSize={40}
                fillColor="#FFFFFF"
                strokeColor={COLORS.primary}
                strokeWidth={3}
                fontFamily="NunitoSans700Bold"
                className={item.className}
              />
              <String className="text-center px-3" variant="body-3" font="primaryBold">
                {t(item.content)}
              </String>
            </Box>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselElement>
        <CarouselDots />
      </CarouselElement>
    </Carousel>
  );
}
