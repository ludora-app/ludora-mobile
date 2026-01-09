import dayjs from 'dayjs';
import { memo, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRowCenter, Icon, String } from '@ludo/ui';

import ROUTES from '@/constants/ROUTES';
import { FiltersCalendarReturnParams } from '@/features/filters/filters-calendar/types/filters-calendar.types';

import { useFiltersStore } from '../../store/filters.store';

type FilterSessionDateProps = FiltersCalendarReturnParams;

function FilterSessionDate(props: FilterSessionDateProps) {
  const { date } = props;

  const router = useRouter();
  const { t } = useTranslate();
  const setFilters = useFiltersStore(state => state.setFilters);
  const selectedDate = useFiltersStore(state => state.filters.date);
  const formatedDate = dayjs(selectedDate).format('DD/MM/YYYY');

  const handlePress = () => {
    router.navigate({
      params: { GoBackPath: ROUTES.FILTERS.FILTER, initialDate: selectedDate?.toISOString() },
      pathname: ROUTES.FILTERS.FILTER_CALENDAR,
    });
  };

  useEffect(() => {
    if (date) {
      setFilters({ date: new Date(date) });
    }
  }, [date, setFilters]);

  return (
    <Pressable onPress={handlePress}>
      <Box className="flex-row items-center justify-between gap-2 rounded-xl border border-ring bg-white p-3 py-4">
        <Box className="flex-row items-center gap-2">
          <Icon name="calendar-date-regular" color="#666" />
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('filters.session_date_title')}
          </String>
        </Box>
        <BoxRowCenter className="gap-2">
          <String variant="body-sm" font="primaryBold">
            {formatedDate}
          </String>
          <Icon name="arrow-right-regular" color="#666" size="sm" />
        </BoxRowCenter>
      </Box>
    </Pressable>
  );
}

export default memo(FilterSessionDate, (prevProps, nextProps) => prevProps.date === nextProps.date);
