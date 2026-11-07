import { Autocomplete } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { SearchPlace } from '@/api/utils/api.types';
import { usePlaceSearch } from '@/hooks/place-search.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useOnBoardingStore } from '../../../stores/on-boarding.store';
import {
  ON_BOARDING_PLACES_MAX_SUGGESTIONS,
  ON_BOARDING_PLACES_MIN_QUERY_LENGTH,
} from '../../constants/on-boarding.constants';

type OnBoardingPlayAreaSearchProps = {
  className?: string;
  inputContainerClassName?: string;
  onChangeQuery: (query: string) => void;
  query: string;
};

export const OnBoardingPlayAreaSearch = (props: OnBoardingPlayAreaSearchProps) => {
  const { className, inputContainerClassName, onChangeQuery, query } = props;
  const { t } = useTranslate();
  const { trackError, trackEvent } = useAnalytics();
  const setPlayArea = useOnBoardingStore(state => state.setPlayArea);
  const { getCoordinates, isSearching, places, resetSearch, search } = usePlaceSearch({
    context: 'OnBoardingPlayAreaSearch',
    limit: ON_BOARDING_PLACES_MAX_SUGGESTIONS,
    minQueryLength: ON_BOARDING_PLACES_MIN_QUERY_LENGTH,
    query,
  });

  const handleChangeQuery = (text: string) => {
    onChangeQuery(text);
    search(text);
  };

  const handleSelectPlace = async (place: SearchPlace) => {
    try {
      const coordinates = await getCoordinates(place);
      if (!coordinates) return;
      const { description, label } = place;
      setPlayArea({ description, isCurrentLocation: false, label, ...coordinates });
      onChangeQuery('');
      resetSearch();
      trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.PLACE_SEARCHED });
    } catch (error) {
      trackError({ error, extra: { context: 'handleSelectPlace' } });
    }
  };

  return (
    <Autocomplete
      className={className}
      inputContainerClassName={inputContainerClassName}
      isLoading={isSearching}
      items={places}
      itemIconName="location-regular"
      minQueryLength={ON_BOARDING_PLACES_MIN_QUERY_LENGTH}
      onChangeQuery={handleChangeQuery}
      onSelect={handleSelectPlace}
      placeholder={t('on-boarding.play-area.search_placeholder')}
      query={query}
    />
  );
};
