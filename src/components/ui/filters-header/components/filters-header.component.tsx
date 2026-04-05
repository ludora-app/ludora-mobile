import { isString } from 'radash';
import { useEffect, useMemo } from 'react';
import { cn, ScalePressable } from '@chillui/ui';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Badge, Box, BoxCenter, BoxRow, Icon } from '@ludo/ui';

import { parse } from '@/utils/json.utils';
import ROUTES, { RouteValues } from '@/constants/routes.constants';
import { Filters } from '@/features/filters/filters/store/filters.store';
import { FiltersReturnParams, FiltersScreenParams } from '@/features/filters/filters/types/filters.types';

import FiltersHeaderInput, { FiltersHeaderInputProps } from './filters-header-input.component';

export type FiltersHeaderProps = FiltersHeaderInputProps & {
  numberOfFilters: number;
  goBackPath?: RouteValues;
  onFilterPress?: () => void;
  selectedDayCarouselDate?: string | null;
  onFiltersChange?: (filters: Filters) => void;
  source?: 'filter_fields' | 'filter_sessions_all' | 'players_suggestions';
};

export default function FiltersHeader(props: FiltersHeaderProps) {
  const {
    className,
    goBackPath = ROUTES.CREATE_SESSION.INDEX,
    numberOfFilters,
    onFilterPress,
    onFiltersChange,
    selectedDayCarouselDate = null,
    source = 'filter_fields',
    ...rest
  } = props;
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
      onFiltersChange(parsedSelectFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  const handleOpenFilter = () => {
    if (onFilterPress) {
      onFilterPress();
      return;
    }

    const params: FiltersScreenParams = {
      goBackPath,
      selectedDayCarouselDate: selectedDayCarouselDate ?? '',
      source,
    };
    router.navigate({ params, pathname: ROUTES.FILTERS.FILTER });
  };

  return (
    <BoxRow className={cn('items-center gap-2', className)}>
      <Box className="flex-1">
        <FiltersHeaderInput {...rest} />
      </Box>
      <Badge show={numberOfFilters > 0} title={numberOfFilters?.toString() || '0'}>
        <ScalePressable onPress={handleOpenFilter}>
          <BoxCenter className="bg-primary rounded-full p-3">
            <Icon name="filter-add-solid" size="md" />
          </BoxCenter>
        </ScalePressable>
      </Badge>
    </BoxRow>
  );
}
