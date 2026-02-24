import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import { Avatar, BoxGrow, BoxRow, BoxRowCenterBetween, IconButton, String } from '@ludo/ui'

import COLORS from '@/constants/COLORS'
import { serialize } from '@/utils/json.utils'
import ROUTES from '@/constants/routes.constants'
import { truncateString } from '@/utils/string.utils'
import { RootStackParamList } from '@/types/routes-params.types'
import { FindOneConversationResponseDataType, FriendRequestData, NotificationResponseData } from '@/api/generated/model'

import { formatNotificationTime } from '../../utils/time.utils'
import NotificationsListItemsContainer from './notifications-list-items-container.component'


interface NotificationListItemsFriendAcceptedProps {
  item: NotificationResponseData
}

type LocalSearchParamsChatRoom = RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX];
export default function NotificationListItemsFriendAccepted(props: NotificationListItemsFriendAcceptedProps) {
  const router = useRouter()
  const { t } = useTranslate()
  const { item: notification } = props
  const { createdAt, isRead: isNotificationRead, metadata, type: notificationType, uid: notificationUid } = notification || {}


  const notificationData = metadata as FriendRequestData
  const { senderAvatar, senderFirstname, senderLastname, senderName, senderUid } = notificationData || {}


  const handleOnPressChat = () => {
    const params: LocalSearchParamsChatRoom = {
      imageUrl: senderAvatar,
      name: senderName,
      receiver: serialize({
        firstname: senderFirstname,
        lastname: senderLastname,
        userUid: senderUid,
      }),
      type: FindOneConversationResponseDataType.PRIVATE,
      userUid: senderUid,
    };
    router.push({ params, pathname: ROUTES.CHAT_ROOM.INDEX_UID(undefined) })
  }




  return (
    <NotificationsListItemsContainer notificationUid={notificationUid} isRead={isNotificationRead} >
      <Avatar
        data={{
          firstname: senderFirstname,
          imageUrl: senderAvatar,
          lastname: senderLastname
        }}
      />
      <BoxGrow className='gap-0.5'>
        <BoxRowCenterBetween>
          <String
            font="primaryBold"
            variant="body-2"
          >
            {t(`notifications.title_${notificationType}`)}
          </String>
          <String variant="body-xs" colorVariant="muted">
            {formatNotificationTime(createdAt, t)}
          </String>
        </BoxRowCenterBetween>
        <BoxRow className='gap-1'>
          <BoxGrow>
            <String colorVariant="muted" numberOfLines={2} useFastText={false}>
              <String font="primaryBold" useFastText={false}>
                {truncateString({ maxLength: 40, str: senderName })}{" "}
              </String>
              {t(`notifications.body_${notificationType}`)}
            </String>
          </BoxGrow>
          <IconButton
            iconName="chatbot-regular"
            variant="outlined"
            iconColor={COLORS.primary}
            colorVariant="primary"
            rounded="circle"
            size="xs"
            onPress={handleOnPressChat}
          />
        </BoxRow>
      </BoxGrow>

    </NotificationsListItemsContainer >
  )
}
