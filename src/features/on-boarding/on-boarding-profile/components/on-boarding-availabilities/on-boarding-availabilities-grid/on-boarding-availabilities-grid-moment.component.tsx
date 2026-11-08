import { Icon } from '@ludo/ui';
import { cn } from '@chillui/ui';
import { Pressable } from 'react-native';

import COLORS from '@/constants/colors.contstants';

import { ON_BOARDING_MOMENTS } from '../../../constants/on-boarding.constants';
import { getAvailabilities } from '../../../utils/on-boarding-availabilities.utils';
import { useOnBoardingAvailabilitiesToggle } from '../../../hooks/on-boarding-availabilities-toggle.hook';

type OnBoardingAvailabilitiesGridMomentProps = {
  moment: (typeof ON_BOARDING_MOMENTS)[number];
};

// Row header: selects the moment on every day
export const OnBoardingAvailabilitiesGridMoment = (props: OnBoardingAvailabilitiesGridMomentProps) => {
  const { moment } = props;
  const { isSelected, toggle } = useOnBoardingAvailabilitiesToggle(
    getAvailabilities({ timePeriods: [moment.timePeriod] }),
  );

  return (
    <Pressable
      onPress={toggle}
      className={cn('h-12 w-11 items-center justify-center rounded-control', { 'bg-primarySoft': isSelected })}
    >
      <Icon name={moment.icon} size="lg" color={COLORS.dark} />
    </Pressable>
  );
};
