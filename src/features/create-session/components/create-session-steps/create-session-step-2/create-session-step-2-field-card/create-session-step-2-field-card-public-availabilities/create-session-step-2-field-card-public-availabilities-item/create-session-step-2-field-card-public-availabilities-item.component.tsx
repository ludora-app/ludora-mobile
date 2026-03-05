
import { memo } from 'react';
import { String, BoxCenter } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { Box, cn, ScalePressable } from '@chillui/ui';

import dayjs from '@/lib/dayjs';
import { FieldAvailabilityDto } from '@/api/generated/model';
import { TimeSlot } from '@/features/create-session/types/create-session-step-2.types';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

type CreateSessionStep2FieldCardPublicAvailabilitiesItemProps = {
  time: TimeSlot;
  availabilities: FieldAvailabilityDto[];
  onSelect?: (startTime: TimeSlot) => void;
  isSelected?: boolean;
};

function CreateSessionStep2FieldCardPublicAvailabilitiesItem(
  props: CreateSessionStep2FieldCardPublicAvailabilitiesItemProps,
) {
  const { t } = useTranslate();
  const { availabilities, isSelected, onSelect, time } = props;
  const startDate = useCreateSessionStore(state => state.session.startDate);
  const endDate = useCreateSessionStore(state => state.session.endDate);

  const calculateDuration = () => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    return end.diff(start, 'minute');
  };

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
        className={cn('h-16 w-32 rounded-lg border border-black/30', {
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
        {isSelected && (
          <String variant="body-sm">
            {calculateDuration()} {t('common.minutes_abrv')}
          </String>
        )}
        {!isSelected && (
          <Box className="items-center justify-center p-[2px]">
            {isOccupiedByAnotherTeam && (
              <String className="text-center text-[10px] text-primary/80">
                {t('create_session.step_2.public_availabilities.team_present')}
              </String>
            )}
          </Box>
        )}
      </BoxCenter>
    </ScalePressable>
  );
}

export default memo(
  CreateSessionStep2FieldCardPublicAvailabilitiesItem,
  (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected && prevProps.onSelect === nextProps.onSelect,
);
