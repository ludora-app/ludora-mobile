import { Icon } from '@components/nysaUi';
import { usePickImage } from '@utils/images';
import { useCallback, useEffect } from 'react';
import { MessageType } from '@api/utils/api.types';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useChatRoomMessageOptimisticQueue } from '../../queries/chat-room-message-queue.queries';

interface ChatRoomInputCameraAlbumProps {
  inputValue: string;
}

function ChatRoomInputCameraAlbumIcons({ inputValue }: ChatRoomInputCameraAlbumProps) {
  const { clearImages, handlePickImage, images } = usePickImage();

  const { addOptimisticMessageToQueue } = useChatRoomMessageOptimisticQueue();

  const iconsTranslateX = useSharedValue(0);
  const iconPositionStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: iconsTranslateX.value }],
  }));

  const hideIcons = useCallback(() => {
    iconsTranslateX.value = withTiming(35, { duration: 100 });
  }, [iconsTranslateX]);

  const showIcons = useCallback(() => {
    iconsTranslateX.value = withTiming(0, { duration: 100 });
  }, [iconsTranslateX]);

  useEffect(() => {
    if (inputValue.length === 0) {
      showIcons();
    } else {
      hideIcons();
    }
  }, [inputValue.length === 0]);

  useEffect(() => {
    if (images && images.length === 1) {
      addOptimisticMessageToQueue(images[0].uri, MessageType.IMAGE);
    } else if (images && images.length > 1) {
      const imagesUri = images.map(image => image.uri);
      addOptimisticMessageToQueue(imagesUri, MessageType.IMAGES);
    }
    return () => {
      clearImages();
    };
  }, [images]);

  return (
    <Animated.View className="absolute right-0 z-50 flex-row" style={iconPositionStyle}>
      <Icon
        variant="camera"
        color="#fff"
        wrapper
        onPress={() => {
          handlePickImage({ isCamera: true, isMultiple: false });
        }}
      />
      <Icon
        variant="images"
        color="#fff"
        wrapper
        onPress={() => {
          handlePickImage({ isCamera: false, isMultiple: true });
        }}
      />
    </Animated.View>
  );
}

export default ChatRoomInputCameraAlbumIcons;
