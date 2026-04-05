import { useTolgee } from '@tolgee/react';
import { useState, useCallback, useMemo, memo } from 'react';
import { Box, BoxRow, Button, Icon, String } from '@ludo/ui';
import {
  Calendar as FlashCalendar,
  useCalendar,
  toDateId,
  fromDateId,
  CalendarOnDayPress,
  CalendarActiveDateRange,
  CalendarTheme,
} from '@marceloterreiro/flash-calendar';

import dayjs from '@/lib/dayjs';
import COLORS from '@/constants/colors.contstants';
import { IS_ANDROID } from '@/constants/platform.constants';

const CALENDAR_CONFIG = {
  ACTIVE_TEXT_COLOR: '#ffffff',
  BORDER_RADIUS: 20,
  DAY_HEIGHT: 30,
  DAY_SPACING: 1,
  DEFAULT_COLOR: '#000000',
  DISABLED_COLOR: '#D1D5DB',
  DISABLED_OPACITY: 0.3,
  HEADER_SPACING: 16,
  MAX_YEARS_AHEAD: 2,
  TODAY_COLOR: '#000000',
  WEEK_NAME_HEIGHT: 25,
} as const;

// 🎨 Types
export interface CalendarProps {
  /** Callback appelé quand une date est validée */
  onDayChange?: (date: Date) => void;
  /** Callback appelé quand le mois change */
  onMonthChange?: (dateId: string) => void;
  /** Date initialement sélectionnée */
  initialDate?: Date;
  /** Date minimum sélectionnable (par défaut: aujourd'hui) */
  minDate?: Date;
  /** Date maximum sélectionnable (par défaut: aujourd'hui + 2 ans) */
  maxDate?: Date;
  /** Callback appelé lors de l'annulation */
  onCancel?: () => void;

  /** Callback appelé lors de la validation */
  onValidate?: (date: Date) => void;
  /** Masquer les boutons Annuler/Valider */
  hideActions?: boolean;
  /** Texte du bouton d'annulation */
  cancelButtonText?: string;
  /** Texte du bouton de validation */
  validateButtonText?: string;
}

function Calendar(props: CalendarProps) {
  const tolgee = useTolgee(['language']);
  const tolgeeLang = tolgee.getLanguage();

  const {
    cancelButtonText = 'Annuler',
    hideActions = false,
    initialDate = new Date(),
    maxDate,
    minDate = new Date(),
    onCancel,
    onDayChange,
    onMonthChange,
    onValidate,
    validateButtonText = 'Valider',
  } = props;

  const todayId = useMemo(() => toDateId(minDate), [minDate]);
  const maxDateId = useMemo(() => {
    if (maxDate) return toDateId(maxDate);
    return toDateId(dayjs(minDate).add(CALENDAR_CONFIG.MAX_YEARS_AHEAD, 'year').toDate());
  }, [maxDate, minDate]);

  const [confirmedDate, setConfirmedDate] = useState<Date>(initialDate);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date>(initialDate);
  const [currentMonthId, setCurrentMonthId] = useState(() => toDateId(initialDate));

  const calendarActiveDateRanges = useMemo<CalendarActiveDateRange[]>(
    () => [
      {
        endId: toDateId(tempSelectedDate),
        startId: toDateId(tempSelectedDate),
      },
    ],
    [tempSelectedDate],
  );

  const navigationBounds = useMemo(() => {
    const minMonth = dayjs(todayId).format('YYYY-MM');
    const maxMonth = dayjs(maxDateId).format('YYYY-MM');
    return { maxMonth, minMonth };
  }, [todayId, maxDateId]);

  const isPrevDisabled = useMemo(
    () => dayjs(currentMonthId).format('YYYY-MM') <= navigationBounds.minMonth,
    [currentMonthId, navigationBounds.minMonth],
  );

  const isNextDisabled = useMemo(
    () => dayjs(currentMonthId).format('YYYY-MM') >= navigationBounds.maxMonth,
    [currentMonthId, navigationBounds.maxMonth],
  );

  const { calendarRowMonth, weekDaysList, weeksList } = useCalendar({
    calendarActiveDateRanges,
    calendarFormatLocale: tolgeeLang,
    calendarMaxDateId: maxDateId,
    calendarMinDateId: todayId,
    calendarMonthId: currentMonthId,
  });

  const handlePrevMonth = useCallback(() => {
    if (isPrevDisabled) return;
    const prevMonth = dayjs(currentMonthId).subtract(1, 'month').toDate();
    const prevMonthId = toDateId(prevMonth);
    setCurrentMonthId(prevMonthId);
    onMonthChange?.(prevMonthId);
  }, [currentMonthId, isPrevDisabled, onMonthChange]);

  const handleNextMonth = useCallback(() => {
    if (isNextDisabled) return;
    const nextMonth = dayjs(currentMonthId).add(1, 'month').toDate();
    const nextMonthId = toDateId(nextMonth);
    setCurrentMonthId(nextMonthId);
    onMonthChange?.(nextMonthId);
  }, [currentMonthId, isNextDisabled, onMonthChange]);

  const handleDayPress = useCallback<CalendarOnDayPress>(
    dateId => {
      const selectedDate = fromDateId(dateId);
      setTempSelectedDate(selectedDate);
      onDayChange?.(selectedDate);
      if (hideActions) {
        setConfirmedDate(selectedDate);
      }
    },
    [hideActions, onDayChange],
  );

  const handleValidate = useCallback(() => {
    setConfirmedDate(tempSelectedDate);
    onValidate?.(tempSelectedDate);
  }, [onValidate, tempSelectedDate]);

  const handleCancel = useCallback(() => {
    setTempSelectedDate(confirmedDate);
    onCancel?.();
  }, [confirmedDate, onCancel]);

  const dayTheme: CalendarTheme['itemDay'] = useMemo(
    () => ({
      active: () => ({
        container: {
          backgroundColor: COLORS.primary,
          borderBottomLeftRadius: CALENDAR_CONFIG.BORDER_RADIUS,
          borderBottomRightRadius: CALENDAR_CONFIG.BORDER_RADIUS,
          borderTopLeftRadius: CALENDAR_CONFIG.BORDER_RADIUS,
          borderTopRightRadius: CALENDAR_CONFIG.BORDER_RADIUS,
        },
        content: {
          color: CALENDAR_CONFIG.ACTIVE_TEXT_COLOR,
          fontWeight: 'bold',
        },
      }),
      disabled: () => ({
        container: { opacity: CALENDAR_CONFIG.DISABLED_OPACITY },
        content: { color: CALENDAR_CONFIG.DISABLED_COLOR },
      }),
      idle: ({ isDifferentMonth, isPressed }) => ({
        container: {
          backgroundColor: isPressed ? COLORS.primary : 'transparent',
        },
        content: (() => {
          if (isPressed) {
            return { color: CALENDAR_CONFIG.ACTIVE_TEXT_COLOR };
          }
          if (isDifferentMonth) {
            return { color: CALENDAR_CONFIG.DISABLED_COLOR };
          }
          return { color: CALENDAR_CONFIG.DEFAULT_COLOR };
        })(),
      }),
      today: ({ isPressed }) => ({
        container: {
          backgroundColor: isPressed ? COLORS.primary : 'transparent',
          borderColor: COLORS.primary,
          borderWidth: 1,
        },
        content: {
          color: isPressed ? CALENDAR_CONFIG.ACTIVE_TEXT_COLOR : CALENDAR_CONFIG.TODAY_COLOR,
          fontWeight: 'bold',
          marginTop: IS_ANDROID ? -1 : undefined,
        },
      }),
    }),
    [],
  );

  return (
    <Box>
      <FlashCalendar.VStack spacing={CALENDAR_CONFIG.HEADER_SPACING}>
        <FlashCalendar.HStack alignItems="center" justifyContent="space-between">
          <Icon
            name="arrow-left-regular"
            onPress={isPrevDisabled ? undefined : handlePrevMonth}
            color={isPrevDisabled ? CALENDAR_CONFIG.DISABLED_COLOR : CALENDAR_CONFIG.DEFAULT_COLOR}
            pressEffectSize="sm"
            style={{ opacity: isPrevDisabled ? CALENDAR_CONFIG.DISABLED_OPACITY : 1 }}
          />
          <String font="primaryBold" className="capitalize">
            {calendarRowMonth}
          </String>
          <Icon
            name="arrow-right-regular"
            onPress={isNextDisabled ? undefined : handleNextMonth}
            color={isNextDisabled ? CALENDAR_CONFIG.DISABLED_COLOR : CALENDAR_CONFIG.DEFAULT_COLOR}
            pressEffectSize="sm"
            style={{ opacity: isNextDisabled ? CALENDAR_CONFIG.DISABLED_OPACITY : 1 }}
          />
        </FlashCalendar.HStack>

        <FlashCalendar.Row.Week>
          {weekDaysList.map((weekDay, i) => (
            <FlashCalendar.Item.WeekName key={i} height={CALENDAR_CONFIG.WEEK_NAME_HEIGHT}>
              <String variant="body-xs" colorVariant="muted">
                {weekDay}
              </String>
            </FlashCalendar.Item.WeekName>
          ))}
        </FlashCalendar.Row.Week>

        {weeksList.map((week, i) => (
          <FlashCalendar.Row.Week key={i}>
            {week.map(day => (
              <FlashCalendar.Item.Day.Container
                key={day.id}
                dayHeight={CALENDAR_CONFIG.DAY_HEIGHT}
                daySpacing={CALENDAR_CONFIG.DAY_SPACING}
                isStartOfWeek={day.isStartOfWeek}
              >
                <FlashCalendar.Item.Day
                  metadata={day}
                  height={CALENDAR_CONFIG.DAY_HEIGHT}
                  onPress={handleDayPress}
                  theme={dayTheme}
                >
                  {day.displayLabel}
                </FlashCalendar.Item.Day>
              </FlashCalendar.Item.Day.Container>
            ))}
          </FlashCalendar.Row.Week>
        ))}
      </FlashCalendar.VStack>

      {!hideActions && (
        <BoxRow className="mt-7 gap-2">
          <Button title={cancelButtonText} className="flex-[1]" variant="outlined" size="md" onPress={handleCancel} />
          <Button title={validateButtonText} className="flex-[2]" size="md" onPress={handleValidate} />
        </BoxRow>
      )}
    </Box>
  );
}

export default memo(Calendar);
