import { FlatList } from 'react-native';

import { FieldAvailabilityDto, FieldResponseDto } from '@/api/generated/model';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

import FieldCardPrivateAvailabilitiesItem from './create-session-step-2-field-card-private-availabilities-item.component';

type CreateSessionStep2FieldCardPrivateAvailabilitiesListProps = {
  field: FieldResponseDto;
  onSelect?: (availability: FieldAvailabilityDto) => void;
};

export default function CreateSessionStep2FieldCardPrivateAvailabilitiesList(
  props: CreateSessionStep2FieldCardPrivateAvailabilitiesListProps,
) {
  const { field, onSelect } = props;

  const slotUid = useCreateSessionStore(state => state.session.slotUid);
  const setCreateSession = useCreateSessionStore(state => state.setSession);

  const handleSelectAvailability = (availability: FieldAvailabilityDto) => {
    onSelect?.(availability);
    setCreateSession({
      additionalData: {
        fieldType: 'partner',
        price: availability.price,
        pricePerPlayer: availability.pricePerPlayer,
        sport: field.sport,
      },
      endDate: availability.endTime,
      fieldUid: field.uid,
      slotUid: availability.uid,
      startDate: availability.startTime,
    });
  };

  return (
    <FlatList
      keyExtractor={item => item.uid.toString()}
      data={field.availabilities}
      horizontal
      initialNumToRender={10}
      removeClippedSubviews
      windowSize={3}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2"
      renderItem={({ item }) => (
        <FieldCardPrivateAvailabilitiesItem
          availability={item}
          onSelect={handleSelectAvailability}
          isSelected={slotUid === item.uid}
        />
      )}
    />
  );
}
