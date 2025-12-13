import { useState } from 'react';
import COLORS from '@/constants/COLORS';
import { ScrollView, TouchableOpacity } from 'react-native';

import { sportIcons } from './sport-icons';
import { Icon, String, Box } from '@chillui/ui';

/**
 * @description Component to display the sport filters
 */
export default function SportFilters() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <Box>
      <ScrollView horizontal className="mb-4">
        {sportIcons.map(icon => (
          <Box key={icon.key} className="mx-4 my-2 flex-col items-center gap-2">
            <TouchableOpacity
              className="flex-col items-center gap-2"
              onPress={() => setSelectedIcon(prevSelectedIcon => (prevSelectedIcon === icon.key ? null : icon.key))}
            >
              <Icon
                key={icon.key}
                variant={icon.key}
                color={selectedIcon === icon.key ? COLORS.primary : COLORS.black}
              />
              <String variant={selectedIcon === icon.key ? 'primary' : 'dark'} weight="semiBold" size="xs">
                {icon.name}
              </String>
            </TouchableOpacity>
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
}
