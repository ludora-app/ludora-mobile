import { Icon, String, BoxCenter, IconProps, StringProps } from '@ludo/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'
import { IS_ANDROID } from '@/constants/platform.constants'
import { RipplePressable } from '@/components/chill-ui-library'


type ChatRoomMessageActionsItemProps = {
  iconProps?: IconProps
  stringProps?: StringProps
  title: string
  onPress: () => void
  disabled?: boolean
}

const RIPPLE_EFFECT_SPEED = 300

export default function ChatRoomMessageActionsItem(props: ChatRoomMessageActionsItemProps) {
  const { disabled, iconProps, onPress, stringProps, title } = props
  const { bottom } = useSafeArea()

  return (
    <RipplePressable className='flex-1  py-4'
      effectColor="#00000040"
      onPress={onPress}
      disabled={disabled}
      style={{ opacity: disabled ? 0.5 : 1, paddingBottom: IS_ANDROID && bottom }}
      speed={RIPPLE_EFFECT_SPEED}
    >
      <BoxCenter pointerEvents='none' className=''>
        <Icon {...iconProps} />
        <String {...stringProps}>{title}</String>
      </BoxCenter>
    </RipplePressable>
  )
}