import { FiltersHeader } from '@/components/ui/filters-header';
import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';

export default function CreateSessionStep2FieldsListHeaderSticky() {
  const setFilters = useCreateSessionFiltersFieldsStore(state => state.setFilters);
  const numberOfFilters = useCreateSessionFiltersFieldsStore(state => state.numberOfFilters);
  const dateFilter = useCreateSessionFiltersFieldsStore(state => state.filters.date);

  const selectedDayCarouselDate = dateFilter?.source === 'day-carousel' ? dateFilter?.date : null;

  return (
    <FiltersHeader
      numberOfFilters={numberOfFilters}
      source="filter_fields"
      goBackPath="/create-session"
      selectedDayCarouselDate={selectedDayCarouselDate}
      onFiltersChange={setFilters}
    />
  );
}
