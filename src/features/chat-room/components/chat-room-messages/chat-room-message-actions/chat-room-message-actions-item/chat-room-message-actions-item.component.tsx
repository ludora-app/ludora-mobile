import { Pressable } from 'react-native-gesture-handler'
import { Icon, String, BoxCenter, IconProps, StringProps } from '@ludo/ui'

import { useChatRoomMessageActionsMenuStore } from '@/features/chat-room/store/chat-room-message-actions-menu.store'


type ChatRoomMessageActionsItemProps = {
  iconProps?: IconProps
  stringProps?: StringProps
  title: string
  onPress: () => void
  disabled?: boolean
}

export default function ChatRoomMessageActionsItem(props: ChatRoomMessageActionsItemProps) {
  const { disabled, iconProps, onPress, stringProps, title } = props

  const setShowActionsMenu = useChatRoomMessageActionsMenuStore(state => state.setShowActionsMenu)


  const handleOnPress = () => {
    onPress()
    setShowActionsMenu(false)
  }

  return (
    <Pressable
      onPress={handleOnPress}
      disabled={disabled}
      style={({ pressed }) => ({ alignItems: "flex-start", opacity: pressed ? 0.5 : 1, padding: 8, width: '100%' })}
    >
      <BoxCenter pointerEvents='none' className='flex-row items-center gap-2'>
        <Icon {...iconProps} />
        <String {...stringProps}>{title}</String>
      </BoxCenter>
    </Pressable>
  )
}