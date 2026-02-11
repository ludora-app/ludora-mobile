import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { cn, ScalePressable } from '@chillui/ui'
import { BoxCenter, BoxGrow, Icon, String } from '@ludo/ui'

import COLORS from '@/constants/COLORS'

import { PlanningSlot, SlotAvailability } from '../../../types/settings-planning.types'

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0 4px 6px 1px rgba(0, 0, 0, 0.2)',
  },
})

const AVAILABILITY_LABELS: Record<SlotAvailability, string> = {
  none: 'Non disponible',
  once: 'Disponible ce jour',
  recurring: 'Disponible chaque semaine',
}

interface SettingsPlanningItemProps {
  slot: PlanningSlot
  onPress: () => void
  availability: SlotAvailability
}

function SettingsPlanningSlotsItem(props: SettingsPlanningItemProps) {
  const { availability, onPress, slot } = props
  const { icon, label, time } = slot

  console.log("rerender")
  return (
    <ScalePressable
      onPress={onPress}
      className={cn('flex-row rounded-xl overflow-hidden gap-2', {
        'border-2 border-[#4BB31B]': availability === 'once',
        'border-2 border-[#F59E0B]': availability === 'recurring',
        'border-2 border-ring': availability === 'none',
      })}
      style={styles.shadow}
    >
      <BoxCenter className={cn('w-1/4', {
        'bg-[#4BB31B]': availability === 'once',
        'bg-[#F59E0B]': availability === 'recurring',
        'bg-ring': availability === 'none',
      })}>
        <Icon name={icon} size="xl" color={availability === 'none' ? COLORS.muted : 'black'} />
      </BoxCenter>
      <BoxGrow className='p-3'>
        <String variant="body-sm">
          {label}
        </String>
        <String font="primaryBold">
          {time}
        </String>
        <String variant="body-sm" className={cn({
          'text-gray-400': availability === 'none',
          'text-green-600': availability === 'once',
          'text-primary': availability === 'recurring',
        })}>
          {AVAILABILITY_LABELS[availability]}
        </String>
      </BoxGrow>
    </ScalePressable>
  )
}

export default memo(SettingsPlanningSlotsItem, (prevProps, nextProps) => prevProps.availability === nextProps.availability)