import { Wrapper } from '@ludo/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Calendar } from '@/components/ui/calendar';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import { FiltersCalendarReturnParams, FiltersCalendarScreenParams } from '../types/filters-calendar.types';

const defaultInitialDate = new Date();

export default function FiltersCalendarScreen() {
  const router = useRouter();
  const { goBackPath, initialDate } = useLocalSearchParams<FiltersCalendarScreenParams>();

  const onCancel = () => {
    router.dismissTo({ pathname: goBackPath });
  };

  const onValidate = (date: Date) => {
    const params: FiltersCalendarReturnParams = { date: date.toISOString() };
    router.dismissTo({ params, pathname: goBackPath });
  };

  const calendarInitialDate = initialDate ? new Date(initialDate) : defaultInitialDate;
  return (
    <>
      <FormSheetHeader />
      <Wrapper className="pt-3">
        <Calendar initialDate={calendarInitialDate} onCancel={onCancel} onValidate={onValidate} />
      </Wrapper>
    </>
  );
}
