import { memo } from 'react';
import { String, Box } from '@ludo/ui';

import { FieldAvailabilityDto } from '@/api/generated/model';
import { formatToHour, getDuration } from '@/utils/time.utils';
import { cn, ScalePressable } from '@/components/chill-ui-library';

type CreateSessionStep2FieldCardPrivateAvailabilitiesItemProps = {
  availability: FieldAvailabilityDto;
  onSelect?: (availability: FieldAvailabilityDto) => void;
  isSelected?: boolean;
};

function CreateSessionStep2FieldCardPrivateAvailabilitiesItem(
  props: CreateSessionStep2FieldCardPrivateAvailabilitiesItemProps,
) {
  const { availability, isSelected, onSelect } = props;

  const handlePress = () => {
    onSelect?.(availability);
  };

  return (
    <ScalePressable onPress={handlePress}>
      <Box
        className={cn(
          'w-32 items-center justify-center rounded-lg border border-black/30 py-1',
          isSelected && 'border-2 border-primary bg-primary/10',
        )}
      >
        <String font="primaryBold">
          {formatToHour({ date: availability.startTime, showMinutesWhenMinutesZero: true })}
        </String>
        <String variant="body-sm">
          {getDuration({ endTime: availability.endTime, startTime: availability.startTime })} min
        </String>
        <String font="primaryBold" useFastText={false}>
          {availability.pricePerPlayer?.toString() || '0'}€{' '}
          <String variant="body-sm" useFastText={false}>
            /pers
          </String>{' '}
        </String>
      </Box>
    </ScalePressable>
  );
}

export default memo(
  CreateSessionStep2FieldCardPrivateAvailabilitiesItem,
  (prevProps, nextProps) =>
    prevProps.availability.uid === nextProps.availability.uid && prevProps.isSelected === nextProps.isSelected,
);
