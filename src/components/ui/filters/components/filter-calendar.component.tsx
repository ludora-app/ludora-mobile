import { Wrapper } from '@ludo/ui';
import { useRouter } from 'expo-router';

import { Calendar } from '../../calendar';
import { useFiltersStore } from '../store/filters.store';
import { CalendarProps } from '../../calendar/components/calendar.component';

type FilterCalendarProps = CalendarProps;

export default function FilterCalendar(props: FilterCalendarProps) {
  const { date } = useFiltersStore(state => state.filters);
  const setFilters = useFiltersStore(state => state.setFilters);
  const router = useRouter();

  const handleValidate = (selectedDate: Date) => {
    setFilters({ date: selectedDate });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Wrapper className="pt-3">
      <Calendar {...props} onValidate={handleValidate} onCancel={handleCancel} initialDate={date} />
    </Wrapper>
  );
}
