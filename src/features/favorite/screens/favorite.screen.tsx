import COLORS from '@/constants/COLORS';
import { Box, Icon } from '@/components/chillUI';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { sportIcons } from '../constants/sport-icons';
import FieldCard from '../components/field-card.component';
import { fieldMock } from '../mocks/field.mock';
export default function FavoriteScreen() {
  return (
    <View className="bg-white">
      <ScrollView horizontal className="mb-4">
        {sportIcons.map(icon => (
          <Box key={icon.key} className="m-2 flex-col items-center gap-2">
            <TouchableOpacity className="flex-col items-center gap-2">
              <Icon key={icon.key} variant={icon.key} color={COLORS.primary} />
              <Text>{icon.name}</Text>
            </TouchableOpacity>
          </Box>
        ))}
      </ScrollView>
      {fieldMock.map(field => (
        <FieldCard key={field.id} {...field} />
      ))}
    </View>
  );
}
