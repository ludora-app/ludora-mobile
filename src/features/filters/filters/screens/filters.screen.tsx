import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { WrapperGestureHandlerScrollView } from '@ludo/ui';

import { mmkvStorage } from '@/utils/mmkv-storage.utils';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

import { useFiltersStore } from '../store/filters.store';
import { FiltersScreenParams } from '../types/filters.types';
import FilterHeader from '../components/filter-header.component';
import FilterFooter from '../components/filter-footer.component';
import FilterModes from '../components/filter-modes/filter-modes-component';
import FilterSports from '../components/filter-sports/filter-sports.component';
import FilterLevels from '../components/filter-levels/filter-levels.component';
import FilterSessionDuration from '../components/filter-session-duration.component';
import FilterLocationWrapper from '../components/filter-location/filter-location-wrapper.component';
import FilterSearchRadius from '../components/filter-distance-radius/filter-distance-radius.component';
import FilterSessionDateWrapper from '../components/filter-session-date/filter-session-date-wrapper.component';

const mmkvStorageKey = MMKV_STORAGE_KEY.FILTERS_SCREEN.SOURCE;

export default function FiltersScreen() {
  const { source } = useLocalSearchParams<FiltersScreenParams>();
  const sourceValue = source ?? (mmkvStorage.getString(mmkvStorageKey) as FiltersScreenParams['source']);
  const setCurrentSource = useFiltersStore(state => state.setCurrentSource);

  const showFilterSessionsAll = sourceValue === 'filter_sessions_all';
  const showPlayersSuggestions = sourceValue === 'players_suggestions';

  useEffect(() => {
    if (sourceValue) {
      setCurrentSource(sourceValue);
    }
  }, [sourceValue, setCurrentSource]);

  return (
    <>
      <FilterHeader />
      <WrapperGestureHandlerScrollView contentContainerClassName="gap-3 pb-10">
        {/* <FilterFieldType /> */}
        {(showFilterSessionsAll || showPlayersSuggestions) && <FilterSports />}
        {!showPlayersSuggestions && <FilterLocationWrapper />}
        {!showPlayersSuggestions && <FilterSearchRadius />}
        {!showPlayersSuggestions && <FilterSessionDateWrapper />}
        {(showFilterSessionsAll || showPlayersSuggestions) && <FilterLevels />}
        {showFilterSessionsAll && <FilterModes />}
        {showFilterSessionsAll && <FilterSessionDuration />}
      </WrapperGestureHandlerScrollView>
      <FilterFooter />
    </>
  );
}
