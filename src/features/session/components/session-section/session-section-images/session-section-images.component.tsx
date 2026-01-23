import { useMemo } from 'react';
import { Image } from '@ludo/ui';
import { Carousel, CarouselContent, CarouselDots, CarouselElement, CarouselItem } from '@chillui/ui';

import { getSportImage } from '@/utils/sports.utils';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionImagesHeader from './session-images-section-header.component';

type SessionSectionImagesProps = {
  session: FindOneSessionResponseData;
};

export default function SessionSectionImages(props: SessionSectionImagesProps) {
  const { top } = useSafeArea();
  const { session } = props;

  const { fieldImages, sport } = session || {};

  const sportImage = useMemo(() => getSportImage(sport), [sport]);

  const sessionImages: FindOneSessionResponseData['fieldImages'] =
    fieldImages && fieldImages?.length > 0 ? fieldImages : [{ url: sportImage }];

  return (
    <Carousel>
      <CarouselContent className="h-72 w-full">
        {sessionImages?.map((image, index) => (
          <CarouselItem key={index}>
            <Image source={image.url || ''} contentFit="cover" className="size-full" />
          </CarouselItem>
        ))}
      </CarouselContent>
      {sessionImages?.length > 1 && (
        <CarouselElement>
          <CarouselDots />
        </CarouselElement>
      )}
      <CarouselElement position="top" style={{ paddingTop: top }}>
        <SessionSectionImagesHeader />
      </CarouselElement>
    </Carousel>
  );
}
