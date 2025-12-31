import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Box, Button, String } from '@ludo/ui';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useFiltersStore } from '../store/filters.store';

const fieldType = [
  {
    id: 'ALL',
    value: 'ALL',
  },
  {
    id: 'PRIVATE',
    value: 'PRIVATE',
  },
  {
    id: 'PUBLIC',
    value: 'PUBLIC',
  },
];

export default function FilterFieldType() {
  const { t } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);
  const fieldTypeStore = useFiltersStore(state => state.filters.fieldType);
  const setFilters = useFiltersStore(state => state.setFilters);

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(isOpen ? 40 : 0, { duration: 300 }),
    marginTop: withTiming(isOpen ? 12 : 0, { duration: 300 }),
    opacity: withTiming(isOpen ? 1 : 0, { duration: 250 }),
    overflow: 'hidden',
  }));

  return (
    <Pressable onPress={() => setIsOpen(!isOpen)} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
      <Box className="gap-2 rounded-xl border border-ring bg-white p-3 py-4">
        {/* Header Toujours Visible */}
        <Box className="flex-row justify-between">
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('filters.field_type_title')}
          </String>
          <String variant="body-sm" font="primaryBold">
            {isOpen ? t('common.close') : t(`filters.field_type_${fieldTypeStore}`)}
          </String>
        </Box>

        {/* Box Animée */}
        {isOpen && (
          <Animated.View style={animatedStyle}>
            <Box className="flex-row gap-2">
              {fieldType.map(type => (
                <Button
                  key={type.id}
                  title={t(`filters.field_type_${type.value}`)}
                  className="flex-1"
                  size="xs"
                  variant={type.value === fieldTypeStore ? 'contained' : 'outlined'}
                  onPress={() => setFilters({ fieldType: type.value })}
                />
              ))}
            </Box>
          </Animated.View>
        )}
      </Box>
    </Pressable>
  );
}
