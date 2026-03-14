import { useMemo } from 'react'
import { ImageSource } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { Avatar, BoxCenter, BoxGrow, ScreenLayout, ScrollView, Separator, String, Wrapper } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'
import { useSafeArea } from '@/hooks/safe-area.hook'
import { getSportPlaceHolder } from '@/utils/sports.utils'
import Loading from '@/components/ui/loading/loading.component'
import { RootStackParamList } from '@/types/routes-params.types'
import { SessionCollectionItemDtoSport } from '@/api/generated/model'
import { useGetSessionById } from '@/queries/get-session-by-id.query'

import ChatRoomInfoHeader from '../components/chat-room-info-header.component'
import ChatRoomInfoSessionTeams from '../components/chat-room-info-session-teams.component'
import ChatRoomInfoSessionActions from '../components/chat-room-info-session-actions.component'
import ChatRoomInfoSessionDetails from '../components/chat-room-info-session-details.component'

type ChatRoomInfoSessionParams = RootStackParamList[typeof ROUTES.CHAT_ROOM.INFO_SESSION]

export default function ChatRoomInfoSession() {
  const { bottom } = useSafeArea()
  const params = useLocalSearchParams<ChatRoomInfoSessionParams>()

  const { imageUrl, name, sessionUid: sessionUidParam } = params || {}

  const sessionUid = sessionUidParam

  const { data: sessionData, isLoading: isLoadingSession } = useGetSessionById(sessionUid)

  const avatarImage = useMemo((): ImageSource | undefined => {
    if (imageUrl) return { uri: imageUrl };
    if (sessionData?.sport) return getSportPlaceHolder(sessionData.sport as SessionCollectionItemDtoSport) as ImageSource;
    return undefined;
  }, [imageUrl, sessionData?.sport]);

  if (isLoadingSession && sessionUid) {
    return (
      <ScreenLayout>
        <ChatRoomInfoHeader titleKey="chat.info_session_title" />
        <BoxGrow className='bg-background rounded-t-xl z-50 pt-6 gap-5'>
          <Loading />
        </BoxGrow>
      </ScreenLayout>
    )
  }

  return (
    <ScreenLayout>

      <ScrollView bounces={false} contentContainerClassName='grow'>
        <ChatRoomInfoHeader titleKey="chat.info_session_title" />

        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-5' style={{ paddingBottom: bottom }}>
          <BoxCenter className='gap-2'>
            <Avatar
              data={{
                firstname: name,
                imageUrl: avatarImage,
              }}
              size="2xl"
              className='rounded-2xl'
            />
            <String variant="body-1" font="primaryBold" className='text-center'>{name}</String>
          </BoxCenter>

          {sessionData && (
            <>
              <Separator />
              <ChatRoomInfoSessionDetails session={sessionData} />
            </>
          )}

          {sessionData && (
            <>
              <Separator />
              <ChatRoomInfoSessionTeams session={sessionData} sessionUid={sessionUid!} />
            </>
          )}

          {sessionData && (
            <>
              <Separator />
              <ChatRoomInfoSessionActions
                sessionUid={sessionUid!}
                session={sessionData}
              />
            </>
          )}
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}

