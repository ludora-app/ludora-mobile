
import { memo } from 'react'
import { Box } from '@ludo/ui'

import { NotificationsFindAllType } from '@/api/generated/model'
import { SegmentedControl } from '@/components/ui/segmented-control'

import { useNotificationsFilterStore } from '../../stores/notifications-filter.store'

type SegmentedControlItem = {
  labelKey: string
  value: NotificationsFindAllType | ""
}

const SEGMENTED_CONTROL_FAVORITES: SegmentedControlItem[] = [
  {
    labelKey: 'common.all',
    value: "",
  },
  {
    labelKey: 'common.matches',
    value: "SESSION",
  },
  {
    labelKey: 'notifications.segmented_control_friend_requests',
    value: "FRIEND",
  },
]

function NotificationsListHeaderSticky() {
  const filters = useNotificationsFilterStore(state => state.filters)
  const setFilters = useNotificationsFilterStore(state => state.setFilters)

  return (
    <Box className='py-2 bg-background'>
      <SegmentedControl
        items={SEGMENTED_CONTROL_FAVORITES}
        defaultValue={filters.type}
        onValueChange={(value) => setFilters({ type: value })}
      />
    </Box>
  )
}

export default memo(NotificationsListHeaderSticky)