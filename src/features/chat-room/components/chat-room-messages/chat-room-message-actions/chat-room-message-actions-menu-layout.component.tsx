import { BlurView } from '@ludo/ui';
import { PropsWithChildren, useEffect } from 'react';
import { BackHandler, Keyboard, Pressable } from 'react-native';
import { OverKeyboardView } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useChatRoomMessageActionsMenuStore } from '@/features/chat-room/store/chat-room-message-actions-menu.store';

export default function ChatRoomMessageActionsMenuLayout(props: PropsWithChildren) {
  const { children } = props;

  const showActionsMenu = useChatRoomMessageActionsMenuStore(state => state.showActionsMenu);
  const setShowActionsMenu = useChatRoomMessageActionsMenuStore(state => state.setShowActionsMenu);

  useEffect(() => {
    if (!showActionsMenu) return undefined;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setShowActionsMenu(false);
      return true;
    });

    const keyboardSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setShowActionsMenu(false);
    });

    return () => {
      backHandler.remove();
      keyboardSubscription.remove();
    };
  }, [showActionsMenu, setShowActionsMenu]);

  return (
    <OverKeyboardView visible={showActionsMenu}>
      <GestureHandlerRootView className="flex-1">
        <Pressable className="flex-1" onPress={() => setShowActionsMenu(false)}>
          <BlurView style={{ flex: 1 }}>{children}</BlurView>
        </Pressable>
      </GestureHandlerRootView>
    </OverKeyboardView>
  );
}
