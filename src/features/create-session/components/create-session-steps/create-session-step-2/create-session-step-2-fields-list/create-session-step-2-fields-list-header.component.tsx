import { isString } from 'radash';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo } from 'react';
import { ScalePressable } from '@chillui/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Badge, Box, BoxCenter, BoxRow, Icon } from '@ludo/ui';

import ROUTES from '@/constants/ROUTES';
import { parse } from '@/utils/json.utils';
import { DaysCarousel } from '@/components/ui/days-carousel';
import { FiltersReturnParams } from '@/features/filters/filters/types/filters.types';
import { filtersMapper } from '@/features/create-session/utils/filters-mapper.utils';
import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';

import CreateSessionTitle from '../../../create-session-title-component';
import CreateSessionStep2FieldsListHeaderInput from './create-session-step-2-fields-list-header-input.component';

export default function CreateSessionStep2FieldsListHeader() {
  const dateFilter = useCreateSessionFiltersFieldsStore(state => state.filters.date?.date);
  const setFilters = useCreateSessionFiltersFieldsStore(state => state.setFilters);
  const setSessionFilters = useCreateSessionFiltersFieldsStore(state => state.setFilters);
  const numberOfFilters = useCreateSessionFiltersFieldsStore(state => state.numberOfFilters);
  const { selectedFilters } = useLocalSearchParams<FiltersReturnParams>();

  const router = useRouter();

  const parsedSelectFilters = useMemo(() => {
    if (!selectedFilters || !isString(selectedFilters)) return null;
    try {
      return parse(selectedFilters);
    } catch {
      return null;
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (parsedSelectFilters) {
      const filters = filtersMapper(parsedSelectFilters);
      setFilters(filters);
    }
  }, [parsedSelectFilters, setFilters]);

  const handleOpenFilter = () => {
    router.push({ params: { goBackPath: ROUTES.CREATE_SESSION.INDEX }, pathname: ROUTES.FILTERS.FILTER });
  };

  const handleSelectDay = (day: Dayjs) => {
    setSessionFilters({ date: { date: day.toISOString(), source: 'day-carousel' } });
  };

  return (
    <Box>
      <CreateSessionTitle title="Trop cool, on fait ça ou et quand ?" />
      <BoxRow className="items-center gap-2">
        <Box className="flex-1">
          <CreateSessionStep2FieldsListHeaderInput />
        </Box>
        <Badge show={numberOfFilters > 0} title={numberOfFilters?.toString() || '0'}>
          <ScalePressable onPress={handleOpenFilter}>
            <BoxCenter className="rounded-full bg-primary p-3">
              <Icon name="filter-add-solid" size="md" />
            </BoxCenter>
          </ScalePressable>
        </Badge>
      </BoxRow>
      <DaysCarousel className="my-5" onSelect={handleSelectDay} initialDate={dayjs(dateFilter)} />
    </Box>
  );
}
