import { Wrapper } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { FiltersHeader } from '@/components/ui/filters-header';
import { Filters } from '@/features/filters/filters/store/filters.store';
import { homeFiltersMapper } from '@/features/home/utils/home-filters-mapper.utils';
import { useHomeSessionFiltersStore } from '@/features/home/stores/home-sessions-filters.store';


export default function PlayersListHeaderSticky() {
  const { t } = useTranslate();
  const setSessionFilter = useHomeSessionFiltersStore(state => state.setFilters);
  const dateFilter = useHomeSessionFiltersStore(state => state.filters.date);
  const numberOfFilters = useHomeSessionFiltersStore(state => state.numberOfFilters);

  const selectedDayCarouselDate = dateFilter?.source === 'day-carousel' ? dateFilter?.date : null;

  const handleFiltersChange = (filters: Filters) => {
    const cleanedFilters = homeFiltersMapper(filters);
    setSessionFilter(cleanedFilters);
  };

  const handleInputChange = (text: string) => {
    setSessionFilter({
      search: text,
    });
  };

  return (
    <Wrapper className="rounded-t-xl bg-background py-3" px="none">
      <FiltersHeader
        numberOfFilters={numberOfFilters}
        source="players_suggestions"
        goBackPath="/(tabs)/players"
        selectedDayCarouselDate={selectedDayCarouselDate}
        onFiltersChange={handleFiltersChange}
        onChangeText={handleInputChange}
        placeholder={t('players.players_list_header.input_placeholder')}
      />
    </Wrapper>
  );
}
