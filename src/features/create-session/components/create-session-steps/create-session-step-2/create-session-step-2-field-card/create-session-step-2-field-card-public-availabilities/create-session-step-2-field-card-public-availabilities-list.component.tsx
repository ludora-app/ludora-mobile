import dayjs from 'dayjs';
import { list } from 'radash';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';
import React, { useState, useCallback, useEffect, useMemo } from 'react';

import ROUTES from '@/constants/ROUTES';
import { FieldResponseDto } from '@/api/generated/model';
import { TimeSlot } from '@/features/create-session/types/create-session-step-2.types';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';

import CreateSessionStep2FieldCardPublicAvailabilitiesItem from './create-session-step-2-field-card-public-availabilities-item.component';
import CreateSessionStep2FieldCardPublicAvailabilitiesItemSkeleton from './create-session-step-2-field-card-public-availabilities-item-skeleton.component';

type CreateSessionStep2FieldCardPublicAvailabilitiesListProps = {
  field: FieldResponseDto;
};

const getNextSlots = (startDate: dayjs.Dayjs | null, count: number, selectedDate?: string): TimeSlot[] => {
  let current: dayjs.Dayjs;

  if (startDate) {
    current = startDate;
  } else {
    const now = dayjs();
    const dateToUse = selectedDate ? dayjs(selectedDate) : now;
    const isToday = dateToUse.isSame(now, 'day');

    if (isToday) {
      const currentMinutes = now.minute();
      const roundedMinutes = Math.ceil(currentMinutes / 30) * 30;
      current = now.hour(now.hour()).minute(roundedMinutes).second(0).millisecond(0);
      if (current.isBefore(now) || current.isSame(now)) {
        current = current.add(30, 'minute');
      }
    } else {
      current = dateToUse.hour(7).minute(0).second(0).millisecond(0);
    }
  }

  const newSlots: TimeSlot[] = [];
  const endOfDay = startDate ? startDate.endOf('day') : dayjs(selectedDate).endOf('day');

  for (let i = 0; i < count; i += 1) {
    const dateObj = current.toDate();
    newSlots.push({
      id: dateObj.toISOString(),
      time: dateObj,
    });
    current = current.add(30, 'minute');

    if (current.isAfter(endOfDay)) break;
  }
  return newSlots;
};
type SkeletonItem = { type: 'skeleton'; uid: string };
type ListItem = TimeSlot | SkeletonItem;

const SKELETON_COUNT = 3;
const SKELETON_DATA: SkeletonItem[] = list(SKELETON_COUNT).map((_, i) => ({
  type: 'skeleton',
  uid: `skel-${i}`,
}));

export default function CreateSessionStep2FieldCardPublicAvailabilitiesList(
  props: CreateSessionStep2FieldCardPublicAvailabilitiesListProps,
) {
  const router = useRouter();
  const { field } = props;
  const [visibleSlots, setVisibleSlots] = useState<TimeSlot[]>([]);
  const filterDate = useCreateSessionFiltersFieldsStore(state => state.filters.date);
  const { endDate, selectedFieldUid, selectedSlotUid } = useCreateSessionStore(
    useShallow(state => ({
      endDate: state.session.endDate,
      selectedFieldUid: state.session.fieldUid,
      selectedSlotUid: state.session.additionalData?.publicFieldSlotUid,
    })),
  );

  useEffect(() => {
    const selectedDate = filterDate?.date;
    setVisibleSlots(getNextSlots(null, 10, selectedDate));
  }, [filterDate]);

  const loadMoreSlots = useCallback(() => {
    if (visibleSlots.length === 0) return;

    const lastSlot = dayjs(visibleSlots[visibleSlots.length - 1].time);
    const nextStart = lastSlot.add(30, 'minute');

    if (nextStart.isBefore(nextStart.endOf('day'))) {
      const nextBatch = getNextSlots(nextStart, 10);
      setVisibleSlots(prev => [...prev, ...nextBatch]);
    }
  }, [visibleSlots]);

  const handleSelect = useCallback(
    (timeSlot: TimeSlot) => {
      router.push({
        params: {
          fieldUid: field.uid,
          slotUid: timeSlot.id,
          sport: field.sport,
          startDate: timeSlot.time.toISOString(),
        },
        pathname: ROUTES.CREATE_SESSION.FIELD_CARD_PUBLIC_AVAILIBILITIES_FORM_SHEET,
      });
    },
    [router, field],
  );

  const dataToRender = useMemo(() => (visibleSlots.length > 0 ? visibleSlots : SKELETON_DATA), [visibleSlots]);

  const keyExtractor = useCallback((item: ListItem) => {
    if ('type' in item && item.type === 'skeleton') {
      return (item as SkeletonItem).uid;
    }
    return (item as TimeSlot).id;
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      if ('type' in item && item.type === 'skeleton') {
        return <CreateSessionStep2FieldCardPublicAvailabilitiesItemSkeleton />;
      }
      return (
        <CreateSessionStep2FieldCardPublicAvailabilitiesItem
          time={item}
          availabilities={field.availabilities}
          onSelect={() => handleSelect(item)}
          isSelected={item.id === selectedSlotUid && field.uid === selectedFieldUid && !!endDate}
        />
      );
    },
    [endDate, field.availabilities, field.uid, handleSelect, selectedFieldUid, selectedSlotUid],
  );

  return (
    <FlatList
      data={dataToRender}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      onEndReached={loadMoreSlots}
      onEndReachedThreshold={0.5}
      removeClippedSubviews
      initialNumToRender={10}
      renderItem={renderItem}
      contentContainerClassName="gap-2"
    />
  );
}
