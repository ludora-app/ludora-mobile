import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { ImageSource } from 'expo-image';
import { StrictOmit } from '@chillui/ui';
import { StyleSheet } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { Avatar, Box, BoxGrow, Icon, String, Wrapper } from '@ludo/ui';

import { serialize } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { getSportPlaceHolder } from '@/utils/sports.utils';
import { RootStackParamList } from '@/types/routes-params.types';
import { SessionCollectionItemDtoSport } from '@/api/generated/model';

import { useChatRoomStore } from '../../store/chat-room.store';


const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
});


type LocalSearchParamsPrivateInfoChatRoom = RootStackParamList[typeof ROUTES.CHAT_ROOM.INFO_PRIVATE];
type LocalSearchParamsSessionInfoChatRoom = RootStackParamList[typeof ROUTES.CHAT_ROOM.INFO_SESSION];
const BLUR_INTENSITY = 70;

export default function ChatRoomHeader() {
  const router = useRouter();
  const { top } = useSafeArea()
  const { chatRoomId, imageUrl, name, receiver, sessionSport, sessionUid, type } = useChatRoomStore(
    useShallow(state => ({
      chatRoomId: state.chatRoomId,
      imageUrl: state.chatRoomInfo?.imageUrl,
      name: state.chatRoomInfo?.name,
      receiver: state.chatRoomInfo?.receiver,
      sessionSport: state.chatRoomInfo?.sessionData?.sport,
      sessionUid: state.chatRoomInfo?.sessionData?.sessionUid,
      type: state.chatRoomInfo?.type
    }))
  )
  const { firstname, lastname } = receiver || {}


  const chatRoomIsGroup = type !== "PRIVATE"

  const getAvatarImage = (): ImageSource | undefined => {
    if (imageUrl) return { uri: imageUrl };
    if (chatRoomIsGroup && sessionSport) return getSportPlaceHolder(sessionSport as SessionCollectionItemDtoSport) as ImageSource;
    return undefined;
  };
  const avatarImage = getAvatarImage();

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
      const params: StrictOmit<LocalSearchParamsPrivateInfoChatRoom, "chatRoomId"> = {
        imageUrl,
        name,
        receiver: serialize(receiver),
      }
      router.navigate({
        params,
        pathname: ROUTES.CHAT_ROOM.INFO_PRIVATE_UID(chatRoomId)
      });
    }
  }


  return (
    <BlurView
      intensity={BLUR_INTENSITY}
      experimentalBlurMethod="dimezisBlurView"
    >
      <Box style={[styles.shadow, { paddingTop: top }]}>
        <Wrapper className="flex-row items-center justify-between py-2">
          <BoxGrow className="flex-row items-center gap-1">
            <Icon
              name="arrow-left-regular"
              size="lg"
              color={COLORS.muted}
              onPress={() => {
                router.back();
              }}
              pressEffectSize="xs"
            />
            {
              chatRoomIsGroup ? (
                <Avatar
                  data={{
                    firstname: name,
                    imageUrl: avatarImage,
                  }}
                />
              ) : (
                <Avatar
                  data={{
                    firstname,
                    imageUrl: avatarImage,
                    lastname,
                  }}
                />
              )
            }
            <String className="ml-2" colorVariant="muted" font="primaryBold" truncate>
              {name}
            </String>
          </BoxGrow>
          <Icon name="info-circle-regular" size="lg" color={COLORS.muted} onPress={handleInfoPress} pressEffectSize="xs" className='ml-3' />
        </Wrapper>
      </Box></BlurView>
  );
}
