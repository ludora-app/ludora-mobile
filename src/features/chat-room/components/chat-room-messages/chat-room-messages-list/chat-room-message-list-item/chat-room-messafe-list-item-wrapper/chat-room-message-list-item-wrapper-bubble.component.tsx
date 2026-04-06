import { Pressable, View } from 'react-native';
import { memo, PropsWithChildren, useCallback, useRef } from 'react';

import { String } from '@/components/ludo-ui';
import { useHaptics } from '@/hooks/haptics.hook';
import { MessageCollectionItemDto } from '@/api/generated/model';
import { useChatRoomSessionTeam } from '@/features/chat-room/utils/chat-room-session-team.utils';
import { OptimisticMessage } from '@/features/chat-room/store/chat-room-optimistic-messages.store';
import { chatRoomMessageListItemWrapperTv } from '@/features/chat-room/components/styles/chat-room-message-list-item-wrapper.styles';
import {
  MessageActionsAnchorRect,
  useChatRoomMessageActionsMenuStore,
} from '@/features/chat-room/store/chat-room-message-actions-menu.store';

type ChatRoomMessageListItemWrapperBubbleProps = {
  messageData: OptimisticMessage | MessageCollectionItemDto;
  onBubbleAnchorMeasured?: (rect: MessageActionsAnchorRect) => void;
};

function ChatRoomMessageListItemWrapperBubble(
  props: PropsWithChildren<ChatRoomMessageListItemWrapperBubbleProps>,
) {
  const { children, messageData, onBubbleAnchorMeasured } = props;
  const { triggerHaptic } = useHaptics();
  const bubbleRef = useRef<View>(null);
  const { globalStatus: messageGlobalStatus, isSender: isMessageFromMe, sender } = messageData || {};
  const { firstname } = sender || {};
  const toggleShowActionsMenu = useChatRoomMessageActionsMenuStore(state => state.toggleShowActionsMenu);
  const setPressedMessageData = useChatRoomMessageActionsMenuStore(state => state.setPressedMessageData);

  const { isTeamA, type } = useChatRoomSessionTeam();

  const isMessageDeleted = messageGlobalStatus === 'DELETED';

  const handleMessageLongPress = useCallback(() => {
    if (isMessageDeleted) {
      return;
    }
    triggerHaptic('selection');
    bubbleRef.current?.measureInWindow((x, y, width, height) => {
      onBubbleAnchorMeasured?.({ height, width, x, y });
    });
    setPressedMessageData(messageData);
    toggleShowActionsMenu();
  }, [isMessageDeleted, triggerHaptic, onBubbleAnchorMeasured, messageData, setPressedMessageData, toggleShowActionsMenu]);

  const shouldShowSenderName = !isMessageFromMe && type === 'SESSION';

  return (
    <Pressable
      ref={bubbleRef}
      onLongPress={handleMessageLongPress}
      className={chatRoomMessageListItemWrapperTv({
        isMessageDeleted,
        isMessageFromMe,
        isSessionChat: type === 'SESSION',
        isTeamLabelA: isTeamA,
      })}
      collapsable={false}
    >
      {shouldShowSenderName && (
        <String className="capitalize" variant="body-sm" colorVariant="ring" truncate>
          {firstname}
        </String>
      )}
      {children}
    </Pressable>
  );
}

export default memo(ChatRoomMessageListItemWrapperBubble);
