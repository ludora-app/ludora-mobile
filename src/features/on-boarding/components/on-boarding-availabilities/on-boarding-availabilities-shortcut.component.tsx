import { cn } from '@chillui/ui';
import { Pressable } from 'react-native';
import { BoxRow, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { ON_BOARDING_MOMENTS } from '../../constants/on-boarding.constants';
import { getAvailabilities } from '../../utils/on-boarding-availabilities.utils';
import { useOnBoardingAvailabilitiesToggle } from '../../hooks/on-boarding-availabilities-toggle.hook';
import { OnBoardingAvailabilitiesShortcutMoment } from './on-boarding-availabilities-shortcut-moment.component';

type OnBoardingAvailabilitiesShortcutProps = {
  daysOfWeek: number[];
  labelKey: string;
};

export const OnBoardingAvailabilitiesShortcut = (props: OnBoardingAvailabilitiesShortcutProps) => {
  const { daysOfWeek, labelKey } = props;
  const { t } = useTranslate();
  const { isSelected, toggle } = useOnBoardingAvailabilitiesToggle(getAvailabilities({ daysOfWeek }));

  return (
    <BoxRow className="items-center gap-2">
      <Pressable
        onPress={toggle}
        className={cn('h-11 w-29 justify-center rounded-full border-2 border-input bg-white px-4', {
          'border-primary bg-primary': isSelected,
        })}
      >
        <String font="primaryExtraBold" colorVariant={isSelected ? 'white' : 'dark'} className="text-center">
          {t(labelKey)}
        </String>
      </Pressable>
      {ON_BOARDING_MOMENTS.map(moment => (
        <OnBoardingAvailabilitiesShortcutMoment key={moment.timePeriod} daysOfWeek={daysOfWeek} moment={moment} />
      ))}
    </BoxRow>
  );
};
