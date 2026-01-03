import { WrapperGestureHandlerScrollView } from '@ludo/ui';

import FilterHeader from './filter-header.component';
import FilterFooter from './filter-footer.component';
import FilterLocation from './filter-location.component';
import FilterFieldType from './filter-field-type.component';
import FilterSessionDate from './filter-session-date.component';
import FilterSearchRadius from './filter-search-radius.component';
import FilterSessionDuration from './filter-session-duration.component';

export default function Filters() {
  console.log('Filters');

  return (
    <>
      <FilterHeader />

      <WrapperGestureHandlerScrollView contentContainerClassName="gap-3 pb-2">
        <FilterFieldType />
        <FilterSessionDuration />
        <FilterSessionDate />
        <FilterLocation />
        <FilterSearchRadius />
      </WrapperGestureHandlerScrollView>

      <FilterFooter />
    </>
  );
}
