import { useMemo, useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, GetListFixedItemSize, List, String } from '@ludo/ui';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Keyboard, LayoutChangeEvent, Pressable } from 'react-native';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { HeaderRounded } from '@/components/ui/header';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { FieldSlotsCardSkeleton } from '@/components/ui/field-slots-card';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { LocationDeniedBanner } from '@/components/ui/location-denied-banner';
import { FieldResponseDto, FieldResponseDtoType } from '@/api/generated/model';
import { PlaceSearchBar, PlaceSearchBarPlace } from '@/components/ui/place-search-bar';

import { useOnBoardingSessionsStore } from '../../stores/on-boarding-sessions.store';
import { useGetPreparedSessionFields } from '../queries/get-prepared-session-fields.query';
import OnBoardingSessionsFieldsItem from '../components/on-boarding-sessions-fields-item.component';
import { useOnBoardingPlayAreaLocation } from '../../on-boarding-profile/hooks/on-boarding-play-area-location.hook';

const EMPTY_RESULT_PROPS = { title: 'on-boarding.sessions.fields.empty' } as const;

const PUBLIC_FIELD_ITEM_HEIGHT = 310;
const FIELD_ITEM_SKELETON_HEIGHT = 270;

const GET_FIXED_ITEM_SIZE: GetListFixedItemSize<FieldResponseDto> = (item, _index, type) => {
  if (type === 'skeleton') return FIELD_ITEM_SKELETON_HEIGHT;
  if (type === 'row' && item.type === FieldResponseDtoType.PUBLIC) return PUBLIC_FIELD_ITEM_HEIGHT;
  return undefined;
};

export const OnBoardingSessionsFieldsScreen = () => {
  const { t } = useTranslate();
  const { bottom } = useSafeArea();
  const { trackEvent } = useAnalytics();
  const sport = useOnBoardingSessionsStore(state => state.preparedSession?.sport);
  const [isDenied, setIsDenied] = useState(false);
  const [position, setPosition] = useState<PlaceSearchBarPlace | null>(null);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchBarTop, setSearchBarTop] = useState<number | null>(null);
  const {
    fetchNextPage,
    fields,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading: isLoadingFields,
    isRefetching,
    refetch: refetchFields,
    totalCount,
  } = useGetPreparedSessionFields({ position, sport });

  // The position only sorts the fields: it is not saved as play area
  const { isLocating, locate } = useOnBoardingPlayAreaLocation({
    hasDeniedAlert: false,
    onLocated: ({ label, latitude, longitude }) => {
      setPosition({ label, latitude, longitude });
      setIsCurrentLocation(true);
    },
  });

  const handleLocate = async () => {
    const result = await locate();
    setIsDenied(result.isDenied);
  };

  const handleSelectPlace = (place: PlaceSearchBarPlace) => {
    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.PLACE_SEARCHED });
    setPosition(place);
    setIsCurrentLocation(false);
  };

  const handleClearPlace = () => {
    setPosition(null);
    setIsCurrentLocation(false);
  };

  const handleSearchBarSpaceLayout = (event: LayoutChangeEvent) => setSearchBarTop(event.nativeEvent.layout.y);

  const handleCloseDropdown = () => {
    Keyboard.dismiss();
    setIsDropdownOpen(false);
  };

  const listHeaderComponent = useMemo(
    () => (
      <String variant="body-sm" font="primaryBold" className="pb-3">
        {t('on-boarding.sessions.fields.count', { count: totalCount })}
      </String>
    ),
    [t, totalCount],
  );
  const contentContainerStyle = useMemo(() => ({ paddingBottom: bottom }), [bottom]);

  return (
    <>
      <HeaderRounded title={t('on-boarding.sessions.fields.title')} hasGoBack />
      {/* Keeps the place of the search bar (py-3 around the 56 px bar), rendered over the screen below */}
      <Box className="h-20" onLayout={handleSearchBarSpaceLayout} />
      {isDenied && !position && (
        <LocationDeniedBanner
          className="mx-4 mt-2"
          description={t('on-boarding.sessions.fields.denied_description')}
          onClose={() => setIsDenied(false)}
        />
      )}
      <List
        data={fields}
        ItemComponent={OnBoardingSessionsFieldsItem}
        SkeletonComponent={FieldSlotsCardSkeleton}
        getFixedItemSize={GET_FIXED_ITEM_SIZE}
        ListHeaderComponent={isLoadingFields || fields.length === 0 ? undefined : listHeaderComponent}
        emptyResultProps={EMPTY_RESULT_PROPS}
        isError={isError}
        isLoading={isLoadingFields}
        isRefetching={isRefetching}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        refetch={refetchFields}
        contentContainerClassName="px-4 pt-3"
        contentContainerStyle={contentContainerStyle}
      />
      {isDropdownOpen && (
        <Animated.View entering={FadeIn} exiting={FadeOut} className="absolute inset-0 z-10 bg-dark/40">
          <Pressable className="flex-1" onPress={handleCloseDropdown} />
        </Animated.View>
      )}
      {/* Positioned on the screen so that its suggestions float over the list and stay touchable on Android,
          where a touch outside a parent's bounds is lost */}
      {searchBarTop !== null && (
        <Box className="absolute inset-x-0 z-20 px-4 py-3" style={{ top: searchBarTop }}>
          <PlaceSearchBar
            isDropdownOpen={isDropdownOpen}
            onClearPlace={handleClearPlace}
            onDropdownOpenChange={setIsDropdownOpen}
            isLocated={isCurrentLocation}
            isLocating={isLocating}
            onLocate={handleLocate}
            onSelectPlace={handleSelectPlace}
            placeholder={
              isCurrentLocation && position
                ? t('on-boarding.sessions.fields.around_place', { place: position.label })
                : undefined
            }
          />
        </Box>
      )}
    </>
  );
};
