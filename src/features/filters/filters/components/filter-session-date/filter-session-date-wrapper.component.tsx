import { useLocalSearchParams } from 'expo-router';

import FilterSessionDate from './filter-session-date.component';
import { FiltersCalendarReturnParams, FiltersScreenParams } from '../../types/filters.types';

export default function FilterSessionDateWrapper() {
  const { date, selectedDayCarouselDate } = useLocalSearchParams<FiltersCalendarReturnParams & FiltersScreenParams>();

  return <FilterSessionDate date={date} selectedDayCarouselDate={selectedDayCarouselDate} />;
}
