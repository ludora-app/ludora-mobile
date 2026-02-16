import { useTranslate } from '@tolgee/react'
import { Avatar, BoxGrow, BoxRow, BoxRowCenterBetween, IconButton, String } from '@ludo/ui'

import COLORS from '@/constants/COLORS'
import { truncateString } from '@/utils/string.utils'
import { NotificationResponseData } from '@/api/generated/model'

import { formatNotificationTime } from '../../utils/time.utils'
import NotificationsListItemsContainer from './notifications-list-items-container.component'


interface NotificationListItemsFriendAcceptedProps {
  item: NotificationResponseData
}
type FriendsRequestData = {
  SenderFirstname: string,
  senderLastname: string,
  SenderImageUrl: string
  actionUrl: string,
  senderUid: string,
}

export default function NotificationListItemsFriendAccepted(props: NotificationListItemsFriendAcceptedProps) {
  const { t } = useTranslate()
  const { item: notification } = props
  const { createdAt, data, isRead: isNotificationRead, type: notificationType, uid: notificationUid } = notification || {}

  const notificationData = data as FriendsRequestData
  const { senderName } = notificationData || {}


  return (
    <NotificationsListItemsContainer notificationUid={notificationUid} isRead={isNotificationRead} >
      <Avatar
        data={{
          firstname: senderName,
          imageUrl: ""
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
          />
        </BoxRow>
      </BoxGrow>

    </NotificationsListItemsContainer >
  )
}
