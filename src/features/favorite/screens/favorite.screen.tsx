import React from 'react';
import { FlatList } from 'react-native';
import { String, Wrapper } from '@chillUI';
import SportFilters from '@/components/ui/sport-filters/sport-filters.component';

import fieldsMock from '../mocks/fields.mock';
import FieldCard from '../components/field-card.component';

export default function FavoriteScreen() {
  return (
    <Wrapper safeAreaView={false} py>
      <SportFilters />
      <String variant="dark" weight="bold" size="lg">
        Terrains favoris
      </String>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={fieldsMock}
        //  eslint-disable-next-line react/jsx-props-no-spreading
        renderItem={({ item }) => <FieldCard key={item.id} {...item} />}
      />
    </Wrapper>
  );
}
