import dayjs from 'dayjs';
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

import COLORS from '@/constants/COLORS';
import { IS_ANDROID } from '@/constants/PLATFORM';

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
  RANGE_COLOR: '#E0F2FE', // Couleur pour les jours dans la plage
  TODAY_COLOR: '#000000',
  WEEK_NAME_HEIGHT: 25,
} as const;

// 🎨 Types
export interface DateRange {
  endDate: Date | null;
  startDate: Date | null;
}

export interface CalendarDateRangeProps {
  /** Callback appelé quand une plage est validée */
  onDateRangeChange?: (range: DateRange) => void;
  /** Callback appelé quand le mois change */
  onMonthChange?: (dateId: string) => void;
  /** Plage initialement sélectionnée */
  initialDateRange?: DateRange;
  /** Date minimum sélectionnable (par défaut: aujourd'hui) */
  minDate?: Date;
  /** Date maximum sélectionnable (par défaut: aujourd'hui + 2 ans) */
  maxDate?: Date;
  /** Callback appelé lors de l'annulation */
  onCancel?: () => void;
  /** Callback appelé lors de la validation */
  onValidate?: (range: DateRange) => void;
  /** Masquer les boutons Annuler/Valider */
  hideActions?: boolean;
  /** Texte du bouton d'annulation */
  cancelButtonText?: string;
  /** Texte du bouton de validation */
  validateButtonText?: string;
  /** Nombre minimum de jours dans la plage */
  minRangeDays?: number;
  /** Nombre maximum de jours dans la plage */
  maxRangeDays?: number;
}

function CalendarDateRange(props: CalendarDateRangeProps) {
  const tolgee = useTolgee(['language']);
  const tolgeeLang = tolgee.getLanguage();

  const {
    cancelButtonText = 'Annuler',
    hideActions = false,
    initialDateRange = { endDate: null, startDate: null },
    maxDate,
    maxRangeDays,
    minDate = new Date(),
    minRangeDays,
    onCancel,
    onDateRangeChange,
    onMonthChange,
    onValidate,
    validateButtonText = 'Valider',
  } = props;

  // 📅 États
  const todayId = useMemo(() => toDateId(minDate), [minDate]);
  const maxDateId = useMemo(() => {
    if (maxDate) return toDateId(maxDate);
    return toDateId(dayjs(minDate).add(CALENDAR_CONFIG.MAX_YEARS_AHEAD, 'year').toDate());
  }, [maxDate, minDate]);

  const [confirmedRange, setConfirmedRange] = useState<DateRange>(initialDateRange);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(initialDateRange.startDate);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(initialDateRange.endDate);
  const [currentMonthId, setCurrentMonthId] = useState(() => toDateId(initialDateRange.startDate || minDate));

  // 🎯 Calcul des dates actives pour le style
  const calendarActiveDateRanges = useMemo<CalendarActiveDateRange[]>(() => {
    if (!tempStartDate) return [];

    if (!tempEndDate) {
      // Seulement la date de début sélectionnée
      return [
        {
          endId: toDateId(tempStartDate),
          startId: toDateId(tempStartDate),
        },
      ];
    }

    // Plage complète
    return [
      {
        endId: toDateId(tempEndDate),
        startId: toDateId(tempStartDate),
      },
    ];
  }, [tempStartDate, tempEndDate]);

  // 🚫 Logique de désactivation des flèches
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

  // 📆 Hooks du calendrier
  const { calendarRowMonth, weekDaysList, weeksList } = useCalendar({
    calendarActiveDateRanges,
    calendarFormatLocale: tolgeeLang,
    calendarMaxDateId: maxDateId,
    calendarMinDateId: todayId,
    calendarMonthId: currentMonthId,
  });

  // 🎬 Handlers
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

      // 🔄 Logique de sélection de plage
      if (!tempStartDate || (tempStartDate && tempEndDate)) {
        // Première sélection ou reset
        setTempStartDate(selectedDate);
        setTempEndDate(null);
      } else {
        // Deuxième sélection
        const start = dayjs(tempStartDate);
        const end = dayjs(selectedDate);

        if (end.isBefore(start)) {
          // Si la fin est avant le début, inverser
          setTempStartDate(selectedDate);
          setTempEndDate(tempStartDate);
        } else {
          // Vérifier les contraintes de durée
          const daysDiff = end.diff(start, 'day') + 1;

          if (minRangeDays && daysDiff < minRangeDays) {
            // Trop court, on reset
            setTempStartDate(selectedDate);
            setTempEndDate(null);
            return;
          }

          if (maxRangeDays && daysDiff > maxRangeDays) {
            // Trop long, on reset
            setTempStartDate(selectedDate);
            setTempEndDate(null);
            return;
          }

          setTempEndDate(selectedDate);
        }
      }

      // Si pas de boutons de validation, appliquer directement
      if (hideActions && tempStartDate && selectedDate) {
        const newRange = {
          endDate: selectedDate,
          startDate: tempStartDate,
        };
        setConfirmedRange(newRange);
        onDateRangeChange?.(newRange);
      }
    },
    [tempStartDate, tempEndDate, hideActions, onDateRangeChange, minRangeDays, maxRangeDays],
  );

  const handleValidate = useCallback(() => {
    if (!tempStartDate || !tempEndDate) return;

    const newRange = {
      endDate: tempEndDate,
      startDate: tempStartDate,
    };
    setConfirmedRange(newRange);
    onValidate?.(newRange);
  }, [tempStartDate, tempEndDate, onValidate]);

  const handleCancel = useCallback(() => {
    setTempStartDate(confirmedRange.startDate);
    setTempEndDate(confirmedRange.endDate);
    onCancel?.();
  }, [confirmedRange, onCancel]);

  // 🎨 Thème du calendrier avec gestion de la plage
  const dayTheme: CalendarTheme['itemDay'] = useMemo(
    () => ({
      active: ({ isEndOfRange, isStartOfRange }) => ({
        container: {
          backgroundColor: COLORS.primary,
          borderBottomLeftRadius: isStartOfRange ? CALENDAR_CONFIG.BORDER_RADIUS : 0,
          borderBottomRightRadius: isEndOfRange ? CALENDAR_CONFIG.BORDER_RADIUS : 0,
          borderTopLeftRadius: isStartOfRange ? CALENDAR_CONFIG.BORDER_RADIUS : 0,
          borderTopRightRadius: isEndOfRange ? CALENDAR_CONFIG.BORDER_RADIUS : 0,
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
          marginTop: IS_ANDROID && -1,
        },
      }),
    }),
    [],
  );

  // 🔍 Vérifier si le bouton de validation doit être désactivé
  const isValidateDisabled = !tempStartDate || !tempEndDate;

  return (
    <Box>
      <FlashCalendar.VStack spacing={CALENDAR_CONFIG.HEADER_SPACING}>
        {/* 🧭 HEADER */}
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

        {/* 📅 JOURS DE LA SEMAINE */}
        <FlashCalendar.Row.Week>
          {weekDaysList.map((weekDay, i) => (
            <FlashCalendar.Item.WeekName key={i} height={CALENDAR_CONFIG.WEEK_NAME_HEIGHT}>
              <String variant="body-xs" colorVariant="muted">
                {weekDay}
              </String>
            </FlashCalendar.Item.WeekName>
          ))}
        </FlashCalendar.Row.Week>

        {/* 🗓️ GRILLE DU CALENDRIER */}
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
                  onPress={day.state === 'disabled' ? undefined : handleDayPress}
                  theme={dayTheme}
                >
                  {day.displayLabel}
                </FlashCalendar.Item.Day>
              </FlashCalendar.Item.Day.Container>
            ))}
          </FlashCalendar.Row.Week>
        ))}
      </FlashCalendar.VStack>

      {/* 📊 AFFICHAGE DE LA SÉLECTION */}
      {(tempStartDate || tempEndDate) && !hideActions && (
        <BoxRow className="mt-4 justify-between">
          <Box>
            <String variant="body-xs" colorVariant="muted">
              Début
            </String>
            <String font="primaryBold">{tempStartDate ? dayjs(tempStartDate).format('DD/MM/YYYY') : '—'}</String>
          </Box>
          <Box>
            <String variant="body-xs" colorVariant="muted">
              Fin
            </String>
            <String font="primaryBold">{tempEndDate ? dayjs(tempEndDate).format('DD/MM/YYYY') : '—'}</String>
          </Box>
        </BoxRow>
      )}

      {/* ✅ BOUTONS D'ACTION */}
      {!hideActions && (
        <BoxRow className="mt-7 gap-2">
          <Button title={cancelButtonText} className="flex-[1]" variant="outlined" size="md" onPress={handleCancel} />
          <Button
            title={validateButtonText}
            className="flex-[2]"
            size="md"
            onPress={handleValidate}
            isDisabled={isValidateDisabled}
          />
        </BoxRow>
      )}
    </Box>
  );
}

export default memo(CalendarDateRange);
