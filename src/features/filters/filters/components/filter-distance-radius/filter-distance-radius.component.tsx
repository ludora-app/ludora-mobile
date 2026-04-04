import { useTranslate } from '@tolgee/react';
import { Slider } from 'react-native-awesome-slider';
import { memo, useCallback, useEffect, useState } from 'react';
import { Box, BoxRow, BoxRowCenterBetween, Button, Icon, String } from '@ludo/ui';
import Animated, { FadeIn, FadeOut, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';

import COLORS from '@/constants/colors.contstants';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';

import { useFiltersStore, selectFilters } from '../../store/filters.store';

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
    labal: '15 km',
    value: 15,
  },
  {
    id: 4,
    labal: '20 km',
    value: 20,
  },
];

const AnimatedBox = Animated.createAnimatedComponent(Box);

function FilterDistanceRadius() {
  const { t } = useTranslate();
  const [distanceValue, setDistanceValue] = useState(25);
  const address = useFiltersStore(state => selectFilters(state).address);
  const { latitude, longitude } = useUserLocationStore(state => state.location) || {};
  const maxDistanceStoreValue = useFiltersStore(state => selectFilters(state).maxDistance);
  const thumbScaleValue = useSharedValue(1);
  const setFilters = useFiltersStore(state => state.setFilters);

  const sliderminValue = useSharedValue(1);
  const slidermaxValue = useSharedValue(50);
  const progress = useSharedValue(25);
  const hasLocation = (!!latitude && !!longitude) || !!address;
  const isScrubbing = useSharedValue(false);

  useEffect(() => {
    if (!maxDistanceStoreValue) return;
    setDistanceValue(maxDistanceStoreValue);
  }, [maxDistanceStoreValue]);

  useAnimatedReaction(
    () => distanceValue,
    data => {
      if (data !== undefined && !Number.isNaN(data) && !isScrubbing.value) {
        progress.value = data;
      }
    },
    [distanceValue],
  );

  const handleSliderChange = useCallback((progressValue: number) => {
    const roundedValue = Math.round(progressValue);
    setDistanceValue(roundedValue);
  }, []);

  const filterRightText = () => {
    if (distanceValue) return `${distanceValue} km`;
    return '- km';
  };
  if (!hasLocation) {
    return null;
  }

  const handlePressChange = (value: number) => {
    setFilters({ maxDistance: value });
  };

  const handleIncrement = () => {
    const value = Math.min(distanceValue + 1, 50);
    setFilters({ maxDistance: value });
  };
  const handleDecrement = () => {
    const value = Math.max(distanceValue - 1, 1);
    setFilters({ maxDistance: value });
  };

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
          {!!distanceValue && (
            <String useFastText={false}>
              <String useFastText={false} font="primaryBold">
                {distanceValue}
              </String>{' '}
              km
            </String>
          )}
          {!distanceValue && <String>-</String>}

          <Icon name="add-circle-regular-colored" onPress={handleIncrement} pressEffectSize="xs" size="lg" />
        </BoxRowCenterBetween>
        <Box className="mb-4 flex-1">
          <Slider
            progress={progress}
            onValueChange={handleSliderChange}
            minimumValue={sliderminValue}
            maximumValue={slidermaxValue}
            isScrubbing={isScrubbing}
            renderBubble={() => null}
            onSlidingStart={() => {
              thumbScaleValue.value = 1.4;
            }}
            onSlidingComplete={() => {
              setFilters({ maxDistance: distanceValue });
              thumbScaleValue.value = 1;
            }}
            theme={{
              minimumTrackTintColor: COLORS.primary,
            }}
            thumbScaleValue={thumbScaleValue}
          />
        </Box>
        <BoxRow className="flex-row gap-2">
          {radiusDistances.map(type => (
            <Button
              key={type.id}
              title={`${type.value} km`}
              className="flex-1"
              size="xs"
              variant={type.value === distanceValue ? 'contained' : 'outlined'}
              onPress={() => handlePressChange(type.value)}
            />
          ))}
        </BoxRow>
      </Box>
    </AnimatedBox>
  );
}

export default memo(FilterDistanceRadius);
