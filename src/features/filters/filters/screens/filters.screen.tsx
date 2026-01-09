import { WrapperGestureHandlerScrollView } from '@ludo/ui';

import FilterHeader from '../components/filter-header.component';
import FilterFooter from '../components/filter-footer.component';
import FilterFieldType from '../components/filter-field-type.component';
import FilterSearchRadius from '../components/filter-search-radius.component';
import FilterSessionDuration from '../components/filter-session-duration.component';
import FilterLocationWrapper from '../components/filter-location/filter-location-wrapper.component';
import FilterSessionDateWrapper from '../components/filter-session-date/filter-session-date-wrapper.component';

export default function FiltersScreen() {
  return (
    <>
      <FilterHeader />
      <WrapperGestureHandlerScrollView contentContainerClassName="gap-3 pb-2">
        <FilterFieldType />
        <FilterSessionDuration />
        <FilterSessionDateWrapper />
        <FilterLocationWrapper />
        <FilterSearchRadius />
      </WrapperGestureHandlerScrollView>
      <FilterFooter />
    </>
  );
}
