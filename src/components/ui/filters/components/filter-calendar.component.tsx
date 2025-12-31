import { useState } from 'react';
import { Wrapper } from '@ludo/ui';

import { Calendar } from '../../calendar';

export default function FilterCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<string>();

  console.log('selectedDate', selectedDate);
  console.log('selectedMonth', selectedMonth);

  return (
    <Wrapper className="pt-3" key={`${selectedDate.getMonth()}-${selectedDate.getFullYear()}`}>
      <Calendar onDayChange={setSelectedDate} onMonthChange={setSelectedMonth} />
    </Wrapper>
  );
}
