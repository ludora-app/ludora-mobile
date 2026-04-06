import { Badge, IconButton } from '@ludo/ui';
import { memo, useEffect, useRef, useState } from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { MessageCollectionItemDto } from '@/api/generated/model';
import { useChatRoomSessionTeam } from '@/features/chat-room/utils/chat-room-session-team.utils';

type ChatRoomMessagesListScrollButtonProps = {
  isVisible: boolean;
  onPress: () => void;
  lastMessage: MessageCollectionItemDto;
};

function ChatRoomMessagesListScrollButton(props: ChatRoomMessagesListScrollButtonProps) {
  const { isVisible, lastMessage, onPress } = props;
  const { isTeamA } = useChatRoomSessionTeam();

  const lastMessageUid = lastMessage?.uid;
  const isLastMessageFromMe = lastMessage?.isSender;
  const lastMessageUidRef = useRef(lastMessageUid);
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  const scrollButtonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isVisible ? 1 : 0, { duration: 200 }),
    transform: [
      { translateY: withTiming(isVisible ? 0 : 20, { duration: 200 }) },
      { scale: withTiming(isVisible ? 1 : 0.8, { duration: 200 }) },
    ] as any,
  }));

  useEffect(() => {
    if (lastMessageUid && lastMessageUid !== lastMessageUidRef.current) {
      if (isVisible && !isLastMessageFromMe) {
        setNewMessagesCount(prev => prev + 1);
      }
      lastMessageUidRef.current = lastMessageUid;
    }
  }, [lastMessageUid, isVisible, isLastMessageFromMe]);

  useEffect(() => {
    if (!isVisible) {
      setNewMessagesCount(0);
    }
  }, [isVisible]);

  return (
    <Animated.View
      style={scrollButtonStyle}
      pointerEvents={isVisible ? 'auto' : 'none'}
      className="absolute right-4 bottom-4 z-50"
    >
      <Badge
        title={newMessagesCount > 99 ? '99+' : String(newMessagesCount)}
        show={newMessagesCount > 0}
        side="right"
        size="xs"
        colorVariant={isTeamA ? 'primary' : 'secondary'}
      >
        <IconButton
          iconName="arrow-down-regular"
          onPress={onPress}
          size="md"
          variant="contained"
          rounded="circle"
          className="shadow-lg"
          colorVariant={isTeamA ? 'primary' : 'secondary'}
        />
      </Badge>
    </Animated.View>
  );
}

export default memo(ChatRoomMessagesListScrollButton);
