
import { memo } from 'react'
import { Wrapper } from '@ludo/ui'

import { SegmentedControl } from '@/components/ui/segmented-control'

import { useNotificationsFilterStore } from '../../stores/notifications-filter.store'

type SegmentedControlValue = 'all' | 'sessions' | 'friend_requests'

type SegmentedControlItem = {
  labelKey: string
  value: SegmentedControlValue
}

const SEGMENTED_CONTROL_FAVORITES: SegmentedControlItem[] = [
  {
    labelKey: 'common.all',
    value: 'all',
  },
  {
    labelKey: 'common.matches',
    value: 'sessions',
  },
  {
    labelKey: 'notifications.segmented_control_friend_requests',
    value: 'friend_requests',
  },
]

function NotificationsListHeaderSticky() {
  const setFilters = useNotificationsFilterStore(state => state.setFilters)

  return (
    <Wrapper className='py-2 bg-background'>
      <SegmentedControl
        items={SEGMENTED_CONTROL_FAVORITES}
        onValueChange={(value) => setFilters({ type: value })}
      />
    </Wrapper>
  )
}

export default memo(NotificationsListHeaderSticky)