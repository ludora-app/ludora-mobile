import { memo } from 'react'
import { Box } from '@ludo/ui'

import { FieldsFindAllMyFieldsStatus } from '@/api/generated/model'
import { SegmentedControl } from '@/components/ui/segmented-control'

import { useMyFieldsFilterStore } from '../../stores/my-fields-filter.store'

type SegmentedControlItem = {
  labelKey: string
  value: FieldsFindAllMyFieldsStatus
}

const SEGMENTED_CONTROL_ITEMS: SegmentedControlItem[] = [
  {
    labelKey: 'my_fields.verified',
    value: FieldsFindAllMyFieldsStatus.APPROVED,
  },
  {
    labelKey: 'my_fields.unverified',
    value: FieldsFindAllMyFieldsStatus.PENDING,
  },
]

function MyFieldsHeaderSticky() {
  const filter = useMyFieldsFilterStore(state => state.filter)
  const setFilter = useMyFieldsFilterStore(state => state.setFilter)

  return (
    <Box className='py-2 bg-background'>
      <SegmentedControl
        items={SEGMENTED_CONTROL_ITEMS}
        defaultValue={filter.status}
        onValueChange={(value) => setFilter({ status: value })}
      />
    </Box>
  )
}

export default memo(MyFieldsHeaderSticky)
