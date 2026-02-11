import { Box } from '@ludo/ui'

import { usePlanningStore } from '../../../stores/planning.store'
import { PlanningSlot } from '../../../types/settings-planning.types'
import SettingsPlanningSlotsItem from './settings-planning-slots-item.component'

const PLANNING_SLOTS: PlanningSlot[] = [{
  icon: 'sun-regular',
  id: 'morning',
  label: 'Matin',
  time: '9h à 12h',
}, {
  icon: 'cloudy-with-moon-regular',
  id: 'afternoon',
  label: 'Après-midi',
  time: '12h à 18h',
}, {
  icon: 'mug-regular',
  id: 'evening',
  label: 'Soirée',
  time: '18h à 22h',
}]

export default function SettingsPlanningSlots() {
  const selectedDay = usePlanningStore(state => state.selectedDay)
  const planning = usePlanningStore(state => state.planning)
  const toggleSlot = usePlanningStore(state => state.toggleSlot)

  const dayPlanning = planning[selectedDay]



  return (
    <Box className="gap-5">
      {PLANNING_SLOTS.map((slot) => (
        <SettingsPlanningSlotsItem
          key={slot.id}
          slot={slot}
          availability={dayPlanning[slot.id]}
          onPress={() => toggleSlot(slot.id)}
        />
      ))}
    </Box>
  )
}
