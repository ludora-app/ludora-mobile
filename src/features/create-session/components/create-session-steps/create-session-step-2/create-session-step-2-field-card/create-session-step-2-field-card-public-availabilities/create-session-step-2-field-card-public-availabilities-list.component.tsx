import dayjs from 'dayjs';
import { FlatList } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';

import { FieldResponseDto } from '@/api/generated/model';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

import CreateSessionStep2FieldCardPublicAvailabilitiesItem from './create-session-step-2-field-card-public-availabilities-item.component';

export type TimeSlot = {
  id: string;
  time: Date;
};

type CreateSessionStep2FieldCardPublicAvailabilitiesListProps = {
  field: FieldResponseDto;
};

// Fonction utilitaire pour générer une tranche de créneaux
const getNextSlots = (startDate: dayjs.Dayjs, count: number): TimeSlot[] => {
  const newSlots: TimeSlot[] = [];
  let current = startDate;

  for (let i = 0; i < count; i++) {
    const dateObj = current.toDate();
    newSlots.push({
      id: dateObj.toISOString(),
      time: dateObj,
    });
    current = current.add(30, 'minute');

    // On s'arrête si on dépasse la fin de journée
    if (current.isAfter(startDate.endOf('day'))) break;
  }
  return newSlots;
};

export default function CreateSessionStep2FieldCardPublicAvailabilitiesList(
  props: CreateSessionStep2FieldCardPublicAvailabilitiesListProps,
) {
  const { field } = props;
  const day = useCreateSessionStore(state => state.session.day);
  const [visibleSlots, setVisibleSlots] = useState<TimeSlot[]>([]);

  const selectedSlotUid = useCreateSessionStore(state => state.session.slotUid);
  const selectedFieldUid = useCreateSessionStore(state => state.session.fieldUid);
  const setSession = useCreateSessionStore(state => state.setSession);

  // 1. Initialisation : Quand le jour change, on repart de 07h00 avec 10 items
  useEffect(() => {
    const startAt = dayjs(day).hour(7).minute(0).second(0).millisecond(0);
    setVisibleSlots(getNextSlots(startAt, 10));
  }, [day]);

  // 2. Charger la suite (onEndReached)
  const loadMoreSlots = useCallback(() => {
    console.log('loadMoreSlots');
    if (visibleSlots.length === 0) return;

    const lastSlot = dayjs(visibleSlots[visibleSlots.length - 1].time);
    const nextStart = lastSlot.add(30, 'minute');

    // On ne génère que si on n'a pas fini la journée
    if (nextStart.isBefore(dayjs(day).endOf('day'))) {
      const nextBatch = getNextSlots(nextStart, 10);
      setVisibleSlots(prev => [...prev, ...nextBatch]);
    }
  }, [visibleSlots, day]);

  const handleSelect = (slot: TimeSlot) => {
    setSession({
      fieldUid: field.uid,
      slotUid: slot.id,
      startDate: slot.time.toISOString(),
    });
  };

  return (
    <FlatList
      data={visibleSlots}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      onEndReached={loadMoreSlots}
      onEndReachedThreshold={0.5} // On charge quand il reste 50% des 10 items affichés
      removeClippedSubviews
      initialNumToRender={10}
      renderItem={({ item }) => (
        <CreateSessionStep2FieldCardPublicAvailabilitiesItem
          time={item}
          availabilities={field.availabilities}
          onSelect={() => handleSelect(item)}
          isSelected={item.id === selectedSlotUid && field.uid === selectedFieldUid}
        />
      )}
      contentContainerStyle={{ gap: 8 }} // Utilise style au lieu de className pour les tests de perf
    />
  );
}
