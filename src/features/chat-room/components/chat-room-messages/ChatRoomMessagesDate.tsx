import { String } from '@components/nysaUi';
import { useCallback, useEffect } from 'react';
import { formatTimestampToTime, isDateToday, isYesterday } from '@utils/time';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { useChatRoomMessageDateStore } from '../../store/chatRoomMessageDate.store';

export default function ChatRoomMessagesDate() {
  const { messageCurrentDate } = useChatRoomMessageDateStore();

  const translateY = useSharedValue(-50);

  const messageCurrentDateStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(translateY.value) }],
  }));

  const formatMessageDate = (date: Date | string) => {
    if (isYesterday(date) || isDateToday(date)) {
      return 'Hier';
    }
    return formatTimestampToTime(date, 'DD MMMM YYYY');
  };

  const showMessageCurrentDate = useCallback(() => {
    translateY.value = withTiming(0);
  }, [translateY]);

  const hideMessageCurrentDate = useCallback(() => {
    translateY.value = withTiming(-50);
  }, [translateY]);

  useEffect(() => {
    if (messageCurrentDate && !isDateToday(messageCurrentDate)) {
      showMessageCurrentDate();
    } else {
      hideMessageCurrentDate();
    }
  }, [messageCurrentDate]);

  return (
    <Animated.View
      className="absolute top-1 self-center z-50 bg-thirthary py-1 px-2 rounded-lg"
      style={[messageCurrentDateStyle]}
    >
      <String size="xs">{formatMessageDate(messageCurrentDate || '')}</String>
    </Animated.View>
  );
}
