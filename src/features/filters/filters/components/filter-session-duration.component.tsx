import { memo } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, BoxRowCenterBetween, Button, Icon, String } from '@ludo/ui';

import { useFiltersStore } from '../store/filters.store';

const sessionDuration = [
  {
    id: 'thirtyMinutes',
    value: '30',
  },
  {
    id: 'sixtyMinutes',
    value: '60',
  },
  {
    id: 'ninetyMinutes',
    value: '90',
  },
  {
    id: 'oneHundredTwentyMinutes',
    value: '120',
  },
];

function FilterSessionDuration() {
  const { t } = useTranslate();
  const sessionDurationStore = useFiltersStore(state => state.filters.sessionDuration);
  const setFilters = useFiltersStore(state => state.setFilters);

  const filterRightText = () => {
    if (sessionDurationStore) return `${sessionDurationStore} min`;
    return '- min';
  };

  const handleSetDuration = ({
    add,
    duration = '15',
    remove,
  }: {
    duration: string;
    add?: boolean;
    remove?: boolean;
  }) => {
    const isMax = parseInt(duration, 10) >= 240;
    const isMin = parseInt(duration, 10) <= 15;
    if (add && !isMax) {
      const newDuration = parseInt(duration, 10) + 15;
      setFilters({ sessionDuration: newDuration.toString() });
    }
    if (remove && !isMin) {
      const newDuration = parseInt(duration, 10) - 15;
      setFilters({ sessionDuration: newDuration.toString() });
    }
  };

  return (
    <Box className="gap-3 rounded-xl border border-ring bg-white p-3 py-2">
      {/* Header Toujours Visible */}
      <BoxRowCenterBetween>
        <BoxRow className="items-center gap-2">
          <Icon name="time-tracking" color="#666" />
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('filters.session_duration_title')}
          </String>
        </BoxRow>
        <String variant="body-sm" font="primaryBold">
          {filterRightText()}
        </String>
      </BoxRowCenterBetween>

      <Box>
        <BoxRowCenterBetween className="mb-2">
          <Icon
            name="minus-circle-regular-colored"
            onPress={() => handleSetDuration({ duration: sessionDurationStore, remove: true })}
            pressEffectSize="xs"
            size="lg"
          />

          {sessionDurationStore && (
            <String font="primaryBold" useFastText={false}>
              {sessionDurationStore} <String useFastText={false}>min</String>
            </String>
          )}
          {!sessionDurationStore && <String colorVariant="muted">-</String>}

          <Icon
            name="add-circle-regular-colored"
            onPress={() => handleSetDuration({ add: true, duration: sessionDurationStore })}
            pressEffectSize="xs"
            size="lg"
          />
        </BoxRowCenterBetween>
        <BoxRow className="flex-row gap-2">
          {sessionDuration.map(type => (
            <Button
              key={type.id}
              title={`${type.value} min`}
              className="flex-1"
              size="xs"
              variant={type.value === sessionDurationStore ? 'contained' : 'outlined'}
              onPress={() => setFilters({ sessionDuration: type.value })}
            />
          ))}
        </BoxRow>
      </Box>
    </Box>
  );
}

export default memo(FilterSessionDuration);
