import React, { useState, useCallback } from 'react';
import { Box, Button, Checkbox, String } from '@chillui/ui';

export default function SessionFilterAccordionSchedules() {
  const [schedules, setSchedules] = useState([
    { checked: false, key: 'morning', label: 'Matin' },
    { checked: false, key: 'afternoon', label: 'Après-midi' },
    { checked: false, key: 'evening', label: 'Soir' },
  ]);

  const [timeSlotsBySchedule, setTimeSlotsBySchedule] = useState([
    [
      // Matin
      { checked: false, label: '8h-9h' },
      { checked: false, label: '9h-10h' },
      { checked: false, label: '10h-11h' },
      { checked: false, label: '11h-12h' },
      { checked: false, label: '12h-13h' },
    ],
    [
      // Après-midi
      { checked: false, label: '13h-14h' },
      { checked: false, label: '14h-15h' },
      { checked: false, label: '15h-16h' },
      { checked: false, label: '16h-17h' },
      { checked: false, label: '17h-18h' },
    ],
    [
      // Soir
      { checked: false, label: '18h-19h' },
      { checked: false, label: '19h-20h' },
      { checked: false, label: '20h-21h' },
      { checked: false, label: '21h-22h' },
      { checked: false, label: '22h-23h' },
      { checked: false, label: '23h-0h' },
    ],
  ]);

  const toggleSchedule = useCallback((scheduleIndex: number) => {
    setSchedules(prev =>
      prev.map((item, index) => ({
        ...item,
        checked: index === scheduleIndex,
      })),
    );
  }, []);

  const toggleTimeSlot = useCallback((scheduleIndex: number, slotIndex: number) => {
    setTimeSlotsBySchedule(prev =>
      prev.map((slots, i) =>
        i === scheduleIndex
          ? slots.map((slot, j) => ({
              ...slot,
              checked: j === slotIndex,
            }))
          : slots,
      ),
    );
  }, []);

  return (
    <Box className="gap-3">
      {schedules.map((schedule, scheduleIndex) => (
        <Box key={schedule.key}>
          <Box className="mb-3 flex flex-row items-center gap-2">
            <Checkbox
              type="rounded"
              showIcon={false}
              checked={schedule.checked}
              onChange={() => toggleSchedule(scheduleIndex)}
            />
            <String>{schedule.label}</String>
          </Box>

          {schedule.checked && (
            <Box className="flex flex-row flex-wrap items-center justify-center gap-3">
              {timeSlotsBySchedule[scheduleIndex].map((slot, slotIndex) => (
                <Button
                  key={slot.label}
                  onPress={() => toggleTimeSlot(scheduleIndex, slotIndex)}
                  variant={slot.checked ? 'primary' : 'lightBorder'}
                  title={slot.label}
                  btnClassName="flex-none w-[45%]"
                />
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
