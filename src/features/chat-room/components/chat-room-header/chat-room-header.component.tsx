import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { Avatar, Box, BoxGrow, Icon, String, Wrapper } from '@ludo/ui';

import { serialize } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { RootStackParamList } from '@/types/routes-params.types';

import { useChatRoomStore } from '../../store/chat-room.store';


const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
});


type LocalSearchParamsPrivateInfoChatRoom = RootStackParamList[typeof ROUTES.CHAT_ROOM.INFO_PRIVATE];
type LocalSearchParamsSessionInfoChatRoom = RootStackParamList[typeof ROUTES.CHAT_ROOM.INFO_SESSION];

export default function ChatRoomHeader() {
  const router = useRouter();
  const { chatRoomId, imageUrl, name, receiver, sessionUid, type } = useChatRoomStore(
    useShallow(state => ({
      chatRoomId: state.chatRoomId,
      imageUrl: state.chatRoomInfo?.imageUrl,
      name: state.chatRoomInfo?.name,
      receiver: state.chatRoomInfo?.receiver,
      sessionUid: state.chatRoomInfo?.sessionData?.sessionUid,
      type: state.chatRoomInfo?.type
    }))
  )
  const { firstname, lastname } = receiver || {}


  const chatRoomIsGroup = type !== "PRIVATE"

  const handleInfoPress = () => {
    if (chatRoomIsGroup) {
      const params: LocalSearchParamsSessionInfoChatRoom = {
        chatRoomId,
        imageUrl,
        name,
        sessionUid,
      }
      router.navigate({ params, pathname: ROUTES.CHAT_ROOM.INFO_SESSION });
    } else {
      const params: LocalSearchParamsPrivateInfoChatRoom = {
        chatRoomId,
        imageUrl,
        name,
        receiver: serialize(receiver),
      }
      router.navigate({
        params,
        pathname: ROUTES.CHAT_ROOM.INFO_PRIVATE_UID(undefined)
      });
    }
  }


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
          <String className="ml-2" colorVariant="muted" font="primaryBold" numberOfLines={2} ellipsizeMode="tail">
            {name}
          </String>
        </BoxGrow>
        <Icon name="info-circle-regular" size="lg" color={COLORS.muted} onPress={handleInfoPress} pressEffectSize="xs" className='ml-3' />
      </Wrapper>
    </Box>
  );
}
