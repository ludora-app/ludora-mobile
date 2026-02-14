import { Box, Icon, String } from '@ludo/ui'

import COLORS from '@/constants/COLORS'

export default function NotificationsEmptyState() {
  return (
    <Box className='items-center justify-center pt-16 gap-4'>
      <Box className='size-16 items-center justify-center rounded-full bg-primary/10'>
        <Icon name='bell-regular' color={COLORS.primary} size="lg" />
      </Box>
      <String font="primaryBold" variant="body-2" className='text-gray-500'>
        Aucune notification
      </String>
      <String variant="body-1" className='text-gray-400 text-center px-8'>
        Vous n&apos;avez pas encore de notifications. Elles apparaîtront ici.
      </String>
    </Box>
  )
}
