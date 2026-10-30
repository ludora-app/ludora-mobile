import { useState } from 'react';
import { debounce } from 'radash';
import { Autocomplete } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { SearchPlace } from '@/api/utils/api.types';
import { useGetPlace } from '@/api/hooks/places.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useOnBoardingStore } from '../../../stores/on-boarding.store';
import { useSearchPlayAreaPlaces } from '../../queries/search-places.query';
import { ON_BOARDING_PLACES_MIN_QUERY_LENGTH } from '../../constants/on-boarding.constants';

const SEARCH_DEBOUNCE_MS = 300;

type OnBoardingPlayAreaSearchProps = {
  className?: string;
  inputContainerClassName?: string;
  onChangeQuery: (query: string) => void;
  query: string;
};

export const OnBoardingPlayAreaSearch = (props: OnBoardingPlayAreaSearchProps) => {
  const { className, inputContainerClassName, onChangeQuery, query } = props;
  const { t } = useTranslate();
  const getPlace = useGetPlace();
  const { trackError, trackEvent } = useAnalytics();
  const setPlayArea = useOnBoardingStore(state => state.setPlayArea);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [debouncedSetQuery] = useState(() => debounce({ delay: SEARCH_DEBOUNCE_MS }, setDebouncedQuery));
  const { isLoading, places } = useSearchPlayAreaPlaces(debouncedQuery);

  const isSearching = isLoading || query.trim() !== debouncedQuery.trim();

  const handleChangeQuery = (text: string) => {
    onChangeQuery(text);
    debouncedSetQuery(text);
  };

  const handleSelectPlace = async ({ description, id, label, location }: SearchPlace) => {
    try {
      const coordinates = location ?? (await getPlace(id))?.location;
      if (!coordinates) return;
      setPlayArea({ description, isCurrentLocation: false, label, ...coordinates });
      handleChangeQuery('');
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
