import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { Avatar, Box, BoxGrow, Icon, String, Wrapper } from '@ludo/ui';

import COLORS from '@/constants/COLORS';

import { useChatRoomStore } from '../../store/chat-room.store';


const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
});

export default function ChatRoomHeader() {
  const router = useRouter();
  const { imageUrl, name, receiver, type } = useChatRoomStore(
    useShallow(state => ({
      imageUrl: state.chatRoomInfo?.imageUrl,
      name: state.chatRoomInfo?.name,
      receiver: state.chatRoomInfo?.receiver,
      type: state.chatRoomInfo?.type
    }))
  )
  const { firstname, lastname } = receiver || {}


  const chatRoomIsGroup = type !== "PRIVATE"


  return (
    <Box style={styles.shadow} className="relative z-50 bg-white">
      <Wrapper className="relative flex-row items-center justify-between py-2">
        <BoxGrow className="flex-row items-center gap-1">
          <Icon name="arrow-left-regular" size="lg" color={COLORS.muted} onPress={router.back} pressEffectSize="xs" />
          {
            chatRoomIsGroup ? (
              <Avatar
                data={{
                  firstname: name,
                  imageUrl,
                }}
              />
            ) : (
              <Avatar
                data={{
                  firstname,
                  imageUrl,
                  lastname,
                }}
              />
            )
          }
          <String className="ml-2" colorVariant="muted" font="primaryBold">
            {name}
          </String>
        </BoxGrow>
        <Icon name="info-circle-regular" size="lg" color={COLORS.muted} />
      </Wrapper>
    </Box>
  );
}
