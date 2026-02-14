import { View } from 'react-native'
import { Separator } from '@ludo/ui'

import NotificationItem from './notifications-list-items/notification-list-items-friend-request.component'
import { useGetNotificationsMe } from '../queries/get-notifications.query'
import NotificationsEmptyState from './notifications-empty-state.component'
import { SESSION_NOTIFICATION_TYPES } from '../constants/notification-types.constants'

export default function NotificationsSessionsList() {
  const { isLoading, items } = useGetNotificationsMe()

  const sessionNotifications = items.filter(item => {
    const type = (item.type as unknown as string) ?? ''
    return SESSION_NOTIFICATION_TYPES.includes(type as typeof SESSION_NOTIFICATION_TYPES[number])
  })

  if (!isLoading && sessionNotifications.length === 0) {
    return <NotificationsEmptyState />
  }

  return (
    <View className='pt-4'>
      {sessionNotifications.map((item, index) => (
        <View key={item.uid}>
          <NotificationItem item={item} />
          {index < sessionNotifications.length - 1 && <Separator />}
        </View>
      ))}
    </View>
  )
}
