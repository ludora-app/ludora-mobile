import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import { Avatar, BoxGrow, BoxRow, BoxRowCenterBetween, Button, String } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'
import { truncateString } from '@/utils/string.utils'
import { NotificationResponseData, SessionInvitationData } from '@/api/generated/model'

import { formatNotificationTime } from '../../utils/time.utils'
import NotificationsListItemsContainer from './notifications-list-items-container.component'


interface NotificationListItemsSessionInvitationProps {
  item: NotificationResponseData
}

export default function NotificationListItemsSessionInvitation(props: NotificationListItemsSessionInvitationProps) {
  const router = useRouter()
  const { t } = useTranslate()
  const { item: notification } = props
  const { createdAt, isRead: isNotificationRead, metadata, type: notificationType, uid: notificationUid } = notification || {}


  const notificationData = metadata as SessionInvitationData
  const { senderAvatar, senderFirstname, senderLastname, senderName, sessionUid } = notificationData || {}

  const handleSeeSession = () => {
    router.navigate(ROUTES.SESSION.INDEX_UID(sessionUid))
  }

  return (
    <NotificationsListItemsContainer notificationUid={notificationUid} isRead={isNotificationRead}>
      <Avatar
        data={{
          firstname: senderFirstname,
          imageUrl: senderAvatar ? { uri: senderAvatar } : undefined,
          lastname: senderLastname
        }}
      />
      <BoxGrow className='gap-0.5'>
        <BoxRowCenterBetween>
          <String
            font="primaryBold"
            variant="body-1"
          >
            {t(`notifications.title_${notificationType}`)}
          </String>
          <String variant="body-xs" colorVariant="muted">
            {formatNotificationTime(createdAt, t)}
          </String>
        </BoxRowCenterBetween>
        <BoxRow className='gap-1'>
          <BoxGrow>
            <String variant="body-sm" colorVariant="muted" numberOfLines={2} useFastText={false}>
              <String font="primaryBold" useFastText={false}>
                {truncateString({ maxLength: 40, str: senderName })}{" "}
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
