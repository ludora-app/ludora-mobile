import { Dayjs } from 'dayjs';
import { debounce } from 'radash';
import { useCallback, useMemo } from 'react';
import { Carousel, CarouselContent, cn } from '@chillui/ui';

import { useDateCarousel } from '../hooks/days-carousel.hook';
import DateCarouselItem from './days-carousel-item.component';

type DateCarouselProps = {
  onSelect?: (date: Dayjs) => void;
  className?: string;
  contentContainerClassName?: string;
  initialDate?: Dayjs;
};

const DEBOUNCE_DELAY = 300;

export default function DaysCarousel(props: DateCarouselProps) {
  const { className, contentContainerClassName, initialDate, onSelect } = props;
  const { days, isSelected, setSelected } = useDateCarousel({ initialDate });

  const debouncedOnSelect = useMemo(
    () =>
      debounce({ delay: DEBOUNCE_DELAY }, (date: Dayjs) => {
        onSelect?.(date);
      }),
    [onSelect],
  );

  const handleSelect = useCallback(
    (date: Dayjs) => {
      setSelected(date);
      debouncedOnSelect(date);
    },
    [setSelected, debouncedOnSelect],
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
