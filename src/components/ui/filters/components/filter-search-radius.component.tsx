import { useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, BoxRowCenterBetween, Button, Icon, Slider, String } from '@ludo/ui';

import { useFiltersStore } from '../store/filters.store';

const radiusDistances = [
  {
    id: 1,
    labal: '5 km',
    value: '5',
  },
  {
    id: 2,
    labal: '10 km',
    value: '10',
  },
  {
    id: 3,
    labal: '20 km',
    value: '20',
  },
  {
    id: 4,
    labal: '50 km',
    value: '50',
  },
];

export default function FilterSearchRadius() {
  const [localMaxDistance, setLocalMaxDistance] = useState(10);
  const { t } = useTranslate();
  const maxDistance = useFiltersStore(state => state.filters.maxDistance);
  const setFilters = useFiltersStore(state => state.setFilters);

  const handleIncrement = () => {
    setFilters({ maxDistance: Math.min(maxDistance + 5, 50) });
  };

  const handleDecrement = () => {
    setFilters({ maxDistance: Math.max(maxDistance - 5, 1) });
  };

  const handleSliderChange = (values: number[]) => {
    const value = Math.round(values[0]);
    setLocalMaxDistance(value);
    setFilters({ maxDistance: value });
  };

  return (
    <Box className="gap-3 rounded-xl border border-ring bg-white p-3 py-2">
      {/* Header Toujours Visible */}
      <Box className="flex-row justify-between">
        <Box className="flex-row items-center gap-2">
          <Icon name="pin-location-regular" color="#666" />
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('filters.search_radius_title')}
          </String>
        </Box>
        <String variant="body-sm" font="primaryBold" />
      </Box>

      <Box>
        <BoxRowCenterBetween className="mb-2">
          <Icon name="minus-circle-regular-colored" onPress={handleDecrement} pressEffectSize="xs" size="lg" />
          <String>{maxDistance}km</String>

          <Icon name="add-circle-regular-colored" onPress={handleIncrement} pressEffectSize="xs" size="lg" />
        </BoxRowCenterBetween>
        <Box className="mb-2">
          <Slider
            value={localMaxDistance}
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
              variant={parseInt(type.value, 10) === maxDistance ? 'contained' : 'outlined'}
              onPress={() => setFilters({ maxDistance: parseInt(type.value, 10) })}
            />
          ))}
        </BoxRow>
      </Box>
    </Box>
  );
}
