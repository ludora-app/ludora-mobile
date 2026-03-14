
import { DaysCarousel } from '@/components/ui/days-carousel'

import { useSettingsPlanningStore } from '../../stores/settings-planning.store'




export default function SettingsPlannngDays() {
  const setSelectedDay = useSettingsPlanningStore(state => state.setSelectedDay)
  return (
    <DaysCarousel numberOfDays={30} onSelect={setSelectedDay} initialDate={useSettingsPlanningStore.getState().selectedDay} />
  )
}