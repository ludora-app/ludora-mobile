import { BoxRow, Icon } from '@ludo/ui'
import { PropsWithChildren } from 'react'
import { Box, LoadingIndicator } from '@chillui/ui'

import COLORS from '@/constants/COLORS'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'

import { useDeleteNotification } from '../../queries/delete-notification.query'

type NotificationsListItemsContainerProps = {
  notificationUid: string
  onPress?: () => void
  isLoading?: boolean
}

export default function NotificationsListItemsContainer(props: PropsWithChildren<NotificationsListItemsContainerProps>) {
  const { trackError } = useAnalytics()
  const { children, isLoading, notificationUid, onPress } = props
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
    <BoxRow className='items-center py-4 gap-4'>
      {children}
      <Box className='w-6.5'>
        {isLoadingDelete ? (
          <LoadingIndicator size="md" name="swing" color={COLORS.muted} />
        ) : (
          <Icon name="close-circle-regular" color={COLORS.muted} onPress={handleOnPressCloseIcon} pressEffectSize="xs" />
        )}
      </Box>
    </BoxRow>
  )
}