import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import { Avatar, BoxGrow, BoxRow, BoxRowCenterBetween, Button, IconButton, String } from '@ludo/ui'

import COLORS from '@/constants/colors.contstants'
import { serialize } from '@/utils/json.utils'
import ROUTES from '@/constants/routes.constants'
import { truncateString } from '@/utils/string.utils'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { RootStackParamList } from '@/types/routes-params.types'
import { FindOneConversationResponseDataType, FriendRequestData, NotificationResponseData } from '@/api/generated/model'

import { formatNotificationTime } from '../../utils/time.utils'
import NotificationsListItemsContainer from './notifications-list-items-container.component'
import { useAcceptFriendRequest } from '../../queries/friend-requests/accept-friend-request.query'
import { useDeclineFriendRequest } from '../../queries/friend-requests/decline-friend-request.query copy'


interface NotificationListItemsFriendRequestProps {
  item: NotificationResponseData
}

type LocalSearchParamsChatRoom = RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX];

export default function NotificationListItemsFriendRequest(props: NotificationListItemsFriendRequestProps) {
  const router = useRouter()
  const { t } = useTranslate()
  const { trackError } = useAnalytics()
  const { item: notification } = props
  const { createdAt, isRead: isNotificationRead, metadata, type: notificationType, uid: notificationUid } = notification || {}


  const notificationData = metadata as FriendRequestData
  const { invitationStatus, senderAvatar, senderFirstname, senderLastname, senderName, senderUid } = notificationData || {}

  const isAcceptedFriendRequest = invitationStatus === "ACCEPTED"

  const { isPending: isLoadingAcceptFriendRequest, mutateAsync: acceptFriendRequest } = useAcceptFriendRequest(senderUid)
  const { isPending: isLoadingDeclineFriendRequest, mutateAsync: declineFriendRequest } = useDeclineFriendRequest(senderUid)


  const handleAcceptFriendRequest = async () => {
    try {
      await acceptFriendRequest()
    } catch (error) {
      trackError({ error })
    }
  }

  const handleDeclineFriendRequest = async () => {
    try {
      if (isAcceptedFriendRequest) return
      await declineFriendRequest()
    } catch (error) {
      trackError({ error })
    }
  }

  const handleOnPressChat = () => {
    const params: LocalSearchParamsChatRoom = {
      imageUrl: senderAvatar || '',
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
    <NotificationsListItemsContainer
      notificationUid={notificationUid}
      isRead={isNotificationRead}
      onPress={handleDeclineFriendRequest}
      isLoading={isLoadingDeclineFriendRequest}
    >
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
        {!isAcceptedFriendRequest &&
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
        {isAcceptedFriendRequest &&
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
              onPress={handleOnPressChat}
            />
          </BoxRow>}
      </BoxGrow>

    </NotificationsListItemsContainer >
  )
}
