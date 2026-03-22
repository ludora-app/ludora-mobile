import { Pressable, View } from 'react-native';
import { PropsWithChildren, useRef } from 'react';

import { useHaptics } from '@/hooks/haptics.hook';
import { MessageCollectionItemDto } from '@/api/generated/model';
import { OptimisticMessage } from '@/features/chat-room/store/chat-room-optimistic-messages.store';
import { chatRoomMessageListItemWrapperTv } from '@/features/chat-room/components/styles/chat-room-message-list-item-wrapper.styles';
import { MessageActionsAnchorRect, useChatRoomMessageActionsMenuStore } from '@/features/chat-room/store/chat-room-message-actions-menu.store';


type ChatRoomMessageListItemWrapperBubbleProps = {
  messageData: OptimisticMessage | MessageCollectionItemDto;
  onBubbleAnchorMeasured?: (rect: MessageActionsAnchorRect) => void;
};

export default function ChatRoomMessageListItemWrapperBubble(
  props: PropsWithChildren<ChatRoomMessageListItemWrapperBubbleProps>,
) {
  const { children, messageData, onBubbleAnchorMeasured } = props;
  const { triggerHaptic } = useHaptics();
  const bubbleRef = useRef<View>(null);
  const { globalStatus: messageGlobalStatus, isSender: isMessageFromMe } = messageData || {};
  const toggleShowActionsMenu = useChatRoomMessageActionsMenuStore(state => state.toggleShowActionsMenu)
  const setPressedMessageData = useChatRoomMessageActionsMenuStore(state => state.setPressedMessageData)

  const isMessageDeleted = messageGlobalStatus === 'DELETED';

  const handleMessageLongPress = () => {
    if (isMessageDeleted) {
      return;
    }
    triggerHaptic('selection');
    bubbleRef.current?.measureInWindow((x, y, width, height) => {
      onBubbleAnchorMeasured?.({ height, width, x, y });
    });
    setPressedMessageData(messageData)
    toggleShowActionsMenu();
  };

  return (
    <Pressable
      ref={bubbleRef}
        onLongPress={handleMessageLongPress}
        className={chatRoomMessageListItemWrapperTv({
          isMessageDeleted,
          isMessageFromMe,
        })}
        collapsable={false}
      >
        {children}
      </Pressable>
  );
}
