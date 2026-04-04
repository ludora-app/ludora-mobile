import { useRouter } from 'expo-router';
import { ImageSource } from 'expo-image';
import { StrictOmit } from '@chillui/ui';
import { StyleSheet } from 'react-native';
import { GlassView } from 'expo-glass-effect';
import { useShallow } from 'zustand/react/shallow';
import { Avatar, Box, BoxGrow, Icon, String, Wrapper } from '@ludo/ui';

import { serialize } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { getSportPlaceHolder } from '@/utils/sports.utils';
import { RootStackParamList } from '@/types/routes-params.types';
import { SessionCollectionItemDtoSport } from '@/api/generated/model';

import { useChatRoomStore } from '../../context/chat-room-store-context';
import { useChatRoomSessionTeam } from '../../utils/chat-room-session-team.utils';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
});

type LocalSearchParamsPrivateInfoChatRoom = RootStackParamList[typeof ROUTES.CHAT_ROOM.INFO_PRIVATE];
type LocalSearchParamsSessionInfoChatRoom = RootStackParamList[typeof ROUTES.CHAT_ROOM.INFO_SESSION];

export default function ChatRoomHeader() {
  const router = useRouter();
  const { top } = useSafeArea();
  const { isTeamA } = useChatRoomSessionTeam();
  const { chatRoomId, imageUrl, name, receiver, sessionSport, sessionUid, type } = useChatRoomStore(
    useShallow(state => ({
      chatRoomId: state.chatRoomId,
      imageUrl: state.chatRoomInfo?.imageUrl,
      name: state.chatRoomInfo?.name,
      receiver: state.chatRoomInfo?.receiver,
      sessionSport: state.chatRoomInfo?.sessionData?.sport,
      sessionUid: state.chatRoomInfo?.sessionData?.sessionUid,
      type: state.chatRoomInfo?.type,
    })),
  );
  const { firstname, lastname } = receiver || {};

  const chatRoomIsGroup = type !== 'PRIVATE';

  const getAvatarImage = (): ImageSource | undefined => {
    if (imageUrl) return { uri: imageUrl };
    if (chatRoomIsGroup && sessionSport)
      return getSportPlaceHolder(sessionSport as SessionCollectionItemDtoSport) as ImageSource;
    return undefined;
  };
  const avatarImage = getAvatarImage();

  const handleInfoPress = () => {
    if (chatRoomIsGroup) {
      const params: StrictOmit<LocalSearchParamsSessionInfoChatRoom, 'chatRoomId'> = {
        imageUrl: imageUrl ?? '',
        name: name ?? '',
        sessionUid: sessionUid ?? '',
      };

      router.navigate({ params, pathname: ROUTES.CHAT_ROOM.INFO_SESSION_UID(chatRoomId ?? undefined) });
    } else {
      const params: StrictOmit<LocalSearchParamsPrivateInfoChatRoom, 'chatRoomId'> = {
        imageUrl: imageUrl ?? '',
        name: name ?? '',
        receiver: serialize(receiver),
      };
      router.navigate({
        params,
        pathname: ROUTES.CHAT_ROOM.INFO_PRIVATE_UID(chatRoomId ?? undefined),
      });
    }
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.dismissTo({ pathname: ROUTES.HOME.INDEX });
    }
  };

  return (
    <Box style={[styles.shadow, { paddingTop: top }]}>
      <GlassView style={{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }} className="bg-white/80" />
      <Wrapper className="flex-row items-center justify-between py-2">
        <BoxGrow className="flex-row items-center gap-1">
          <Icon name="arrow-left-regular" size="lg" color={COLORS.muted} onPress={handleGoBack} pressEffectSize="xs" />
          {chatRoomIsGroup ? (
            <Avatar
              data={{
                firstname: name ?? '',
                imageUrl: avatarImage,
              }}
              colorVariant={isTeamA ? 'primary' : 'secondary'}
            />
          ) : (
            <Avatar
              data={{
                firstname: firstname ?? '',
                imageUrl: avatarImage,
                lastname,
              }}
            />
          )}
          <String className="ml-2" colorVariant="muted" font="primaryBold" truncate>
            {name}
          </String>
        </BoxGrow>
        <Icon
          name="info-circle-regular"
          size="lg"
          color={COLORS.muted}
          onPress={handleInfoPress}
          pressEffectSize="xs"
          className="ml-3"
        />
      </Wrapper>
    </Box>
  );
}
