import dayjs from 'dayjs';
import { memo } from 'react';
import { String, BoxCenter } from '@ludo/ui';
import isBetween from 'dayjs/plugin/isBetween';
import { cn, ScalePressable } from '@chillui/ui';

import { FieldAvailabilityDto } from '@/api/generated/model';

import { TimeSlot } from './create-session-step-2-field-card-public-availabilities-list.component';

dayjs.extend(isBetween);

type CreateSessionStep2FieldCardPublicAvailabilitiesItemProps = {
  time: TimeSlot;
  availabilities: FieldAvailabilityDto[];
  onSelect?: (startTime: TimeSlot) => void;
  isSelected?: boolean;
};

function CreateSessionStep2FieldCardPublicAvailabilitiesItem(
  props: CreateSessionStep2FieldCardPublicAvailabilitiesItemProps,
) {
  const { availabilities, isSelected, onSelect, time } = props;

  const isOccupiedByAnotherTeam = availabilities?.some(avail => {
    const start = dayjs(avail.startTime);
    const end = dayjs(avail.endTime);
    const currentSlot = dayjs(time.time);

    return currentSlot.isBetween(start, end, null, '[)');
  });

  const formattedTime = dayjs(time.time).format('HH[H]mm');

  const handlePress = () => {
    onSelect?.(time);
  };

  return (
    <ScalePressable onPress={handlePress}>
      <BoxCenter
        className={cn('w-32 rounded-lg border border-black/30 py-4', {
          'border-2 border-primary bg-primary/10': isSelected,
          'border-orange-500 bg-orange-50': isOccupiedByAnotherTeam && !isSelected,
        })}
      >
        <String
          font="primaryBold"
          className={cn('text-black', { 'text-orange-600': isOccupiedByAnotherTeam && !isSelected })}
        >
          {formattedTime}
        </String>

        {isOccupiedByAnotherTeam && (
          <String className={cn('mt-1 px-2 text-center text-[10px] text-orange-500')}>Équipe Ludora présente</String>
        )}
      </BoxCenter>
    </ScalePressable>
  );
}

export default memo(
  CreateSessionStep2FieldCardPublicAvailabilitiesItem,
  (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected,
);
