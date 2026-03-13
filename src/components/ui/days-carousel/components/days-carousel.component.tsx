import { cn } from '@chillui/ui';
import { debounce } from 'radash';
import { FlatList, useWindowDimensions, ViewToken } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Dayjs } from '@/lib/dayjs';

import { useDateCarousel } from '../hooks/days-carousel.hook';
import DateCarouselItem from './days-carousel-item.component';

type DateCarouselProps = {
  onSelect?: (date: Dayjs) => void;
  className?: string;
  contentContainerClassName?: string;
  initialDate?: Dayjs;
  startDay?: Dayjs;
  numberOfDays?: number;
};

const DEBOUNCE_DELAY = 300;

const ITEM_WIDTH = 48;
const ITEM_SPACING = 8;

const DEFAULT_NBR_OF_DAYS = 14;

export default function DaysCarousel(props: DateCarouselProps) {
  const { className, contentContainerClassName, initialDate, numberOfDays = DEFAULT_NBR_OF_DAYS, onSelect, startDay } = props;
  const { days, isSelected, selected, setSelected, } = useDateCarousel({ initialDate, numberOfDays, startDate: startDay });
  const flatListRef = useRef<FlatList>(null);
  const previousSelectedRef = useRef<Dayjs | null>(selected);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const { width: screenWidth } = useWindowDimensions();

  const debouncedOnSelect = useMemo(
    () =>
      debounce({ delay: DEBOUNCE_DELAY }, (date: Dayjs) => {
        onSelect?.(date);
      }),
    [onSelect],
  );

  const handleSelect = useCallback(
    (date: Dayjs) => {
      previousSelectedRef.current = date;
      setSelected(date);
      debouncedOnSelect(date);
    },
    [setSelected, debouncedOnSelect],
  );

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const indices = viewableItems.map(item => item.index).filter((i): i is number => i !== null);
    setVisibleIndices(indices);
  }, []);

  useEffect(() => {
    const isUserInitiated = previousSelectedRef.current?.isSame(selected, 'day');
    previousSelectedRef.current = selected;

    if (isUserInitiated) {
      return;
    }

    const selectedIndex = days.findIndex(day => day.date.isSame(selected, 'day'));
    const isVisible = visibleIndices.includes(selectedIndex);

    if (selectedIndex !== -1 && !isVisible) {
      const itemOffset = selectedIndex * (ITEM_WIDTH + ITEM_SPACING);
      const offset20Percent = itemOffset - screenWidth * 0.2;
      flatListRef.current?.scrollToOffset({ animated: true, offset: Math.max(0, offset20Percent) });
    }
  }, [selected, days, visibleIndices, screenWidth]);


  return (
    <FlatList
      ref={flatListRef}
      data={days}
      keyExtractor={day => day.isoDate}
      renderItem={({ item: day }) => (
        <DateCarouselItem day={day} isActive={isSelected(day.date)} onSelect={handleSelect} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      className={className}
      contentContainerClassName={cn('gap-2', contentContainerClassName)}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
    />
  );
}
