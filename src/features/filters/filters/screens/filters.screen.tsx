import { useLocalSearchParams } from 'expo-router';
import { WrapperGestureHandlerScrollView } from '@ludo/ui';

import { FiltersScreenParams } from '../types/filters.types';
import FilterHeader from '../components/filter-header.component';
import FilterFooter from '../components/filter-footer.component';
import FilterSearchRadius from '../components/filter-search-radius.component';
import FilterSessionDuration from '../components/filter-session-duration.component';
import FilterLocationWrapper from '../components/filter-location/filter-location-wrapper.component';
import FilterSessionDateWrapper from '../components/filter-session-date/filter-session-date-wrapper.component';

export default function FiltersScreen() {
  const { source } = useLocalSearchParams<FiltersScreenParams>();

  const showFilterSessionsAll = source === 'filter_sessions_all';

  return (
    <>
      <FilterHeader />
      <WrapperGestureHandlerScrollView contentContainerClassName="gap-3 pb-2">
        {/* <FilterFieldType /> */}
        {showFilterSessionsAll && <FilterSessionDuration />}
        <FilterSessionDateWrapper />
        <FilterLocationWrapper />
        <FilterSearchRadius />
      </WrapperGestureHandlerScrollView>
      <FilterFooter />
    </>
  );
}
