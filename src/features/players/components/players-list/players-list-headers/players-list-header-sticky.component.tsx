import { Wrapper } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { FiltersHeader } from '@/components/ui/filters-header';
import { Filters } from '@/features/filters/filters/store/filters.store';

import { usePlayersFiltersStore } from '../../../stores/players-filters.store';
import { playersFiltersMapper } from '../../../utils/players-filters-mapper.utils';

export default function PlayersListHeaderSticky() {
  const { t } = useTranslate();
  const setPlayersFilter = usePlayersFiltersStore(state => state.setFilters);
  const numberOfFilters = usePlayersFiltersStore(state => state.numberOfFilters);

  const handleFiltersChange = (filters: Filters) => {
    const cleanedFilters = playersFiltersMapper(filters);
    setPlayersFilter(cleanedFilters);
  };

  const handleInputChange = (text: string) => {
    setPlayersFilter({
      name: text,
    });
  };

  return (
    <Wrapper className="rounded-t-xl bg-background py-3" px="none">
      <FiltersHeader
        numberOfFilters={numberOfFilters}
        source="players_suggestions"
        goBackPath="/(tabs)/players"
        onFiltersChange={handleFiltersChange}
        onChangeText={handleInputChange}
        placeholder={t('players.players_list_header.input_placeholder')}
      />
    </Wrapper>
  );
}
