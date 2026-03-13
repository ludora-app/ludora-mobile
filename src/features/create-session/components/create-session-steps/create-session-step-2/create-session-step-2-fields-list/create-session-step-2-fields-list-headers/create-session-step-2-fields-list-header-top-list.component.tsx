import dayjs, { Dayjs } from '@/lib/dayjs';
import { DaysCarousel } from '@/components/ui/days-carousel';
import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';

// **
// if it's after 22h, start the carousel on the next day
// **
const getStartDay = () => {
  const now = dayjs();
  if (now.hour() >= 22) {
    return now.add(1, 'day').toISOString();
  }
  return now.toISOString();
};

export default function CreateSessionStep2FieldsListHeaderTopList() {
  const dateFilter = useCreateSessionFiltersFieldsStore(state => state.filters.date?.date);
  const setSessionFilters = useCreateSessionFiltersFieldsStore(state => state.setFilters);
  const handleSelectDay = (day: Dayjs) => {
    setSessionFilters({ date: { date: day.toISOString(), source: 'day-carousel' } });
  };

  return (
    <DaysCarousel
      startDay={dayjs(getStartDay())}
      className="pb-5 pt-3"
      onSelect={handleSelectDay}
      initialDate={dayjs(dateFilter)}
    />
  );
}
