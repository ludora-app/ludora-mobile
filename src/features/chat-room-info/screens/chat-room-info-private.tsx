import { useMemo } from 'react'
import { useTranslate } from '@tolgee/react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Avatar, Box, BoxCenter, BoxRow, Button, Image, ScreenLayout, ScrollView, String, Wrapper } from '@ludo/ui'

import { parse } from '@/utils/json.utils'
import ROUTES from '@/constants/routes.constants'
import COLORS from '@/constants/colors.contstants'
import { ReceiverDto } from '@/api/generated/model'
import { getSportImage } from '@/utils/sports.utils'
import { RootStackParamList } from '@/types/routes-params.types'
import { useGetUserDataById } from '@/features/profil/queries/get-user-data-by-id.query'

import ChatRoomInfoHeader from '../components/chat-room-info-header.component'

type ChatRoomInfoPrivateParams = RootStackParamList[typeof ROUTES.CHAT_ROOM.INFO_PRIVATE]

const LEVEL_COLORS: Record<number, string> = {
  1: '#4CAF50',
  2: '#FF9800',
  3: COLORS.primary,
}

export default function ChatRoomInfoPrivate() {
  const { t } = useTranslate()
  const router = useRouter()
  const params = useLocalSearchParams<ChatRoomInfoPrivateParams>()

  const { imageUrl, name, receiver } = params


  const receiverData: ReceiverDto | null = useMemo(() => {
    if (!receiver) return null
    try {
      return parse(receiver)
    } catch {
      return null
    }
  }, [receiver])

  const userUid = receiverData?.userUid

  const { data: userData } = useGetUserDataById(userUid ?? '')

  const { firstname: userFirstname, imageUrl: userImageUrl, lastname: userLastname, sportPreferences } = userData || {}

  const { firstname, lastname } = receiverData || userData || {}

  const displayName = name || [userFirstname, userLastname].filter(Boolean).join(' ')

  const avatarUrl = imageUrl || userImageUrl
  const hasSports = sportPreferences && sportPreferences.length > 0

  const handleViewProfile = () => {
    if (userUid) {
      router.navigate(ROUTES.PROFIL.INDEX_UID(userUid))
    }
  }



  return (
    <ScreenLayout>
      <ScrollView bounces={false}>
        <ChatRoomInfoHeader titleKey="chat.info_private_title" />
        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-6'>
          <BoxCenter className='gap-3'>
            <Avatar
              data={{
                firstname,
                imageUrl: avatarUrl,
                lastname,
              }}
              size="2xl"
              className='rounded-2xl'
            />
            <Box className='items-center gap-1'>
              <String variant="body-1" font="primaryBold" truncate>{displayName}</String>
            </Box>
            {hasSports ? (
              <Box className='gap-2'>
                <BoxRow className='flex-wrap gap-2'>
                  {sportPreferences!.map((pref) => (
                    <BoxRow
                      key={pref.uid}
                      className='items-center gap-1.5 rounded-full bg-white py-1.5 pl-2 pr-3'
                    >
                      <Image
                        source={getSportImage(pref.sport)}
                        className='size-5 rounded'
                      />
                      {pref.level != null ? (
                        <String
                          variant="body-xs"
                          font="primaryBold"
                          style={{ color: LEVEL_COLORS[pref.level] ?? COLORS.primary }}
                        >
                          {t(`common.user_level_${pref.level}`)}
                        </String>
                      ) : null}
                    </BoxRow>
                  ))}
                </BoxRow>
              </Box>
            ) : null}
            {userUid ? (
              <Button
                title={t('chat.info_view_profile', 'Voir profil')}
                size="sm"
                onPress={handleViewProfile}
                className='self-center'
              />
            ) : null}
          </BoxCenter>
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}
