import { memo } from 'react'

import { NotificationResponseData } from '@/api/generated/model'

import NotificationListItemsFriendRequest from './notification-list-items-friend-request.component'
import NotificationListItemsFriendAccepted from './notification-list-items-friend-accepted.component'
import NotificationListItemsSessionInvitation from './notification-list-items-session-invitation.component'

type NotificationsListItemsProps = {
  item: NotificationResponseData
}

function NotificationsListItems({ item }: NotificationsListItemsProps) {
  const { type } = item || {}

  switch (type) {
    case "FRIEND_REQUEST":
      return <NotificationListItemsFriendRequest item={item} />
    case "SESSION_INVITATION":
      return <NotificationListItemsSessionInvitation item={item} />
    case "FRIEND_ACCEPTED":
      return <NotificationListItemsFriendAccepted item={item} />
    default:
      return null
  }
}

export default memo(NotificationsListItems)
