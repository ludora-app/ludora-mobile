import { Icon } from '@ludo/ui';
import { cn } from '@chillui/ui';
import { Pressable } from 'react-native';

import COLORS from '@/constants/colors.contstants';

import { ON_BOARDING_MOMENTS } from '../../../constants/on-boarding.constants';
import { getAvailabilities } from '../../../utils/on-boarding-availabilities.utils';
import { useOnBoardingAvailabilitiesToggle } from '../../../hooks/on-boarding-availabilities-toggle.hook';

type OnBoardingAvailabilitiesGridCellProps = {
  dayOfWeek: number;
  moment: (typeof ON_BOARDING_MOMENTS)[number];
};

export const OnBoardingAvailabilitiesGridCell = (props: OnBoardingAvailabilitiesGridCellProps) => {
  const { dayOfWeek, moment } = props;
  const { isSelected, toggle } = useOnBoardingAvailabilitiesToggle(
    getAvailabilities({ daysOfWeek: [dayOfWeek], timePeriods: [moment.timePeriod] }),
  );

  return (
    <Pressable
      onPress={toggle}
      className={cn('h-12 flex-1 items-center justify-center rounded-control border-2 border-input bg-background', {
        'border-primary bg-primary': isSelected,
      })}
    >
      <Icon name={moment.icon} size="md" color={isSelected ? COLORS.white : COLORS.placeholder} />
    </Pressable>
  );
};
