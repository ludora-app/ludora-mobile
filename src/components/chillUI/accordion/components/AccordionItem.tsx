import { Pressable } from 'react-native';
import React, { useContext } from 'react';
import { TIcons } from '@/constants/ICONS';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import type { AccordionItemProps } from './Accordion.types';

import cn from '../../cn/cn';
import { Box } from '../../box';
import Icon from '../../icon/Icon';
import { AccordionContext } from './AccordionList';
import String from '../../string/components/String';

function AccordionItem(props: AccordionItemProps) {
  const {
    children,
    contentContainerClassName,
    contentWrapperClassName,
    header,
    headerClassName,
    index,
    itemContainerClassName,
    leftIcon,
    subTitle,
    subTitleClassName,
    title,
    titleClassname,
    titleContainerClassName,
  } = props;
  const accordionContext = useContext(AccordionContext);
  const { androidRipple, animationDuration, compact } = accordionContext;

  // eslint-disable-next-line
  const rightIcon = props.rightIcon || accordionContext.rightIcon || ('chevron-right-solid' as keyof TIcons);

  const open = useSharedValue(false);
  const height = useSharedValue(0);
  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(open.value), {
      duration: animationDuration,
    }),
  );
  const baseWrapperStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));
  const iconRotate = useSharedValue<string>('0deg');
  const animatedIconStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: withSpring(iconRotate.value) }],
  }));

  const onToggleCollapse = () => {
    open.value = !open.value;
    iconRotate.value = iconRotate.value === '90deg' ? '0deg' : '90deg';
  };

  const renderTitle = () =>
    typeof title === 'string' ? (
      <String weight="bold" className={titleClassname}>
        {title}
      </String>
    ) : (
      title
    );

  const renderSubTitle = () =>
    subTitle && (typeof subTitle === 'string' ? <String className={subTitleClassName}>{subTitle}</String> : subTitle);

  const renderHeader = () => (
    <Pressable
      className={cn('flex-row items-start gap-2 border-t border-t-ring p-4', headerClassName, {
        'border-t-0': !compact || (compact && index === 0),
      })}
      android_ripple={androidRipple}
      onPress={onToggleCollapse}
    >
      {header ?? (
        <>
          {leftIcon &&
            (typeof leftIcon === 'string' ? <Icon variant={leftIcon as keyof TIcons} color="#000" /> : leftIcon)}

          <Box className={cn('flex-1', titleContainerClassName)}>
            {renderTitle()}
            {renderSubTitle()}
          </Box>
          <Animated.View style={[animatedIconStyles]}>
            {typeof rightIcon === 'string' ? (
              <Icon variant={rightIcon as keyof TIcons} color="#000" size="sm" />
            ) : (
              rightIcon
            )}
          </Animated.View>
        </>
      )}
    </Pressable>
  );

  return (
    <Box
      className={cn(
        'overflow-hidden',
        { 'border-t-gray-300 rounded-lg bg-white shadow-sm': !compact },
        itemContainerClassName,
      )}
    >
      {renderHeader()}
      <Animated.View style={[baseWrapperStyle]} className={contentWrapperClassName}>
        <Box
          onLayout={e => {
            height.value = e.nativeEvent.layout.height;
          }}
          className={cn('absolute flex w-full p-4 pt-0', contentContainerClassName)}
        >
          {children}
        </Box>
      </Animated.View>
    </Box>
  );
}

export default AccordionItem;
