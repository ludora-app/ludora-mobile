import { memo } from 'react';
import { useRouter } from 'expo-router';

import ROUTES from '@/constants/routes.constants';
import { FieldResponseDto } from '@/api/generated/model';
import { TimeSlotChips } from '@/components/ui/time-slot-chips';
import { FieldSlotsCard } from '@/components/ui/field-slots-card';

import { getSessionDayStartTimes } from '../utils/prepared-session.utils';
import { useOnBoardingSessionsStore } from '../../stores/on-boarding-sessions.store';

type OnBoardingSessionsFieldsItemProps = {
  item: FieldResponseDto;
};

function OnBoardingSessionsFieldsItem({ item }: OnBoardingSessionsFieldsItemProps) {
  const router = useRouter();
  const preparedSession = useOnBoardingSessionsStore(state => state.preparedSession);
  const setPendingSlot = useOnBoardingSessionsStore(state => state.setPendingSlot);
  const isSelectedField = useOnBoardingSessionsStore(state => state.selectedField?.uid === item.uid);

  if (!preparedSession) return null;

  const handleSelect = (startDate: Date) => {
    setPendingSlot({ field: item, startDate });
    router.navigate(ROUTES.ON_BOARDING.DURATION_FORM_SHEET);
  };

  return (
    <FieldSlotsCard field={item} sport={preparedSession.sport} className="mb-3.5">
      <TimeSlotChips
        slots={getSessionDayStartTimes(preparedSession.startDate)}
        selectedSlot={isSelectedField ? preparedSession.startDate : null}
        onSelect={handleSelect}
      />
    </FieldSlotsCard>
  );
}

export default memo(OnBoardingSessionsFieldsItem);
