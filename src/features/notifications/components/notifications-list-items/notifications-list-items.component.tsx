import React from 'react'

import { NotificationResponseData } from '@/api/generated/model'

import NotificationListItemsFriendRequest from './notification-list-items-friend-request.component'

type NotificationsListItemsProps = {
  item: NotificationResponseData
}



export default function NotificationsListItems({ item }: NotificationsListItemsProps) {
  const { type } = item || {}


  switch (type) {
    case "FRIEND_REQUEST":
      return <NotificationListItemsFriendRequest item={item} />
    case "SESSION_INVITATION":
      return <NotificationListItemsFriendRequest item={item} />
    default:
      return null
  }
}