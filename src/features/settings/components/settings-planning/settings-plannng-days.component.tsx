import { String } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'
import { BoxRowCenterBetween, cn, ScalePressable } from '@chillui/ui'

import { usePlanningStore } from '../../stores/planning.store'
import { DayOfWeek } from '../../types/settings-planning.types'

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: 'monday', label: 'days-carousel.days_monday' },
  { key: 'tuesday', label: 'days-carousel.days_tuesday' },
  { key: 'wednesday', label: 'days-carousel.days_wednesday' },
  { key: 'thursday', label: 'days-carousel.days_thursday' },
  { key: 'friday', label: 'days-carousel.days_friday' },
  { key: 'saturday', label: 'days-carousel.days_saturday' },
  { key: 'sunday', label: 'days-carousel.days_sunday' },
]

export default function SettingsPlannngDays() {
  const { t } = useTranslate()
  const selectedDay = usePlanningStore(state => state.selectedDay)
  const selectDay = usePlanningStore(state => state.selectDay)

  return (
    <BoxRowCenterBetween>
      {DAYS.map((day) => {
        const isSelected = selectedDay === day.key
        return (
          <ScalePressable
            key={day.key}
            onPress={() => selectDay(day.key)}
            className={cn('w-12 items-center rounded-lg border py-5', {
              'border-[#cccdcf] bg-white': !isSelected,
              'border-primary bg-primary': isSelected,
            })}
          >
            <String colorVariant={isSelected ? 'white' : 'dark'} font="primaryBold" variant="body-sm">
              {t(day.label)}
            </String>
          </ScalePressable>
        )
      })}
    </BoxRowCenterBetween>
  )
}