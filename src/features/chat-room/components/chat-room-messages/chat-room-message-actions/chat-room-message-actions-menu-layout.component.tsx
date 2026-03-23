import { PropsWithChildren, useEffect } from 'react';
import BlurView from '@sbaiahmed1/react-native-blur';
import { OverKeyboardView } from 'react-native-keyboard-controller';
import { BackHandler, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useChatRoomMessageActionsMenuStore } from '@/features/chat-room/store/chat-room-message-actions-menu.store';

const BLUR_INTENSITY = 10;

export default function ChatRoomMessageActionsMenuLayout(props: PropsWithChildren) {
  const { children } = props;

  const showActionsMenu = useChatRoomMessageActionsMenuStore(state => state.showActionsMenu);
  const setShowActionsMenu = useChatRoomMessageActionsMenuStore(state => state.setShowActionsMenu);

  useEffect(() => {
    if (!showActionsMenu) return undefined;

    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      setShowActionsMenu(false);

      return true;
    });

    return () => handler.remove();
  }, [showActionsMenu, setShowActionsMenu]);

  return (
    <OverKeyboardView visible={showActionsMenu}>
      <GestureHandlerRootView className="flex-1">
        <TouchableWithoutFeedback className="flex-1" onPress={() => setShowActionsMenu(false)}>
          <BlurView style={{ flex: 1 }} blurType="light" blurAmount={BLUR_INTENSITY}>
            {children}
          </BlurView>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </OverKeyboardView>
  );
}
