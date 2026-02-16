import { useTranslate } from '@tolgee/react'
import { Avatar, BoxGrow, BoxRow, BoxRowCenterBetween, Button, IconButton, String } from '@ludo/ui'

import COLORS from '@/constants/COLORS'
import { truncateString } from '@/utils/string.utils'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { NotificationResponseData } from '@/api/generated/model'

import { formatNotificationTime } from '../../utils/time.utils'
import NotificationsListItemsContainer from './notifications-list-items-container.component'
import { useAcceptFriendRequest } from '../../queries/friend-requests/accept-friend-request.query'
import { useDeclineFriendRequest } from '../../queries/friend-requests/decline-friend-request.query copy'


interface NotificationListItemsFriendRequestProps {
  item: NotificationResponseData
}
type FriendsRequestData = {
  SenderFirstname: string,
  senderLastname: string,
  SenderImageUrl: string
  actionUrl: string,
  senderUid: string,
}

export default function NotificationListItemsFriendRequest(props: NotificationListItemsFriendRequestProps) {
  const { t } = useTranslate()
  const { trackError } = useAnalytics()
  const { item: notification } = props
  const { createdAt, data, isRead: isNotificationRead, type: notificationType, uid: notificationUid } = notification || {}

  const acceptedFriendRequest = false


  const notificationData = data as FriendsRequestData
  const { senderName, senderUid } = notificationData || {}

  const { isPending: isLoadingAcceptFriendRequest, mutateAsync: acceptFriendRequest } = useAcceptFriendRequest(senderUid)
  const { mutateAsync: declineFriendRequest } = useDeclineFriendRequest(senderUid)


  const handleAcceptFriendRequest = async () => {
    try {
      await acceptFriendRequest()
    } catch (error) {
      trackError({ error })
    }
  }

  const handleDeclineFriendRequest = async () => {
    try {
      if (acceptedFriendRequest) return
      await declineFriendRequest()
    } catch (error) {
      trackError({ error })
    }
  }

  return (
    <NotificationsListItemsContainer notificationUid={notificationUid} isRead={isNotificationRead} onPress={handleDeclineFriendRequest} isLoading={isLoadingAcceptFriendRequest}>
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
        {!acceptedFriendRequest &&
          <BoxRow className='gap-1'>
            <BoxGrow>
              <String variant="body-1" colorVariant="muted" numberOfLines={2} useFastText={false}>
                <String font="primaryBold" useFastText={false}>
                  {truncateString({ maxLength: 40, str: senderName })}{" "}
                </String>
                {t(`notifications.body_${notificationType}`)}
              </String>
            </BoxGrow>
            <Button title={t('common.accept')} fit size='xs' onPress={handleAcceptFriendRequest} isLoading={isLoadingAcceptFriendRequest} />
          </BoxRow>}
        {acceptedFriendRequest &&
          <BoxRow className='gap-1'>
            <BoxGrow>
              <String variant="body-1" colorVariant="muted" numberOfLines={2} useFastText={false}>
                {t(`notifications.body_accepted_${notificationType}`)}{' '}
                <String font="primaryBold" useFastText={false}>
                  {truncateString({ maxLength: 40, str: senderName })}{" "}
                </String>
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
          </BoxRow>}
      </BoxGrow>

    </NotificationsListItemsContainer >
  )
}
