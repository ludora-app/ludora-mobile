import COLORS from '@/constants/COLORS';
import { Box, Icon, String } from '@/components/chillUI';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { sportIcons } from '../constants/sport-icons';
import FieldCard from '../components/field-card.component';
import { fieldMock } from '../mocks/field.mock';
export default function FavoriteScreen() {
  return (
    <View className="mx-auto w-11/12">
      <ScrollView horizontal className="mb-4">
        {sportIcons.map(icon => (
          <Box key={icon.key} className="mx-4 my-2 flex-col items-center gap-2">
            <TouchableOpacity className="flex-col items-center gap-2">
              <Icon key={icon.key} variant={icon.key} color={COLORS.primary} />
              <Text>{icon.name}</Text>
            </TouchableOpacity>
          </Box>
        ))}
      </ScrollView>
      <String variant="dark" weight="bold" size="lg">
        Terrains favoris
      </String>
      <ScrollView>
        {fieldMock.map(field => (
          <FieldCard key={field.id} {...field} />
        ))}
      </ScrollView>
    </View>
  );
}
