import dayjs from 'dayjs';
import { memo, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRowCenter, Icon, String } from '@ludo/ui';

import ROUTES from '@/constants/ROUTES';
import COLORS from '@/constants/COLORS';

import { useFiltersStore } from '../../store/filters.store';
import {
  FiltersCalendarReturnParams,
  FiltersCalendarScreenParams,
  FiltersScreenParams,
} from '../../types/filters.types';

type FilterSessionDateProps = {
  date?: FiltersCalendarReturnParams['date'];
  selectedDayCarouselDate?: FiltersScreenParams['selectedDayCarouselDate'];
};

function FilterSessionDate(props: FilterSessionDateProps) {
  const { date, selectedDayCarouselDate } = props;

  const router = useRouter();
  const { t } = useTranslate();
  const setFilters = useFiltersStore(state => state.setFilters);
  const selectedDate = useFiltersStore(state => state.filters.date?.date);

  const formatedDate = dayjs(selectedDate).format('DD/MM/YYYY');

  const handlePress = () => {
    const params: FiltersCalendarScreenParams = {
      goBackPath: ROUTES.FILTERS.FILTER,
      initialDate: selectedDate?.toISOString(),
    };
    router.navigate({
      params,
      pathname: ROUTES.FILTERS.FILTER_CALENDAR,
    });
  };

  useEffect(() => {
    if (selectedDayCarouselDate) {
      setFilters({
        date: {
          date: new Date(selectedDayCarouselDate),
          source: 'carousel',
        },
        selectedDayCarouselDate,
      });
    }
  }, [selectedDayCarouselDate, setFilters]);

  useEffect(() => {
    if (date) {
      setFilters({
        date: {
          date: new Date(date),
          source: 'filter',
        },
      });
    }
  }, [date, setFilters]);

  return (
    <Pressable onPress={handlePress}>
      <Box className="flex-row items-center justify-between gap-2 rounded-xl border border-ring bg-white p-3 py-4">
        <Box className="flex-row items-center gap-2">
          <Icon name="calendar-date-regular" color={COLORS.muted} />
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('filters.session_date_title')}
          </String>
        </Box>
        <BoxRowCenter className="gap-2">
          <String variant="body-sm" font="primaryBold">
            {formatedDate}
          </String>
          <Icon name="arrow-right-regular" color={COLORS.muted} size="sm" />
        </BoxRowCenter>
      </Box>
    </Pressable>
  );
}

export default memo(FilterSessionDate, (prevProps, nextProps) => prevProps.date === nextProps.date);
