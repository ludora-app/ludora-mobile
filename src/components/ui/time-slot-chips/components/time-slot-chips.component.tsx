import { cn } from '@chillui/ui';
import { String } from '@ludo/ui';
import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, ScrollViewInstance } from 'react-native';

import dayjs from '@/lib/dayjs';

const CHIP_WIDTH = 76;
const CHIP_GAP = 8;

type TimeSlotChipsProps = {
  className?: string;
  onSelect: (slot: Date) => void;
  /** Highlighted start time, scrolled into view. */
  selectedSlot?: Date | null;
  slots: Date[];
};

/** Horizontal row of start times (`15:00`), the selected one highlighted. */
export const TimeSlotChips = (props: TimeSlotChipsProps) => {
  const { className, onSelect, selectedSlot, slots } = props;
  const scrollViewRef = useRef<ScrollViewInstance>(null);

  const selectedIndex = selectedSlot ? slots.findIndex(slot => dayjs(slot).isSame(selectedSlot, 'minute')) : -1;

  useEffect(() => {
    if (selectedIndex <= 0) return;
    scrollViewRef.current?.scrollTo({ animated: false, x: selectedIndex * (CHIP_WIDTH + CHIP_GAP), y: 0 });
  }, [selectedIndex]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      className={cn('-mx-3.5', className)}
      contentContainerClassName="gap-2 px-3.5 py-1"
    >
      {slots.map((slot, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Pressable
            key={slot.toISOString()}
            onPress={() => onSelect(slot)}
            className={cn('h-13 w-19 items-center justify-center rounded-control border-2 border-darkSoft bg-white', {
              'border-primary bg-primarySoft': isSelected,
            })}
          >
            <String variant="body-2" font="secondaryBold">
              {dayjs(slot).format('HH:mm')}
            </String>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};
