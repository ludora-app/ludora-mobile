import dayjs from 'dayjs';
import { useState, useCallback, useMemo } from 'react';
import { Box, BoxRow, Button, Icon, String } from '@ludo/ui';
import {
  Calendar as FlashCalendar,
  useCalendar,
  toDateId,
  fromDateId,
  CalendarOnDayPress,
  CalendarActiveDateRange,
} from '@marceloterreiro/flash-calendar';

import COLORS from '@/constants/COLORS';

interface CalendarProps {
  onDayChange?: (date: Date) => void;
  onMonthChange?: (date: string) => void;
}

export default function Calendar(props: CalendarProps) {
  const { onDayChange, onMonthChange } = props;
  const todayId = useMemo(() => toDateId(new Date()), []);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonthId, setCurrentMonthId] = useState(todayId);

  const calendarActiveDateRanges = useMemo<CalendarActiveDateRange[]>(
    () => [
      {
        endId: toDateId(selectedDate),
        startId: toDateId(selectedDate),
      },
    ],
    [selectedDate],
  );

  const isPrevDisabled = useMemo(
    () => dayjs(currentMonthId).isSame(dayjs(todayId), 'month'),
    [currentMonthId, todayId],
  );

  const isNextDisabled = useMemo(() => {
    const maxDate = dayjs(todayId).add(2, 'year');
    return dayjs(currentMonthId).isAfter(maxDate, 'month') || dayjs(currentMonthId).isSame(maxDate, 'month');
  }, [currentMonthId, todayId]);

  const { calendarRowMonth, weekDaysList, weeksList } = useCalendar({
    calendarActiveDateRanges,
    calendarMinDateId: todayId,
    calendarMonthId: currentMonthId,
  });

  const handlePrevMonth = useCallback(() => {
    if (isPrevDisabled) return;
    const prevMonth = dayjs(currentMonthId).subtract(1, 'month').toDate();
    setCurrentMonthId(toDateId(prevMonth));
    onMonthChange?.(toDateId(prevMonth));
  }, [currentMonthId, isPrevDisabled, onMonthChange]);

  const handleNextMonth = useCallback(() => {
    if (isNextDisabled) return;
    const nextMonth = dayjs(currentMonthId).add(1, 'month').toDate();
    setCurrentMonthId(toDateId(nextMonth));
    onMonthChange?.(toDateId(nextMonth));
  }, [currentMonthId, isNextDisabled, onMonthChange]);

  const handleDayPress = useCallback<CalendarOnDayPress>(
    dateId => {
      setSelectedDate(fromDateId(dateId));
      onDayChange?.(fromDateId(dateId));
    },
    [onDayChange],
  );

  return (
    <Box>
      <Box>
        <FlashCalendar.VStack spacing={16}>
          {/* HEADER : Navigation avec gestion de l'état désactivé */}
          <FlashCalendar.HStack alignItems="center" justifyContent="space-between">
            <Icon
              name="arrow-left-regular"
              onPress={isPrevDisabled ? undefined : handlePrevMonth}
              color={isPrevDisabled ? '#D1D5DB' : '#000'}
              pressEffectSize="sm"
              style={{ opacity: isPrevDisabled ? 0.3 : 1 }}
            />
            <String font="primaryBold" className="capitalize">
              {calendarRowMonth}
            </String>
            <Icon
              name="arrow-right-regular"
              onPress={isNextDisabled ? undefined : handleNextMonth}
              color={isNextDisabled ? '#D1D5DB' : '#000'}
              pressEffectSize="sm"
              style={{ opacity: isNextDisabled ? 0.3 : 1 }}
            />
          </FlashCalendar.HStack>

          {/* JOURS DE LA SEMAINE (L, M, M...) */}
          <FlashCalendar.Row.Week>
            {weekDaysList.map((weekDay, i) => (
              <FlashCalendar.Item.WeekName key={i} height={25}>
                <String variant="body-xs" colorVariant="muted">
                  {weekDay}
                </String>
              </FlashCalendar.Item.WeekName>
            ))}
          </FlashCalendar.Row.Week>

          {/* GRILLE DU CALENDRIER */}
          {weeksList.map((week, i) => (
            <FlashCalendar.Row.Week key={i}>
              {week.map(day => (
                <FlashCalendar.Item.Day.Container
                  key={day.id}
                  dayHeight={30}
                  daySpacing={1}
                  isStartOfWeek={day.isStartOfWeek}
                >
                  <FlashCalendar.Item.Day
                    metadata={day}
                    height={45}
                    onPress={day.state === 'disabled' ? undefined : handleDayPress}
                    theme={{
                      // État par défaut (jours cliquables)
                      idle: ({ isDifferentMonth }) => ({
                        content: isDifferentMonth ? { color: '#D1D5DB' } : { color: '#000000' },
                      }),
                      // État désactivé (dates passées via calendarMinDateId)
                      disabled: () => ({
                        container: { opacity: 0.5 },
                        content: { color: '#D1D5DB' },
                      }),
                      // État sélectionné (active)
                      active: () => ({
                        container: {
                          backgroundColor: COLORS.primary,
                          borderBottomLeftRadius: 12,
                          borderBottomRightRadius: 12,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                        },
                        content: { color: '#ffffff', fontWeight: 'bold' },
                      }),
                    }}
                  >
                    {day.displayLabel}
                  </FlashCalendar.Item.Day>
                </FlashCalendar.Item.Day.Container>
              ))}
            </FlashCalendar.Row.Week>
          ))}
        </FlashCalendar.VStack>
      </Box>
      <BoxRow className="mt-7 gap-2">
        <Button title="Annuler" className="flex-[1]" variant="outlined" size="md" />
        <Button title="Valider" className="flex-[2]" size="md" />
      </BoxRow>
    </Box>
  );
}
