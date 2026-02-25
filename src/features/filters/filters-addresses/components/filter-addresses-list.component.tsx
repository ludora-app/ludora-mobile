
import { debounce, list } from 'radash';
import { FlatList } from 'react-native-gesture-handler';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { serialize } from '@/utils/json.utils';
import { useGetPlace } from '@/api/hooks/places.hook';
import useGetUserLocation from '@/hooks/user-location.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import { useSearchPlaces } from '../queries/search-places.query';
import FilterAddressesListHeader from './filter-addresses-list-header.component';
import FiltersAddressesListEmpty from './filters-addresses-list-empty.component';
import FilterAddressesResultItem from './filter-addresses-result-item/filter-addresses-result-item.component';
import { FiltersAddressesReturnParams, FiltersAddressesScreenParams, Places } from '../types/filters-addresses.types';
import FilterAddressesResultItemSkeleton from './filter-addresses-result-item/filter-addresses-result-item-skeleton.component';

type SkeletonItem = { type: 'skeleton'; uid: string };
type ListItem = Places | SkeletonItem;

const SKELETON_COUNT = 3;
const SKELETON_DATA: SkeletonItem[] = list(SKELETON_COUNT).map((_, i) => ({
  type: 'skeleton',
  uid: `skel-${i}`,
}));

interface FilterAddressesListProps {
  inputValue: string;
}

export default function FilterAddressesList(props: FilterAddressesListProps) {
  const { inputValue } = props;
  const { goBackPath, showNearMe } = useLocalSearchParams<FiltersAddressesScreenParams>();
  const router = useRouter();
  const { trackError } = useAnalytics();
  const [isFetchingPlaceDetails, setIsFetchingPlaceDetails] = useState(false);

  const { data: searchPlacesData, isPending: isPendingSearchPlaces, mutateAsync: searchPlaces } = useSearchPlaces();
  const getPlace = useGetPlace();
  const { getCurrentLocation, isLoading: isLoadingUserLocation } = useGetUserLocation({
    showAlert: true,
    type: 'FIELDS',
  });

  const showSkeletons = isPendingSearchPlaces;

  const handleSearch = useCallback(
    async (searchValue: string) => {
      try {
        if (!searchValue) return;
        const response = await searchPlaces({ input: searchValue });

        if (response?.error) {
          throw response.error;
        }
      } catch (error) {
        trackError({ error });
      }
    },
    [searchPlaces, trackError],
  );

  const debouncedSearchRef = useRef(
    debounce({ delay: 300 }, (searchValue: string) => {
      handleSearch(searchValue);
    }),
  );

  useEffect(() => {
    if (inputValue) {
      debouncedSearchRef.current(inputValue);
    }
  }, [inputValue]);

  const onSelectAddress = useCallback(
    async (placeId: string) => {
      try {
        if (isFetchingPlaceDetails) return;
        setIsFetchingPlaceDetails(true);
        const place = await getPlace(placeId);
        const params: FiltersAddressesReturnParams = { address: serialize(place) };
        router.dismissTo({ params, pathname: goBackPath });
      } catch (error) {
        trackError({ error });
      } finally {
        setIsFetchingPlaceDetails(false);
      }
    },
    [getPlace, router, goBackPath, trackError, isFetchingPlaceDetails],
  );

  const renderItem = useCallback(
    ({ item }) => {
      if ('type' in item && item.type === 'skeleton') {
        return <FilterAddressesResultItemSkeleton />;
      }
      return (
        <FilterAddressesResultItem
          item={item}
          onSelect={onSelectAddress}
          isFetchingPlaceDetails={isFetchingPlaceDetails || isLoadingUserLocation}
        />
      );
    },
    [onSelectAddress, isFetchingPlaceDetails, isLoadingUserLocation],
  );

  const keyExtractor = useCallback((item: ListItem) => {
    if ('type' in item && item.type === 'skeleton') {
      return (item as SkeletonItem).uid;
    }
    return (item as Places).placePrediction.placeId;
  }, []);

  const dataToRender = useMemo(() => {
    if (showSkeletons) {
      return SKELETON_DATA;
    }
    if (!searchPlacesData) {
      return [];
    }
    return Array.isArray(searchPlacesData.suggestions) ? searchPlacesData.suggestions : [];
  }, [showSkeletons, searchPlacesData]);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={dataToRender}
      renderItem={renderItem}
      ListHeaderComponent={
        showNearMe !== 'false'
          ? <FilterAddressesListHeader isLoading={isLoadingUserLocation} getCurrentLocation={getCurrentLocation} />
          : undefined
      }
      contentContainerClassName="gap-4 pb-16 mt-5"
      bounces={false}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      ListEmptyComponent={FiltersAddressesListEmpty}
    />
  );
}
