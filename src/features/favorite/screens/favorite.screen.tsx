import React from 'react';
import { Box, String } from '@chillUI';
import { FlatList } from 'react-native';
import SportFilters from '@/components/ui/sport-filters/sport-filters.component';

import fieldsMock from '../mocks/fields.mock';
import FieldCard from '../components/field-card.component';

export default function FavoriteScreen() {
  return (
    <Box className="mx-auto w-11/12">
      <SportFilters />
      <String variant="dark" weight="bold" size="lg">
        Terrains favoris
      </String>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FlatList data={fieldsMock} renderItem={({ item }) => <FieldCard key={item.id} {...item} />} />
    </Box>
  );
}
