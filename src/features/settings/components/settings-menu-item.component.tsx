import { Pressable } from 'react-native'
import { Box, BoxGrow, BoxRow, Icon, String } from '@ludo/ui'

import COLORS from '@/constants/colors.contstants'
import { TIconsAll } from '@/constants/icons.constants'

interface SettingsMenuItemProps {
  label: string
  iconName: TIconsAll
  onPress: () => void
  description?: string
}

export default function SettingsMenuItem(props: SettingsMenuItemProps) {
  const { description, iconName, label, onPress } = props

  return (
    <Pressable onPress={onPress}>
      <BoxRow className='items-center py-4 gap-2'>
        <Box className="size-10 items-center justify-center rounded-full bg-primary/10">
          <Icon
            name={iconName}
            color={COLORS.primary}
            size="sm"
          />
        </Box>
        <BoxGrow>
          <String
            font="primaryBold"
            variant="body-2"
            truncate
          >
            {label}
          </String>
          {description && (
            <String variant="body-1" className='text-gray-500' truncate>
              {description}
            </String>
          )}
        </BoxGrow>
        <Icon name='chevron-right-regular' color='#9CA3AF' size="sm" />
      </BoxRow>
    </Pressable>
  )
}
