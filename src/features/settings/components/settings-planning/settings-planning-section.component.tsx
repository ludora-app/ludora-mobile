import { Box } from '@ludo/ui'

import SettingsPlannngDays from './settings-plannng-days.component'
import SettingsPlanningSlots from './settings-planning-slots/settings-planning-slots.component'

export default function SettingsPlanningSection() {
  return (
    <Box className='gap-6'>
      <SettingsPlannngDays />
      <SettingsPlanningSlots />
    </Box>
  )
}