import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import { Avatar, BoxGrow, BoxRow, BoxRowCenterBetween, Button, String } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'
import { truncateString } from '@/utils/string.utils'
import { NotificationResponseData } from '@/api/generated/model'

import { formatNotificationTime } from '../../utils/time.utils'
import NotificationsListItemsContainer from './notifications-list-items-container.component'


interface NotificationListItemsSessionInvitationProps {
  item: NotificationResponseData
}
type FriendsRequestData = {
  SenderFirstname: string,
  senderLastname: string,
  SenderImageUrl: string
  actionUrl: string,
  senderUid: string,
}

export default function NotificationListItemsSessionInvitation(props: NotificationListItemsSessionInvitationProps) {
  const router = useRouter()
  const { t } = useTranslate()
  const { item: notification } = props
  const { createdAt, data, isRead: isNotificationRead, type: notificationType, uid: notificationUid } = notification || {}


  const notificationData = data as FriendsRequestData
  const { inviterAvatar, inviterName, sessionUid } = notificationData || {}

  const handleSeeSession = () => {
    router.push(ROUTES.SESSION.INDEX_UID(sessionUid))
  }

  return (
    <NotificationsListItemsContainer notificationUid={notificationUid} isRead={isNotificationRead}>
      <Avatar
        data={{
          firstname: inviterName,
          imageUrl: inviterAvatar
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
            <String variant="body-1" colorVariant="muted" numberOfLines={2} useFastText={false}>
              <String font="primaryBold" useFastText={false}>
                {truncateString({ maxLength: 40, str: inviterName })}{" "}
              </String>
              {t(`notifications.body_${notificationType}`)}
            </String>
          </BoxGrow>
          <Button title={t('common.see')} fit size='xs' onPress={handleSeeSession} />
        </BoxRow>
      </BoxGrow>
    </NotificationsListItemsContainer >
  )
}
