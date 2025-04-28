import COLORS from '@/constants/COLORS';
import React, { useState } from 'react';
import { Box, Icon, String } from '@chillUI';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native';

import fieldsMock from '../mocks/fields.mock';
import { sportIcons } from '../constants/sport-icons';
import FieldCard from '../components/field-card.component';

export default function FavoriteScreen() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <Box className="mx-auto w-11/12">
      <ScrollView horizontal className="mb-4">
        {sportIcons.map(icon => (
          <Box key={icon.key} className="mx-4 my-2 flex-col items-center gap-2">
            <TouchableOpacity className="flex-col items-center gap-2" onPress={() => setSelectedIcon(icon.key)}>
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
      <String variant="dark" weight="bold" size="lg">
        Terrains favoris
      </String>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FlatList data={fieldsMock} renderItem={({ item }) => <FieldCard key={item.id} {...item} />} />
    </Box>
  );
}
