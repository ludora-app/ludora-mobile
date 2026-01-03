import { Wrapper } from '@ludo/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Calendar } from '@/components/ui/calendar';

import { FiltersCalendarScreenParams } from '../types/filters-calendar.types';

const defaultInitialDate = new Date();

export default function FiltersCalendarScreen() {
  const router = useRouter();
  const { GoBackPath, initialDate } = useLocalSearchParams<FiltersCalendarScreenParams>();

  const onCancel = () => {
    router.dismissTo({ pathname: GoBackPath });
  };

  const onValidate = (date: Date) => {
    router.dismissTo({ params: { date: date.toISOString() }, pathname: GoBackPath });
  };

  const calendarInitialDate = initialDate ? new Date(initialDate) : defaultInitialDate;
  return (
    <Wrapper className="pt-3">
      <Calendar initialDate={calendarInitialDate} onCancel={onCancel} onValidate={onValidate} />
    </Wrapper>
  );
}
