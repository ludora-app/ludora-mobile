import { cn } from '@chillui/ui';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { BoxRow, Box, Icon, String } from '@ludo/ui';

import dayjs from '@/lib/dayjs';
import COLORS from '@/constants/colors.contstants';

import { useDurationLabel } from '../hooks/duration-label.hook';

export const DURATION_PICKER_DEFAULT_DURATIONS = [60, 90, 120];

const DURATION_STEP_MINUTES = 30;
const MIN_DURATION_MINUTES = 30;
const MAX_DURATION_MINUTES = 360;

type DurationPickerProps = {
  className?: string;
  /** Quick choices, in minutes. */
  durations?: number[];
  onChange: (duration: number) => void;
  startDate: Date;
  value: number;
};

/**
 * Quick duration tiles (`1 h 30` / `fin à 16:30`), and a − / + stepper by 30 min, from 30 min to 6 h.
 */
export const DurationPicker = (props: DurationPickerProps) => {
  const { className, durations = DURATION_PICKER_DEFAULT_DURATIONS, onChange, startDate, value } = props;
  const { t } = useTranslate();
  const getDurationLabel = useDurationLabel();

  const getEndLabel = (duration: number) =>
    t('duration-picker.end_at', { time: dayjs(startDate).add(duration, 'minute').format('HH:mm') });

  const canDecrease = value > MIN_DURATION_MINUTES;
  const canIncrease = value < MAX_DURATION_MINUTES;

  return (
    <Box className={cn('gap-2.5', className)}>
      <BoxRow className="gap-2.5">
        {durations.map(duration => {
          const isSelected = duration === value;
          return (
            <Pressable
              key={duration}
              onPress={() => onChange(duration)}
              className={cn(
                'min-h-18 flex-1 items-center justify-center gap-0.5 rounded-card border-2 border-input bg-white px-0.5 py-3',
                { 'border-primary bg-primarySoft': isSelected },
              )}
            >
              <String variant="body-3" font="secondaryExtraBold" numberOfLines={1}>
                {getDurationLabel(duration)}
              </String>
              <String variant="body-xs" font="primarySemiBold" colorVariant="muted">
                {getEndLabel(duration)}
              </String>
            </Pressable>
          );
        })}
      </BoxRow>
      <BoxRow className="items-center justify-between rounded-card bg-background px-3.5 py-2.5">
        <Pressable
          accessibilityLabel={t('duration-picker.decrease')}
          disabled={!canDecrease}
          onPress={() => onChange(value - DURATION_STEP_MINUTES)}
          className={cn('size-12 items-center justify-center rounded-full border-2 border-input bg-white', {
            'opacity-40': !canDecrease,
          })}
        >
          <Icon name="chill-ui-minus-regular" color={COLORS.dark} size="sm" />
        </Pressable>
        <Box className="items-center">
          <String variant="title-2" font="secondaryExtraBold">
            {getDurationLabel(value)}
          </String>
          <String variant="body-xs" font="primarySemiBold" colorVariant="muted">
            {getEndLabel(value)}
          </String>
        </Box>
        <Pressable
          accessibilityLabel={t('duration-picker.increase')}
          disabled={!canIncrease}
          onPress={() => onChange(value + DURATION_STEP_MINUTES)}
          className={cn('size-12 items-center justify-center rounded-full border-2 border-input bg-white', {
            'opacity-40': !canIncrease,
          })}
        >
          <Icon name="chill-ui-add-regular" color={COLORS.dark} size="sm" />
        </Pressable>
      </BoxRow>
    </Box>
  );
};
