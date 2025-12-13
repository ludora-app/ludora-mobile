import dayjs, { Dayjs } from 'dayjs';
// import 'dayjs/locale/fr'; // TODO: put in index or app ??
import { useState, useMemo, useCallback } from 'react';

const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

export type DayItem = {
  date: Dayjs;
  dayNameKey: string;
  dayNumber: string;
  isoDate: string;
};

type UseDateCarouselProps = {
  numberOfDays?: number;
  startDate?: Dayjs;
  initialDate?: Dayjs;
};

export function useDateCarousel({ initialDate, numberOfDays = 14, startDate }: UseDateCarouselProps = {}) {
  const [defaultStart] = useState(() => dayjs());

  const effectiveStartDate = startDate || defaultStart;
  const effectiveInitialDate = initialDate || defaultStart;

  const [selected, setSelected] = useState<Dayjs>(effectiveInitialDate);

  const startTimestamp = effectiveStartDate.valueOf();

  const days: DayItem[] = useMemo(() => {
    const start = dayjs(startTimestamp);

    return Array.from({ length: numberOfDays }, (_, i) => {
      const date = start.add(i, 'day');
      const dayIndex = date.day(); // 0 (Sunday) to 6 (Saturday)

      return {
        date,
        dayNameKey: `days-carousel.days_${DAY_KEYS[dayIndex]}`,
        dayNumber: date.format('D'),
        isoDate: date.toISOString(),
      };
    });
  }, [numberOfDays, startTimestamp]); // Dépendances primitives = stabilité garantie

  const isSelected = useCallback((date: Dayjs) => date.isSame(selected, 'day'), [selected]);

  return {
    days,
    isSelected,
    selected,
    setSelected,
  };
}
