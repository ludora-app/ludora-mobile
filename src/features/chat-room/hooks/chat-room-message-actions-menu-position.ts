import { useEffect, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, LayoutChangeEvent, Platform, StatusBar } from 'react-native';

import { useChatRoomMessageActionsMenuStore } from '../store/chat-room-message-actions-menu.store';

const MENU_WIDTH = 160;
const EDGE = 8;

export function useChatRoomMessageActionsMenuPosition() {
  const anchor = useChatRoomMessageActionsMenuStore(state => state.anchor);
  const insets = useSafeAreaInsets();
  const [menuHeight, setMenuHeight] = useState(160);
  const [isMeasured, setIsMeasured] = useState(false);

  const onMenuLayout = (event: LayoutChangeEvent) => {
    setMenuHeight(event.nativeEvent.layout.height);
    setIsMeasured(true);
  };

  useEffect(() => {
    setIsMeasured(false);
  }, [anchor]);

  const adjustedAnchor = useMemo(() => {
    if (!anchor) return null;
    return {
      ...anchor,
      y: Platform.OS === 'android' ? anchor.y + (StatusBar.currentHeight || 0) : anchor.y,
    };
  }, [anchor]);

  const menuPositionStyle = useMemo(() => {
    const { height: sh, width: sw } = Dimensions.get('window');
    if (!adjustedAnchor) {
      return {
        bottom: EDGE,
        left: EDGE,
        position: 'absolute' as const,
        right: EDGE,
        top: undefined as number | undefined,
      };
    }

    let top = adjustedAnchor.y + adjustedAnchor.height + EDGE;
    if (top + menuHeight > sh - EDGE - insets.bottom) {
      top = adjustedAnchor.y - menuHeight - EDGE;
    }
    top = Math.max(EDGE + insets.top, Math.min(top, sh - menuHeight - EDGE - insets.bottom));

    const left = Math.max(EDGE, Math.min(adjustedAnchor.x, sw - MENU_WIDTH - EDGE));

    return {
      bottom: undefined as number | undefined,
      left,
      position: 'absolute' as const,
      right: undefined as number | undefined,
      top,
      width: MENU_WIDTH,
    };
  }, [adjustedAnchor, menuHeight, insets.bottom, insets.top]);

  return {
    anchor: adjustedAnchor,
    isMeasured,
    menuPositionStyle,
    onMenuLayout,
  };
}
