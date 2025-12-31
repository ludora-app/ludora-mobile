import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Box, BoxRow, BoxRowCenterBetween, Button, Icon, Link, String } from '@ludo/ui';

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

export default function FilterSessionDate() {
  const { t } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);
  const sessionDurationStore = useFiltersStore(state => state.filters.sessionDuration);
  const setFilters = useFiltersStore(state => state.setFilters);

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(isOpen ? 77 : 0, { duration: 300 }),
    marginTop: withTiming(isOpen ? 12 : 0, { duration: 300 }),
    opacity: withTiming(isOpen ? 1 : 0, { duration: 250 }),
    overflow: 'hidden',
  }));

  const filterRightText = () => {
    if (isOpen) return t('common.close');
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
    <Link href="/filters/filters-calendar" asChild>
      <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
        <Box className="gap-2 rounded-xl border border-ring bg-white p-3 py-4">
          {/* Header Toujours Visible */}
          <Box className="flex-row justify-between">
            <String variant="body-sm" font="primaryBold" colorVariant="muted">
              {t('filters.session_date_title')}
            </String>
            <String variant="body-sm" font="primaryBold">
              {filterRightText()}
            </String>
          </Box>

          {/* Box Animée */}
          {isOpen && (
            <Animated.View style={animatedStyle}>
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
            </Animated.View>
          )}
        </Box>
      </Pressable>
    </Link>
  );
}
