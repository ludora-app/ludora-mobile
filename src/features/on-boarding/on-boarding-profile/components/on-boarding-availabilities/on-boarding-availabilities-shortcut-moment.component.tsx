import { Icon } from '@ludo/ui';
import { cn } from '@chillui/ui';
import { Pressable } from 'react-native';

import COLORS from '@/constants/colors.contstants';

import { ON_BOARDING_MOMENTS } from '../../constants/on-boarding.constants';
import { getAvailabilities } from '../../utils/on-boarding-availabilities.utils';
import { useOnBoardingAvailabilitiesToggle } from '../../hooks/on-boarding-availabilities-toggle.hook';

type OnBoardingAvailabilitiesShortcutMomentProps = {
  daysOfWeek: number[];
  moment: (typeof ON_BOARDING_MOMENTS)[number];
};

export const OnBoardingAvailabilitiesShortcutMoment = (props: OnBoardingAvailabilitiesShortcutMomentProps) => {
  const { daysOfWeek, moment } = props;
  const { isSelected, toggle } = useOnBoardingAvailabilitiesToggle(
    getAvailabilities({ daysOfWeek, timePeriods: [moment.timePeriod] }),
  );

  return (
    <Pressable
      onPress={toggle}
      className={cn('h-11 w-15.5 items-center justify-center rounded-full border-2 border-input bg-white', {
        'border-primary bg-primary': isSelected,
      })}
    >
      <Icon name={moment.icon} size="md" color={isSelected ? COLORS.white : COLORS.dark} />
    </Pressable>
  );
};
