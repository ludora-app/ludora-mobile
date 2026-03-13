import { useRouter } from 'expo-router'
import { Pressable } from 'react-native'
import { Avatar, Box, BoxRow, BoxRowCenterBetween, IconButton, String } from '@ludo/ui'

import { serialize } from '@/utils/json.utils'
import ROUTES from '@/constants/routes.constants'
import COLORS from '@/constants/colors.contstants'
import { RootStackParamList } from '@/types/routes-params.types'
import { FindOneConversationResponseDataType, FriendResponseData } from '@/api/generated/model'

type ChatRoomLocalSearchParams = RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX]

interface SettingsFriendsListItemProps {
  item: FriendResponseData
}

export default function SettingsFriendsListItem({ item }: SettingsFriendsListItemProps) {
  const router = useRouter()
  const { avatarUrl, firstname, friendUid, lastname } = item

  const handlePress = () => {
    router.navigate(ROUTES.PROFIL.INDEX_UID(friendUid))
  }

  const handlePressChatIcon = () => {
    const params: ChatRoomLocalSearchParams = {
      imageUrl: avatarUrl || '',
      name: `${firstname} ${lastname}`,
      receiver: serialize({
        firstname,
        lastname,
        userUid: friendUid,
      }),
      type: FindOneConversationResponseDataType.PRIVATE,
      userUid: friendUid,
    }
    router.navigate({ params, pathname: ROUTES.CHAT_ROOM.INDEX_UID(undefined) })
  }

  return (
    <Pressable onPress={handlePress}>
      <BoxRowCenterBetween className="border-primary bg-primary/10 gap-3 rounded-2xl border px-4 py-3">
        <BoxRow className="flex-1 items-center gap-3">
          <Avatar
            data={{
              firstname,
              imageUrl: avatarUrl ? { uri: avatarUrl } : undefined,
              lastname,
            }}
          />
          <Box className="flex-1">
            <String useFastText={false} truncate>
              {firstname} {lastname}
            </String>
          </Box>
        </BoxRow>
        <IconButton
          iconName="chatbot-regular"
          variant="outlined"
          colorVariant="primary"
          iconColor={COLORS.primary}
          rounded="circle"
          size="xs"
          onPress={handlePressChatIcon}
        />
      </BoxRowCenterBetween>
    </Pressable>
  )
}
