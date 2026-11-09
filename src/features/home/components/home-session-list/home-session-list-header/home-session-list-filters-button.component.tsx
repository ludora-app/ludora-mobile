import { useEffect } from 'react';
import { isString } from 'radash';
import { useTranslate } from '@tolgee/react';
import { ScalePressable } from '@chillui/ui';
import { Badge, BoxRow, Icon, String } from '@ludo/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { parse } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { Filters } from '@/features/filters/filters/store/filters.store';
import { FiltersReturnParams, FiltersScreenParams } from '@/features/filters/filters/types/filters.types';

import { homeFiltersMapper } from '../../../utils/home-filters-mapper.utils';
import { useHomeSessionFiltersStore } from '../../../stores/home-sessions-filters.store';

function parseSelectedFilters(selectedFilters: unknown): Filters | null {
  if (!selectedFilters || !isString(selectedFilters)) return null;
  try {
    return parse(selectedFilters);
  } catch {
    return null;
  }
}

/** Opens the existing filters page; the filters it returns apply to "Toutes les sessions". */
export const HomeSessionListFiltersButton = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { selectedFilters } = useLocalSearchParams<FiltersReturnParams>();
  const numberOfFilters = useHomeSessionFiltersStore(state => state.numberOfFilters);
  const setFilters = useHomeSessionFiltersStore(state => state.setFilters);

  useEffect(() => {
    const filters = parseSelectedFilters(selectedFilters);
    if (filters) setFilters(homeFiltersMapper(filters));
  }, [selectedFilters, setFilters]);

  const handlePress = () => {
    const params: FiltersScreenParams = { goBackPath: '/', selectedDayCarouselDate: '', source: 'filter_sessions_all' };
    router.navigate({ params, pathname: ROUTES.FILTERS.FILTER });
  };

  return (
    <Badge show={numberOfFilters > 0} title={numberOfFilters.toString()}>
      <ScalePressable onPress={handlePress}>
        <BoxRow className="h-11 items-center gap-2 rounded-full border-2 border-darkSoft bg-white px-4">
          <Icon name="equalizer-regular" color={COLORS.dark} size="sm" />
          <String variant="body-sm" font="primaryBold">
            {t('home.sessions.filters')}
          </String>
        </BoxRow>
      </ScalePressable>
    </Badge>
  );
};
