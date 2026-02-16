import { memo } from 'react'
import { Box } from '@ludo/ui'

import { SegmentedControl } from '@/components/ui/segmented-control'
import { SessionsFindAllMySessionsScope } from '@/api/generated/model'

import { useSettingsHistoryFilterStore } from '../../../stores/settings-history-filter.store'

type SegmentedControlItem = {
  labelKey: string
  value: SessionsFindAllMySessionsScope
}

const SEGMENTED_CONTROL_ITEMS: SegmentedControlItem[] = [
  {
    labelKey: 'common.all',
    value: SessionsFindAllMySessionsScope.ALL,
  },
  {
    labelKey: 'common.upcoming',
    value: SessionsFindAllMySessionsScope.UPCOMING,
  },
  {
    labelKey: 'common.past',
    value: SessionsFindAllMySessionsScope.PAST,
  },
]

function SessionsHistoryHeaderSticky() {
  const setFilter = useSettingsHistoryFilterStore(state => state.setFilter)

  return (
    <Box className='py-2 bg-background'>
      <SegmentedControl
        items={SEGMENTED_CONTROL_ITEMS}
        onValueChange={(value) => setFilter({ scope: value })}
      />
    </Box>
  )
}

export default memo(SessionsHistoryHeaderSticky)
