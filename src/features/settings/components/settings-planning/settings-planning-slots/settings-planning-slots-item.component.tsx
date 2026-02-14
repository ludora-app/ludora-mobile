import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { useTranslate } from '@tolgee/react'
import { cn, ScalePressable } from '@chillui/ui'
import { BoxCenter, BoxGrow, Icon, String } from '@ludo/ui'

import COLORS from '@/constants/COLORS'
import { HourPreferenceData, HourPreferenceDataType } from '@/api/generated/model'

import { PlanningSlot } from '../../../types/settings-planning.types'

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0 4px 6px 1px rgba(0, 0, 0, 0.2)',
  },
})

const AVAILABILITY_LABELS: Record<HourPreferenceDataType | 'none', string> = {
  [HourPreferenceDataType.ONE_TIME]: 'settings.planning.once_availability',
  [HourPreferenceDataType.RECURRENT]: 'settings.planning.recurring_availability',
  none: 'settings.planning.none_availability',
}

interface SettingsPlanningItemProps {
  slot: PlanningSlot
  onPress: () => void
  availability?: HourPreferenceData
}

function SettingsPlanningSlotsItem(props: SettingsPlanningItemProps) {
  const { t } = useTranslate()
  const { availability, onPress, slot } = props

  const { type } = availability || {}

  const { icon, label, time } = slot

  return (
    <ScalePressable
      onPress={onPress}
      className={cn('flex-row rounded-xl overflow-hidden gap-2', {
        'border-2 border-[#4BB31B]': type === HourPreferenceDataType.ONE_TIME,
        'border-2 border-[#F59E0B]': type === HourPreferenceDataType.RECURRENT,
        'border-2 border-ring': !type,
      })}
      style={styles.shadow}
    >
      <BoxCenter className={cn('w-1/4', {
        'bg-[#4BB31B]': type === HourPreferenceDataType.ONE_TIME,
        'bg-[#F59E0B]': type === HourPreferenceDataType.RECURRENT,
        'bg-ring': !type,
      })}>
        <Icon name={icon} size="xl" color={!type ? COLORS.muted : 'black'} />
      </BoxCenter>
      <BoxGrow className='p-3'>
        <String variant="body-sm">
          {t(label)}
        </String>
        <String font="primaryBold">
          {t(time)}
        </String>
        <String variant="body-sm"
          font="primarySemiBold"
          className={cn({
            'text-gray-400': !type,
            'text-green-600': type === HourPreferenceDataType.ONE_TIME,
            'text-primary': type === HourPreferenceDataType.RECURRENT,
          })}>
          {t(AVAILABILITY_LABELS[type || 'none'])}
        </String>
      </BoxGrow>
    </ScalePressable>
  )
}

export default memo(SettingsPlanningSlotsItem, (prevProps, nextProps) => prevProps.availability === nextProps.availability)