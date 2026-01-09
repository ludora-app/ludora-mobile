import { useLocalSearchParams } from 'expo-router';

import { FiltersCalendarReturnParams } from '@/features/filters/filters-calendar/types/filters-calendar.types';

import FilterSessionDate from './filter-session-date.component';

export default function FilterSessionDateWrapper() {
  const { date } = useLocalSearchParams<FiltersCalendarReturnParams>();

  return <FilterSessionDate date={date} />;
}
