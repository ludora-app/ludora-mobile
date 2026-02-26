import { memo } from 'react'
import { Box } from '@ludo/ui'

import { SegmentedControl } from '@/components/ui/segmented-control'

import { useSettingsFavoritesFilterStore, FavoritesActiveTab } from '../../../stores/settings-favorites-filter.store'

const SEGMENTED_CONTROL_FAVORITES: { labelKey: string; value: FavoritesActiveTab }[] = [
  {
    labelKey: 'common.matches',
    value: 'SESSIONS',
  },
  {
    labelKey: 'common.fields',
    value: 'FIELDS',
  },
]

function SettingsFavoritesHeaderSticky() {
  const filters = useSettingsFavoritesFilterStore(state => state.filters)
  const setFilters = useSettingsFavoritesFilterStore(state => state.setFilters)

  return (
    <Box className='py-2 bg-background'>
      <SegmentedControl
        items={SEGMENTED_CONTROL_FAVORITES}
        defaultValue={filters.type}
        onValueChange={(value) => setFilters({ type: value as FavoritesActiveTab })}
      />
    </Box>
  )
}

export default memo(SettingsFavoritesHeaderSticky)
