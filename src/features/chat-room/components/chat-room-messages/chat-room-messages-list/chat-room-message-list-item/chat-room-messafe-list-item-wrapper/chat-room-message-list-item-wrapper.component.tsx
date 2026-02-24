import { cn } from '@chillui/ui';
import { Box, BoxRow } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import ROUTES from '@/constants/routes.constants';
import { useHaptics } from '@/hooks/haptics.hook';
import { MessageCollectionItemDto } from '@/api/generated/model';
import { useChatRoomStore } from '@/features/chat-room/store/chat-room.store';
import { OptimisticMessage } from '@/features/chat-room/store/chat-room-optimistic-messages.store';

import ChatRoomMessageListItemWrapperTime from './chat-room-message-list-item-wrapper-time.component';
import ChatRoomMessageListItemWrapperAvatar from './chat-room-message-list-item-wrapper-avatar.component';
import { chatRoomMessageListItemWrapperTv } from '../../../../styles/chat-room-message-list-item-wrapper.styles';
import ChatRoomMessageListItemWrapperIndicators from './chat-room-message-list-item-wrapper-indicators/chat-room-message-list-item-wrapper-indicators.component';

type ChatRoomMessageListItemWrapperProps = {
  isChatRoomGroup: boolean;
  messageData: OptimisticMessage | MessageCollectionItemDto;
};

export default function ChatRoomMessageListItemWrapper(props: PropsWithChildren<ChatRoomMessageListItemWrapperProps>) {
  const chatRoomId = useChatRoomStore(state => state.chatRoomId);
  const { children, isChatRoomGroup, messageData } = props;


  const { globalStatus: messageGlobalStatus, isSender: isMessageFromMe, uid: messageUid } = messageData || {};
  const router = useRouter();
  const { triggerHaptic } = useHaptics();

  const isMessageDeleted = messageGlobalStatus === 'DELETED'

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleMessageLongPress = () => {
    if (!chatRoomId || !messageUid || isMessageDeleted) {
      return;
    }
    cancelAnimation(scale);
    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 200 }),
    );
    triggerHaptic('selection');
    router.push(ROUTES.CHAT_ROOM.MESSAGE_ACTIONS_UID({ chatRoomId, messageId: messageUid }));
  };

  return (
    <Box
      className={cn(
        {
          'items-end': isMessageFromMe,
          'items-start': !isMessageFromMe,
        },
        'mb-3',
      )}
    >
      <Box className="max-w-[80%]">
        <BoxRow
          className={cn('items-end gap-1', {
            'flex-row-reverse justify-start': isMessageFromMe,
            'justify-start': !isMessageFromMe,
          })}
        >
          {isChatRoomGroup && <ChatRoomMessageListItemWrapperAvatar messageData={messageData} />}
          <Animated.View style={animatedStyle} className="shrink">
            <Pressable
              onLongPress={handleMessageLongPress}
              className={chatRoomMessageListItemWrapperTv({
                isMessageDeleted,
                isMessageFromMe,
              })}
            >
              {children}
            </Pressable>
          </Animated.View>
        </BoxRow>
        <BoxRow className={cn('items-center justify-end gap-px')}>
          <ChatRoomMessageListItemWrapperTime messageData={messageData} />
          <ChatRoomMessageListItemWrapperIndicators messageData={messageData} />
        </BoxRow>
      </Box>
    </Box>
  );
}

