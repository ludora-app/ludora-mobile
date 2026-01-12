import { useEffect } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import type { ToastItemProps } from '../types/toast.types';

import { Box } from '../../box';
import { Icon } from '../../icon';
import { cn } from '../../../utils';
import { String } from '../../string';
import { useToast } from '../hooks/useToast';
import { twStyles } from '../styles/Toast.styles';
import { useToastSwipe } from '../hooks/useToastSwipe';
import { toastDefaultProps } from '../utils/defaultProps';
import { variantConfig, PROGRESS_BAR_HEIGHT } from '../utils/toastConfig';

const AnimatedBox = Animated.createAnimatedComponent(Box);

function ToastItem({
  additionalOffsetY = 0,
  onDismiss,
  safeAreaInsets,
  scale: stackScale,
  stackIndex,
  swipeable = toastDefaultProps.swipeable,
  toast,
  variants = variantConfig,
  yOffset,
}: ToastItemProps) {
  const {
    config,
    customRender,
    isVisible,
    message,
    opacity,
    progressWidth,
    scale,
    showToast,
    title,
    toastPosition,
    translateY,
  } = useToast(variants, onDismiss);

  const { bottom, top } = safeAreaInsets;
  const { gesture, swipeY } = useToastSwipe({
    enabled: swipeable,
    onDismiss,
    position: toast.position || toastDefaultProps.position,
    threshold: 50,
  });

  useEffect(() => {
    showToast(toast.message ?? '', toast.title, toast.render, toast.variant, toast.position, toast.duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.id]);

  const animatedStyle = useAnimatedStyle(() => {
    const stackOpacity = 1 - stackIndex * 0.15;

    const transform: any[] = [{ translateY: translateY.value + swipeY.value }, { scale: scale.value * stackScale }];

    return {
      opacity: opacity.value * stackOpacity,
      position: 'absolute' as const,
      transform,
      zIndex: 1000 - stackIndex,
      ...(toastPosition === 'top'
        ? { top: top + yOffset + additionalOffsetY }
        : { bottom: bottom + yOffset + additionalOffsetY }),
    };
  });

  const progressStyle = useAnimatedStyle(() => ({
    backgroundColor: config.progressBarColor,
    height: PROGRESS_BAR_HEIGHT,
    width: progressWidth.value,
  }));

  if (!isVisible) return null;

  return (
    <GestureDetector gesture={gesture}>
      <AnimatedBox
        style={animatedStyle}
        pointerEvents="box-none"
        className={cn(twStyles.animatedContainer, !(customRender || config.render) && twStyles.containerWithPadding)}
      >
        <Box className={cn(twStyles.container, !(customRender || config.render) && twStyles.containerWithPadding)}>
          {!(customRender || config.render) && (
            <Box style={config.style} className={cn(twStyles.background, config.className)} />
          )}

          {customRender || config.render ? (
            <Box className={twStyles.customContent}>{customRender || config.render}</Box>
          ) : (
            <Box className={twStyles.contentRow}>
              {config.customIcon || (
                <Icon {...config.iconProps} {...toast.iconProps} size="lg" className={twStyles.icon} />
              )}
              <Box className={twStyles.textContainer}>
                {title && <String {...config.titleStringProps}>{title}</String>}
                {message && (
                  <String size="sm" {...config.messageStringProps}>
                    {message}
                  </String>
                )}
              </Box>
            </Box>
          )}

          {!(customRender || config.render) && (
            <AnimatedBox style={progressStyle} className={cn(twStyles.progressBar, twStyles.progressBarHeight)} />
          )}
        </Box>
      </AnimatedBox>
    </GestureDetector>
  );
}

export default ToastItem;
