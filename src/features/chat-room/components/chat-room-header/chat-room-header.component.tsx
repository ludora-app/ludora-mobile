import { StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Avatar, Box, BoxGrow, Icon, String, Wrapper } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { RootStackParamList } from '@/types/routes-params.types';

type ChatRoomLocalSearch = RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX];

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
});

export default function ChatRoomHeader() {
  const { imageUrl, name } = useLocalSearchParams<ChatRoomLocalSearch>();
  const router = useRouter();

  return (
    <Box style={styles.shadow} className="z-50">
      <Wrapper className="relative flex-row items-center justify-between py-2">
        <BoxGrow className="flex-row items-center gap-1">
          <Icon name="arrow-left-regular" size="lg" color="#FFF" onPress={router.back} pressEffectSize="xs" />
          <Avatar
            data={{
              firstname: name,
              imageUrl,
            }}
          />
          <String className="ml-2" colorVariant="white" font="primaryBold">
            {name}
          </String>
        </BoxGrow>
        <Icon name="info-circle-regular" size="lg" color="#FFF" />
      </Wrapper>
    </Box>
  );
}
