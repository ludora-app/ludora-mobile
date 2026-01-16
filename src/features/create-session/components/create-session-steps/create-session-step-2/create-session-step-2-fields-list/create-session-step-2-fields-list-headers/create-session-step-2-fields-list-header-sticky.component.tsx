import { useTranslate } from '@tolgee/react';

import { FiltersHeader } from '@/components/ui/filters-header';
import { Filters } from '@/features/filters/filters/store/filters.store';
import { filtersMapper } from '@/features/create-session/utils/filters-mapper.utils';
import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';

export default function CreateSessionStep2FieldsListHeaderSticky() {
  const { t } = useTranslate();
  const setFilters = useCreateSessionFiltersFieldsStore(state => state.setFilters);
  const numberOfFilters = useCreateSessionFiltersFieldsStore(state => state.numberOfFilters);
  const dateFilter = useCreateSessionFiltersFieldsStore(state => state.filters.date);

  const selectedDayCarouselDate = dateFilter?.source === 'day-carousel' ? dateFilter?.date : null;

  const OnFiltersChange = (filters: Filters) => {
    const selectedFilters = filtersMapper(filters);
    setFilters(selectedFilters);
  };

  const onInputChangeText = (text: string) => {
    setFilters({ search: text });
  };

  return (
    <FiltersHeader
      numberOfFilters={numberOfFilters}
      source="filter_fields"
      goBackPath="/create-session"
      selectedDayCarouselDate={selectedDayCarouselDate}
      onFiltersChange={OnFiltersChange}
      onChangeText={onInputChangeText}
      className="bg-background py-2"
      placeholder={t('create-session-steps.step-2.fields_list_header_input.placeholder')}
    />
  );
}
