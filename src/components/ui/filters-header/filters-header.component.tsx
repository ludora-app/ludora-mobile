import { isString } from 'radash';
import { useEffect, useMemo } from 'react';
import { ScalePressable } from '@chillui/ui';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Badge, Box, BoxCenter, BoxRow, Icon } from '@ludo/ui';

import { parse } from '@/utils/json.utils';
import ROUTES, { RouteValues } from '@/constants/ROUTES';
import { filtersMapper } from '@/features/create-session/utils/filters-mapper.utils';
import { FiltersReturnParams, FiltersScreenParams } from '@/features/filters/filters/types/filters.types';

import FiltersHeaderInput from './filters-header-input.component';

export interface FiltersHeaderProps {
  numberOfFilters: number;
  goBackPath?: RouteValues;
  onFilterPress?: () => void;
  selectedDayCarouselDate?: string | null;
  onFiltersChange?: (filters: any) => void;
  source?: 'filter_fields' | 'filter_sessions_all';
}

export default function FiltersHeader({
  goBackPath = ROUTES.CREATE_SESSION.INDEX,
  numberOfFilters,
  onFilterPress,
  onFiltersChange,
  selectedDayCarouselDate = null,
  source = 'filter_fields',
}: FiltersHeaderProps) {
  const router = useRouter();
  const { selectedFilters } = useLocalSearchParams<FiltersReturnParams>();

  const parsedSelectFilters = useMemo(() => {
    if (!selectedFilters || !isString(selectedFilters)) return null;
    try {
      return parse(selectedFilters);
    } catch {
      return null;
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (parsedSelectFilters && onFiltersChange) {
      const filters = filtersMapper(parsedSelectFilters);
      onFiltersChange(filters);
    }
  }, [parsedSelectFilters, onFiltersChange]);

  const handleOpenFilter = () => {
    if (onFilterPress) {
      onFilterPress();
      return;
    }

    const params: FiltersScreenParams = {
      goBackPath,
      selectedDayCarouselDate,
      source,
    };
    router.push({ params, pathname: ROUTES.FILTERS.FILTER });
  };

  return (
    <BoxRow className="items-center gap-2 bg-background py-2">
      <Box className="flex-1">
        <FiltersHeaderInput />
      </Box>
      <Badge show={numberOfFilters > 0} title={numberOfFilters?.toString() || '0'}>
        <ScalePressable onPress={handleOpenFilter}>
          <BoxCenter className="rounded-full bg-primary p-3">
            <Icon name="filter-add-solid" size="md" />
          </BoxCenter>
        </ScalePressable>
      </Badge>
    </BoxRow>
  );
}
