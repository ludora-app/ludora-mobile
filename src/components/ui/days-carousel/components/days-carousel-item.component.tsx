import { memo } from 'react';
import { Dayjs } from 'dayjs';
import { String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { CarouselItem, cn, ScalePressable } from '@chillui/ui';

import { DayItem } from '../hooks/days-carousel.hook';

type DateCarouselItemProps = {
  day: DayItem;
  isActive: boolean;
  onSelect: (date: Dayjs) => void;
};

function DaysCarouselItem(props: DateCarouselItemProps) {
  const { day, isActive, onSelect } = props;
  const { t } = useTranslate();

  const handlePress = () => onSelect(day.date);

  return (
    <CarouselItem isFullWidth={false}>
      <ScalePressable
        onPress={handlePress}
        className={cn('w-12 items-center rounded-lg border py-2', {
          'border-[#cccdcf] bg-white': !isActive,
          'border-primary bg-primary': isActive,
        })}
      >
        <String colorVariant={isActive ? 'white' : 'dark'} font="primaryBold" variant="body-sm">
          {t(day.dayNameKey)}
        </String>
        <String colorVariant={isActive ? 'white' : 'dark'} font="primaryExtraBold">
          {day.dayNumber}
        </String>
      </ScalePressable>
    </CarouselItem>
  );
}

export default memo(DaysCarouselItem);
