import { String } from '@ludo/ui'
import { StyleSheet } from 'react-native'
import { useTranslate } from '@tolgee/react'
import { cn, ScalePressable } from '@chillui/ui'

import { SessionsFindAllMySessionsOwnership } from '@/api/generated/model'
import { useSettingsHistoryFilterStore } from '@/features/settings/stores/settings-history-filter.store'

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
  },
})

interface SettingsSessionsHistoryTypeItemProps {
  titleKey: string
  totalSessions: number
  ownership: SessionsFindAllMySessionsOwnership
}

export default function SettingsSessionsHistoryTypeItem(props: SettingsSessionsHistoryTypeItemProps) {
  const { ownership, titleKey, totalSessions } = props
  const { t } = useTranslate()
  const isSelected = useSettingsHistoryFilterStore(state => state.filter.ownership === ownership)
  const setFilter = useSettingsHistoryFilterStore(state => state.setFilter)

  const handlePress = () => {
    if (isSelected) {
      setFilter({ ownership: undefined })
    } else {
      setFilter({ ownership })
    }
  }

  return (
    <ScalePressable
      className={cn('flex-1 border rounded-xl border-ring/20 h-28 gap-3 justify-center items-center bg-white',
        {
          "border-primary bg-primary/10": isSelected,
        })}
      style={styles.shadow}
      onPress={handlePress}
    >
      <String variant="body-3" font="primaryBold">{t(titleKey)}</String>
      <String variant="body-3" font="primaryBold">{totalSessions}</String>
    </ScalePressable>
  )
}