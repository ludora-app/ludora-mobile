import { BlurView } from 'expo-blur';
import { PropsWithChildren, useEffect } from 'react'
import { OverKeyboardView } from 'react-native-keyboard-controller'
import { BackHandler, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Box } from '@/components/chill-ui-library';
import { useChatRoomMessageActionsMenuStore } from '@/features/chat-room/store/chat-room-message-actions-menu.store';





export default function ChatRoomMessageActionsMenuLayout(props: PropsWithChildren) {
  const { children } = props

  const showActionsMenu = useChatRoomMessageActionsMenuStore(state => state.showActionsMenu)
  const setShowActionsMenu = useChatRoomMessageActionsMenuStore(state => state.setShowActionsMenu)

  useEffect(() => {
    if (!showActionsMenu) return undefined

    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      setShowActionsMenu(false)

      return true
    })

    return () => handler.remove()
  }, [showActionsMenu, setShowActionsMenu])

  return (
    <OverKeyboardView visible={showActionsMenu}>
      <GestureHandlerRootView className='flex-1'>
        <TouchableWithoutFeedback
          className='flex-1'
          onPress={() => setShowActionsMenu(false)}
        >
          <Box className='flex-1'>
            <BlurView
              className='flex-1'
              tint="dark"
            />
            {children}
          </Box>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </OverKeyboardView>
  )
}