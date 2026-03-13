import { useRouter } from 'expo-router'
import { Badge, IconButton } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'
import COLORS from '@/constants/colors.contstants'
import { useNotificationsUnreadCount } from '@/queries/get-notifications_unread_count.query'

const MAX_UNREAD_COUNT = 99

export default function ProfilHeaderNotification() {
  const router = useRouter()
  const { data: notificationsUnreadCount } = useNotificationsUnreadCount()

  const { unreadCount } = notificationsUnreadCount || {};

  const hasNotification = unreadCount > 0

  const handlePress = () => {
    router.navigate(ROUTES.NOTIFICATIONS.INDEX)
  }

  const handleNotificationsCount = () => {
    const count = unreadCount?.toString()
    if (unreadCount > MAX_UNREAD_COUNT) {
      return '99'
    }
    return count
  }

  return (
    <Badge title={handleNotificationsCount()} show={hasNotification} side="right">
      <IconButton
        iconName={hasNotification ? 'bell-solid' : 'bell-regular'}
        colorVariant="white"
        iconColor={COLORS.primary}
        as="scale-pressable"
        onPress={handlePress}
      />
    </Badge>
  )
}