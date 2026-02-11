import dayjs from 'dayjs';
import { String } from '@ludo/ui';
import isToday from 'dayjs/plugin/isToday';
import { useCallback, useEffect } from 'react';
import 'dayjs/locale/fr';
import isYesterday from 'dayjs/plugin/isYesterday';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useChatRoomMessageOnScreenDateStore } from '../../../store/chat-room-message-on-screen-date.store';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.locale('fr');

export default function ChatRoomMessageListHeaderDate() {
  const { messageCurrentDate } = useChatRoomMessageOnScreenDateStore();

  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(0);

  const messageCurrentDateStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const formatMessageDate = (date: Date | string) => {
    const dayjsDate = dayjs(date);

    if (dayjsDate.isToday()) {
      return "Aujourd'hui";
    }
    if (dayjsDate.isYesterday()) {
      return 'Hier';
    }
    return dayjsDate.format('DD MMMM YYYY');
  };

  const showMessageCurrentDate = useCallback(() => {
    translateY.value = withTiming(10, { duration: 200 });
    opacity.value = withTiming(1, { duration: 200 });
  }, [translateY, opacity]);

  const hideMessageCurrentDate = useCallback(() => {
    translateY.value = withTiming(-50, { duration: 200 });
    opacity.value = withTiming(0, { duration: 200 });
  }, [translateY, opacity]);

  useEffect(() => {
    if (messageCurrentDate) {
      showMessageCurrentDate();

      // Auto-hide after 2 seconds
      const timer = setTimeout(() => {
        hideMessageCurrentDate();
      }, 2000);

      return () => clearTimeout(timer);
    }

    hideMessageCurrentDate();
    return undefined;
  }, [messageCurrentDate, showMessageCurrentDate, hideMessageCurrentDate]);

  if (!messageCurrentDate) return null;

  return (
    <Animated.View
      className="absolute top-0 z-5 self-center rounded-lg bg-black/70 px-3 py-1.5"
      style={[messageCurrentDateStyle]}
    >
      <String size="xs" className="font-medium text-white">
        {formatMessageDate(messageCurrentDate)}
      </String>
    </Animated.View>
  );
}
