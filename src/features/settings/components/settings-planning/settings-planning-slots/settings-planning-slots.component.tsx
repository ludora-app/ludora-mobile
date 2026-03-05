import { Box, String } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

import dayjs from '@/lib/dayjs';

import { PlanningSlot } from '../../../types/settings-planning.types'
import SettingsPlanningSlotsItem from './settings-planning-slots-item.component'
import { useSettingsPlanningStore } from '../../../stores/settings-planning.store'

const PLANNING_SLOTS: PlanningSlot[] = [{
  icon: 'sun-regular',
  id: "MORNING",
  label: "common.morning",
  time: 'settings.planning.morning_slot_time',
}, {
  icon: 'cloudy-with-moon-regular',
  id: "AFTERNOON",
  label: 'common.afternoon',
  time: 'settings.planning.afternoon_slot_time',
}, {
  icon: 'mug-regular',
  id: "EVENING",
  label: 'common.evening',
  time: 'settings.planning.evening_slot_time',
}]



export default function SettingsPlanningSlots() {
  const { t } = useTranslate()
  const selectedDay = useSettingsPlanningStore(state => state.selectedDay)
  const planning = useSettingsPlanningStore(state => state.planning)
  const setToggleSlot = useSettingsPlanningStore(state => state.setToggleSlot)

  const selectedPlannings = planning.filter((dayPlanning) => {
    if (dayPlanning.type === 'RECURRENT') {
      return dayPlanning.dayOfWeek === selectedDay.day();
    }
    return dayjs(dayPlanning.date).isSame(selectedDay, 'day');
  });

  return (
    <Box className="gap-5">
      <String font="primaryBold">
        {t('settings.planning.slots_title')}
      </String>
      {PLANNING_SLOTS.map((slot) => (
        <SettingsPlanningSlotsItem
          key={slot.id}
          slot={slot}
          availability={selectedPlannings.find(dayPlanning => dayPlanning.timePeriod === slot.id)}
          onPress={() => setToggleSlot(slot)}
        />
      ))}
    </Box>
  )
}
