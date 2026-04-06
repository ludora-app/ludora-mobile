import { list } from 'radash';
import { useRouter } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import React, { useState, useCallback, useEffect, useMemo } from 'react';

import dayjs from '@/lib/dayjs';
import ROUTES from '@/constants/routes.constants';
import { FieldResponseDto } from '@/api/generated/model';
import { RootStackParamList } from '@/types/routes-params.types';
import { TimeSlot } from '@/features/create-session/types/create-session-step-2.types';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';

import CreateSessionStep2FieldCardPublicAvailabilitiesItem from './create-session-step-2-field-card-public-availabilities-item/create-session-step-2-field-card-public-availabilities-item.component';
import CreateSessionStep2FieldCardPublicAvailabilitiesItemSkeleton from './create-session-step-2-field-card-public-availabilities-item/create-session-step-2-field-card-public-availabilities-item-skeleton.component';

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

    const minStart = dateToUse.hour(7).minute(0).second(0).millisecond(0);

    if (isToday && now.isAfter(minStart)) {
      const roundedMinutes = Math.ceil(now.minute() / 30) * 30;
      current = now.hour(now.hour()).minute(roundedMinutes).second(0).millisecond(0);
      if (!current.isAfter(now)) {
        current = current.add(30, 'minute');
      }
    } else {
      current = minStart;
    }
  }

  const newSlots: TimeSlot[] = [];
  const maxHour = current.hour(22).minute(0).second(0).millisecond(0);

  for (let i = 0; i < count; i += 1) {
    if (current.isAfter(maxHour)) break;

    const dateObj = current.toDate();
    newSlots.push({
      id: dateObj.toISOString(),
      time: dateObj,
    });
    current = current.add(30, 'minute');
  }
  return newSlots;
};
type SkeletonItem = { type: 'skeleton'; uid: string };
type ListItem = TimeSlot | SkeletonItem;

const isSkeletonListItem = (item: ListItem): item is SkeletonItem => 'type' in item && item.type === 'skeleton';

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
  const { availabilities, uid: fieldUid } = field || {};
  const sport = useCreateSessionStore(state => state.session?.sport);

  const [visibleSlots, setVisibleSlots] = useState<TimeSlot[]>([]);
  const filterDate = useCreateSessionFiltersFieldsStore(state => state.filters.date);
  const { endDate, selectedFieldUid, selectedSlotUid } = useCreateSessionStore(
    useShallow(state => ({
      endDate: state.session?.endDate,
      selectedFieldUid: state.session?.fieldUid,
      selectedSlotUid: state.session?.additionalData?.publicFieldSlotUid,
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
    (timeSlot: TimeSlot, isSelected: boolean) => {
      if (!sport) return;
      const params: RootStackParamList[typeof ROUTES.CREATE_SESSION.STEP_2_DURATION_FORM_SHEET] = {
        fieldUid,
        slotUid: timeSlot?.id,
        sport,
        startDate: timeSlot?.time?.toISOString(),
        ...(isSelected && { endDate }),
      };

      router.navigate({
        params,
        pathname: ROUTES.CREATE_SESSION.STEP_2_DURATION_FORM_SHEET,
      });
    },
    [router, fieldUid, sport, endDate],
  );

  const dataToRender = useMemo(() => (visibleSlots.length > 0 ? visibleSlots : SKELETON_DATA), [visibleSlots]);

  const keyExtractor = useCallback((item: ListItem) => {
    if (isSkeletonListItem(item)) {
      return item.uid;
    }
    return item.id;
  }, []);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<ListItem>) => {
      const { item } = info;
      if (isSkeletonListItem(item)) {
        return <CreateSessionStep2FieldCardPublicAvailabilitiesItemSkeleton />;
      }
      const timeSlot = item;
      const isSelected = timeSlot.id === selectedSlotUid && fieldUid === selectedFieldUid && !!endDate;
      return (
        <CreateSessionStep2FieldCardPublicAvailabilitiesItem
          time={timeSlot}
          availabilities={availabilities ?? []}
          onSelect={() => handleSelect(timeSlot, isSelected)}
          isSelected={isSelected}
        />
      );
    },
    [endDate, availabilities, fieldUid, handleSelect, selectedFieldUid, selectedSlotUid],
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
