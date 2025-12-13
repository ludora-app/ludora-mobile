import { Dayjs } from 'dayjs';
import { useCallback } from 'react';
import { Carousel, CarouselContent, cn } from '@chillui/ui';

import { useDateCarousel } from '../hooks/days-carousel.hook';
import DateCarouselItem from './days-carousel-item.component';

type DateCarouselProps = {
  onSelect?: (date: Dayjs) => void;
  className?: string;
  contentContainerClassName?: string;
};

export default function DaysCarousel(props: DateCarouselProps) {
  const { className, contentContainerClassName, onSelect } = props;
  const { days, isSelected, setSelected } = useDateCarousel();

  const handleSelect = useCallback(
    (date: Dayjs) => {
      setSelected(date);
      onSelect?.(date);
    },
    [setSelected, onSelect],
  );

  return (
    <Carousel className={className}>
      <CarouselContent contentContainerClassName={cn('gap-2', contentContainerClassName)} pagingEnabled={false}>
        {days.map(day => (
          <DateCarouselItem key={day.isoDate} day={day} isActive={isSelected(day.date)} onSelect={handleSelect} />
        ))}
      </CarouselContent>
    </Carousel>
  );
}
