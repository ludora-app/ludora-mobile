
import { Icon, String } from '@ludo/ui'
import { StyleSheet } from 'react-native'

import COLORS from '@/constants/colors.contstants'
import { TIconsAll } from '@/constants/icons.constants'
import { ScalePressable } from '@/components/chill-ui-library'

const styles = StyleSheet.create({
  selectedShadow: {
    boxShadow: '0 2px 4px #F1592440',
  },
})

type ProfilHeaderActionsItemProps = {
  iconName: TIconsAll
  label: string
  onPress?: () => void
}
export default function ProfilHeaderActionsItem(props: ProfilHeaderActionsItemProps) {
  const { iconName, label, onPress } = props

  return (
    <ScalePressable
      className='border border-primary/20 rounded-xl p-3 flex-row items-center gap-2'
      style={styles.selectedShadow}
      onPress={onPress}
    >
      <Icon name={iconName} color={COLORS.primary} />
      <String>{label}</String>
    </ScalePressable>
  )
}