import { memo, useCallback } from 'react';
import { useTranslate } from '@tolgee/react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Box, BoxRow, BoxRowCenterBetween, Button, Icon, Slider, String } from '@ludo/ui';

import { useUserLocationStore } from '@/stores/user-geolocalisation.store';

import { useFiltersStore } from '../store/filters.store';

const radiusDistances = [
  {
    id: 1,
    labal: '5 km',
    value: 5,
  },
  {
    id: 2,
    labal: '10 km',
    value: 10,
  },
  {
    id: 3,
    labal: '20 km',
    value: 20,
  },
  {
    id: 4,
    labal: '50 km',
    value: 50,
  },
];

const AnimatedBox = Animated.createAnimatedComponent(Box);

function FilterSearchRadius() {
  const { t } = useTranslate();
  const address = useFiltersStore(state => state.filters.address);
  const { latitude, longitude } = useUserLocationStore(state => state.location) || {};
  const maxDistance = useFiltersStore(state => state.filters.maxDistance);
  const setFilters = useFiltersStore(state => state.setFilters);

  const distanceValue = maxDistance ?? 25;
  const hasLocation = (!!latitude && !!longitude) || !!address;

  const handleIncrement = () => {
    setFilters({ maxDistance: Math.min(distanceValue + 1, 50) });
  };

  const handleDecrement = () => {
    setFilters({ maxDistance: Math.max(distanceValue - 1, 1) });
  };

  const handleSliderChange = useCallback(
    (values: number[]) => {
      const value = Math.round(values[0]);

      setFilters({ maxDistance: value });
    },
    [setFilters],
  );

  const filterRightText = () => {
    if (maxDistance) return `${maxDistance} km`;
    return '- km';
  };

  if (!hasLocation) {
    return null;
  }

  return (
    <AnimatedBox className="gap-3 rounded-xl border border-ring bg-white p-3 py-2" entering={FadeIn} exiting={FadeOut}>
      {/* Header Toujours Visible */}
      <BoxRowCenterBetween>
        <BoxRow className="items-center gap-2">
          <Icon name="pin-location-regular" color="#666" />
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('filters.search_radius_title')}
          </String>
        </BoxRow>

        <String variant="body-sm" font="primaryBold">
          {filterRightText()}
        </String>
      </BoxRowCenterBetween>

      <Box>
        <BoxRowCenterBetween className="mb-2">
          <Icon name="minus-circle-regular-colored" onPress={handleDecrement} pressEffectSize="xs" size="lg" />
          {!!maxDistance && (
            <String useFastText={false}>
              <String useFastText={false} font="primaryBold">
                {maxDistance}
              </String>{' '}
              km
            </String>
          )}
          {!maxDistance && <String>-</String>}

          <Icon name="add-circle-regular-colored" onPress={handleIncrement} pressEffectSize="xs" size="lg" />
        </BoxRowCenterBetween>
        <Box className="mb-2">
          <Slider
            value={distanceValue}
            onValueChange={handleSliderChange}
            minimumValue={1}
            maximumValue={50}
            rangeClassName="bg-ring h-1"
            trackClassName="bg-ring"
            thumbClassName="size-5 bg-primary"
          />
        </Box>
        <BoxRow className="flex-row gap-2">
          {radiusDistances.map(type => (
            <Button
              key={type.id}
              title={`${type.value} km`}
              className="flex-1"
              size="xs"
              variant={type.value === maxDistance ? 'contained' : 'outlined'}
              onPress={() => setFilters({ maxDistance: type.value })}
            />
          ))}
        </BoxRow>
      </Box>
    </AnimatedBox>
  );
}

export default memo(FilterSearchRadius);
