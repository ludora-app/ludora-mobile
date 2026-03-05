import { memo } from 'react';
import { String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { cn, ScalePressable } from '@chillui/ui';

import { Dayjs } from '@/lib/dayjs';

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
  );
}

export default memo(DaysCarouselItem);
