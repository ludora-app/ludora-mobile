import { useRouter } from 'expo-router'
import { Badge, IconButton } from '@ludo/ui'

import COLORS from '@/constants/COLORS'
import { useNotificationsUnreadCount } from '@/queries/get-notifications_unread_count.query'

export default function ProfilHeaderNotification() {
  const router = useRouter()
  const { data: notificationsUnreadCount } = useNotificationsUnreadCount()

  const hasNotification = notificationsUnreadCount?.unreadCount > 0

  const handlePress = () => {
    router.push('/notifications')
  }
  return (
    <Badge title={notificationsUnreadCount?.unreadCount?.toString()} show={hasNotification} side="right">
      <IconButton iconName={hasNotification ? 'bell-solid' : 'bell-regular'} colorVariant="white" iconColor={COLORS.primary} as="scale-pressable" onPress={handlePress} />
    </Badge>
  )
}