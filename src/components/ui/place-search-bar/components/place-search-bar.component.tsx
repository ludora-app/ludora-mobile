import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Autocomplete, IconButton } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { SearchPlace } from '@/api/utils/api.types';
import { usePlaceSearch } from '@/hooks/place-search.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

const MAX_SUGGESTIONS = 4;
const MIN_QUERY_LENGTH = 3;

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 8px 18px -8px rgba(51, 49, 50, 0.35)',
  },
});

export type PlaceSearchBarPlace = {
  label: string;
  latitude: number;
  longitude: number;
};

type PlaceSearchBarProps = {
  className?: string;
  /** `false` hides the suggestions, e.g. after a tap on a backdrop. */
  isDropdownOpen?: boolean;
  /** The current position is used: the button shows a check. */
  isLocated?: boolean;
  isLocating?: boolean;
  /** The selected place was cleared from the input. */
  onClearPlace?: () => void;
  onDropdownOpenChange?: (isOpen: boolean) => void;
  onLocate: () => void;
  onSelectPlace: (place: PlaceSearchBarPlace) => void;
  placeholder?: string;
};

/**
 * City, district or address search (IGN first, Google Places as fallback, ADR 0005)
 * next to an "Around me" button. The suggestions span the whole bar and push the content below:
 * to float them, position the bar absolutely (see Autocomplete).
 */
export const PlaceSearchBar = (props: PlaceSearchBarProps) => {
  const {
    className,
    isDropdownOpen = true,
    isLocated = false,
    isLocating = false,
    onClearPlace,
    onDropdownOpenChange,
    onLocate,
    onSelectPlace,
    placeholder,
  } = props;
  const { t } = useTranslate();
  const { trackError } = useAnalytics();
  const [query, setQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const { getCoordinates, isSearching, places, resetSearch, search } = usePlaceSearch({
    context: 'PlaceSearchBar',
    limit: MAX_SUGGESTIONS,
    minQueryLength: MIN_QUERY_LENGTH,
    query,
  });

  // The input shows the selected place until the player edits it
  const isShowingSelection = selectedLabel !== null && query === selectedLabel;

  const handleChangeQuery = (text: string) => {
    setQuery(text);
    search(text);
    onDropdownOpenChange?.(text.trim().length >= MIN_QUERY_LENGTH);
    if (!text && selectedLabel !== null) {
      setSelectedLabel(null);
      onClearPlace?.();
    }
  };

  const handleFocus = () => onDropdownOpenChange?.(!isShowingSelection && query.trim().length >= MIN_QUERY_LENGTH);

  // The input is emptied: the selected place no longer applies, even if the location is denied
  const handleLocate = () => {
    setQuery('');
    resetSearch();
    onDropdownOpenChange?.(false);
    if (selectedLabel !== null) {
      setSelectedLabel(null);
      onClearPlace?.();
    }
    onLocate();
  };

  const handleSelect = async (place: SearchPlace) => {
    try {
      const coordinates = await getCoordinates(place);
      if (!coordinates) return;
      const { label } = place;
      setQuery(label);
      resetSearch();
      setSelectedLabel(label);
      onDropdownOpenChange?.(false);
      onSelectPlace({ label, ...coordinates });
    } catch (error) {
      trackError({ error, extra: { context: 'PlaceSearchBar' } });
    }
  };

  return (
    <Autocomplete
      className={className}
      inputContainerClassName="h-14 rounded-control bg-white"
      isDropdownOpen={isDropdownOpen && !isShowingSelection}
      inputProps={{ inputFieldProps: { onFocus: handleFocus } }}
      isLoading={isSearching}
      items={places}
      itemIconName="location-regular"
      minQueryLength={MIN_QUERY_LENGTH}
      onChangeQuery={handleChangeQuery}
      onSelect={handleSelect}
      placeholder={placeholder ?? t('place-search-bar.placeholder')}
      query={query}
      rightContent={
        <IconButton
          iconName={isLocated ? 'checked-circle-solid' : 'gps-location-regular'}
          iconColor={COLORS.primary}
          colorVariant="white"
          size="lg"
          className="size-14 rounded-control"
          style={styles.shadow}
          isLoading={isLocating}
          loadingIndicatorProps={{ color: COLORS.primary, name: 'swing' }}
          onPress={handleLocate}
        />
      }
    />
  );
};
