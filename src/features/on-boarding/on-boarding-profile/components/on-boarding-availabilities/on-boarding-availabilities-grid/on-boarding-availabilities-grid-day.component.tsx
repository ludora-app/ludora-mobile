import { cn } from '@chillui/ui';
import { String } from '@ludo/ui';
import { Pressable } from 'react-native';

import { getAvailabilities, getDayLabel } from '../../../utils/on-boarding-availabilities.utils';
import { useOnBoardingAvailabilitiesToggle } from '../../../hooks/on-boarding-availabilities-toggle.hook';

type OnBoardingAvailabilitiesGridDayProps = {
  dayOfWeek: number;
};

// Column header: selects every moment of the day
export const OnBoardingAvailabilitiesGridDay = (props: OnBoardingAvailabilitiesGridDayProps) => {
  const { dayOfWeek } = props;
  const { isSelected, toggle } = useOnBoardingAvailabilitiesToggle(getAvailabilities({ daysOfWeek: [dayOfWeek] }));

  return (
    <Pressable
      onPress={toggle}
      className={cn('h-9 flex-1 items-center justify-center rounded-control', { 'bg-primarySoft': isSelected })}
    >
      <String variant="body-sm" font="primaryExtraBold">
        {getDayLabel({ dayOfWeek, format: 'letter' })}
      </String>
    </Pressable>
  );
};
