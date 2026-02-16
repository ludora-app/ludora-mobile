import { BoxRow, Icon } from '@ludo/ui'
import { PropsWithChildren } from 'react'
import { Box, cn, LoadingIndicator, Pellet } from '@chillui/ui'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import COLORS from '@/constants/COLORS'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'

import { useDeleteNotification } from '../../queries/delete-notification.query'

type NotificationsListItemsContainerProps = {
  notificationUid: string
  onPress?: () => void
  isLoading?: boolean
  isRead: boolean
}

export default function NotificationsListItemsContainer(props: PropsWithChildren<NotificationsListItemsContainerProps>) {
  const { trackError } = useAnalytics()
  const { children, isLoading, isRead, notificationUid, onPress } = props
  const { isPending: isLoadingDeleteNotification, mutateAsync: deleteNotification } = useDeleteNotification(notificationUid)

  const handleOnPressCloseIcon = async () => {
    try {
      await deleteNotification()
      onPress?.()
    } catch (error) {
      trackError({ error })
    }
  }
  const isLoadingDelete = isLoading || isLoadingDeleteNotification

  return (

    <BoxRow className={cn('items-center gap-4 px-3 py-2')}>
      <Animated.View entering={FadeIn} exiting={FadeOut}
        className={cn("absolute inset-0", { "bg-primary/10": !isRead })}
      />
      {children}
      <Box className='w-6.5'>
        {isLoadingDelete ? (
          <LoadingIndicator size="md" name="swing" color={COLORS.muted} />
        ) : (
          <Icon name="close-circle-regular" color={COLORS.muted} onPress={handleOnPressCloseIcon} pressEffectSize="xs" />
        )}
      </Box>
      {
        !isRead && (
          <Animated.View entering={FadeIn} exiting={FadeOut} className='absolute top-2 right-2'>
            <Pellet />
          </Animated.View>
        )
      }
    </BoxRow>
  )
}