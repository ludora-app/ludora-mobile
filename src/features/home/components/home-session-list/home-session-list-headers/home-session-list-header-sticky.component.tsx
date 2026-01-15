import { Wrapper } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';

import { FiltersHeader } from '@/components/ui/filters-header';
import { Filters } from '@/features/filters/filters/store/filters.store';
import { homeFiltersMapper } from '@/features/home/utils/home-filters-mapper.utils';
import { useHomeSessionFiltersStore } from '@/features/home/stores/home-sessions-filters.store';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  },
});
export default function HomeSessionListHeaderSticky() {
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
    <Wrapper className="rounded-t-xl bg-background py-3" style={styles.shadow}>
      <FiltersHeader
        numberOfFilters={numberOfFilters}
        source="filter_sessions_all"
        goBackPath="/"
        selectedDayCarouselDate={selectedDayCarouselDate}
        onFiltersChange={handleFiltersChange}
        onChangeText={handleInputChange}
        placeholder={t('home.session-list-header.input_placeholder')}
      />
    </Wrapper>
  );
}
