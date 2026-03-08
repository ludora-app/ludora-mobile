import { BoxRow, Icon } from '@ludo/ui'
import { PropsWithChildren } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { cn, LoadingIndicator, Pellet, ScalePressable } from '@chillui/ui'

import COLORS from '@/constants/colors.contstants'
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
  const { isPending: isLoadingDeleteNotification, mutateAsync: deleteNotification } =
    useDeleteNotification(notificationUid)

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
    <BoxRow className={cn('items-center gap-4 py-2')}>
      <Animated.View entering={FadeIn} exiting={FadeOut}
        className={cn("absolute inset-0", { "bg-primary/10": !isRead })}
      />
      {children}
      <ScalePressable
        className='w-6 h-full items-center justify-center'
        onPress={handleOnPressCloseIcon}
        disabled={isLoadingDelete}
      >
        {isLoadingDelete ? (
          <LoadingIndicator size="md" name="swing" color={COLORS.muted} />
        ) : (
          <Icon
            name="close-circle-regular"
            color={COLORS.muted}
            pressEffectSize="xs" />
        )}
      </ScalePressable>
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