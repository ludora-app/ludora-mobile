import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box, Button, Icon, String, Wrapper } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { RootStackParamList } from '@/types/routes-params.types';
import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

import { SessionJoinedLocalParams } from '../types/session.types';

type ChatRoomLocalParams = RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX]

export default function SessionJoinedScreen() {
  const router = useRouter();
  const { conversationUid, imageUrl, name, type } = useLocalSearchParams<SessionJoinedLocalParams>();
  const { t } = useTranslate();

  const handleConversationPress = () => {
    const params: ChatRoomLocalParams = {
      chatRoomId: conversationUid,
      imageUrl,
      name,
      type,
    }
    router.replace({
      params,
      pathname: ROUTES.CHAT_ROOM.INDEX_UID(conversationUid),
    });
  }

  return (
    <>
      <HeaderGoBack className="absolute left-4" hasTopSafeArea />
      <Wrapper fill className="items-center justify-center gap-8">
        <Box className="items-center gap-4">
          <Icon name="ludo-fight" className="size-36" />
          <String variant="title-1" font="primaryBold">
            {t('session.session-joined.title')}
          </String>
          <String className="text-center">{t('session.session-joined.description')}</String>
        </Box>
        <Box className="w-full gap-4">
          <Button title={t('session.session-joined.exchange_with_players')} onPress={handleConversationPress} />
          <Button title={t('session.session-joined.back_to_home')} variant="outlined" className="bg-white" onPress={router.back} />
        </Box>
      </Wrapper>
    </>
  );
}
