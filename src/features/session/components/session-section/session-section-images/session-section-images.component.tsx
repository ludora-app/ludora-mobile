import { useMemo } from 'react';
import { Image } from '@ludo/ui';
import { Carousel, CarouselContent, CarouselDots, CarouselElement, CarouselItem } from '@chillui/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { getSportPlaceHolder } from '@/utils/sports.utils';
import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionImagesHeader from './session-images-section-header.component';

type SessionSectionImagesProps = {
  session: FindOneSessionResponseData;
};

export default function SessionSectionImages(props: SessionSectionImagesProps) {
  const { top } = useSafeArea();
  const { session } = props;

  const { fieldImages, sport } = session || {};

  const sportPlaceholder = useMemo(() => getSportPlaceHolder(sport), [sport]);

  const sessionImages: FindOneSessionResponseData['fieldImages'] =
    fieldImages && fieldImages?.length > 0 ? fieldImages : [{ order: 1, url: sportPlaceholder }];

  return (
    <Carousel>
      <CarouselContent className="h-48 w-full">
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
        <SessionSectionImagesHeader sessionUid={session?.uid ?? ''} />
      </CarouselElement>
    </Carousel>
  );
}
