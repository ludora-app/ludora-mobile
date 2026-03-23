import { TouchableOpacity, Animated, Pressable } from 'react-native';
import { useState, useEffect, cloneElement, isValidElement, Children, PropsWithChildren } from 'react';

import COLORS from '@/constants/colors.contstants';

import type { AccordionTriggerProps } from '../../../types';

import { Box } from '../../box';
import { Icon } from '../../icon';
import { String } from '../../string';
import { cn, isString } from '../../../utils';
import { useAccordion } from './AccordionContext';
import { twStyles } from '../styles/Accordion.styles';
import { RipplePressable } from '../../ripplePressable';
import { useAccordionItem } from './AccordionItemContext';

/**
 * AccordionTrigger is the clickable header that toggles the accordion item.
 * Supports different trigger types (TouchableOpacity, Pressable, etc.) and custom styling.
 *
 * @example
 * ```tsx
 * <AccordionTrigger as="touchable-opacity">
 *   Is it accessible?
 * </AccordionTrigger>
 *
 * // Using asChild to pass props to child component
 * <AccordionTrigger asChild>
 *   <TouchableOpacity>
 *     <String>Custom Button</String>
 *   </TouchableOpacity>
 * </AccordionTrigger>
 * ```
 *
 * @param as - Component type to use for the trigger (default: TouchableOpacity)
 * @param asChild - Use the child component as the trigger element instead of wrapping it
 * @param children - Content to display in the trigger (Element or string)
 * @param className - Custom CSS classes
 * @param stringProps - Props to pass to String component when children is a string
 * @param style - Additional inline styles
 */
export default function AccordionTrigger(props: PropsWithChildren<AccordionTriggerProps>) {
  const { as, asChild, children, className, stringProps, style } = props;

  const {
    animationDuration,
    collapseIcon,
    disabled: accordionDisabled,
    expandIcon,
    hasCollapseIcon,
    iconPosition,
    isItemOpen,
    toggleItem,
  } = useAccordion();
  const { disabled: itemDisabled, value } = useAccordionItem();

  const isOpen = isItemOpen(value);

  const disabled = accordionDisabled || itemDisabled;

  const [animation] = useState(new Animated.Value(isOpen ? 1 : 0));

  useEffect(() => {
    Animated.timing(animation, {
      duration: animationDuration,
      toValue: isOpen ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [isOpen, animationDuration, animation]);

  const animatedRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handlePress = () => {
    if (!disabled) {
      toggleItem(value);
    }
  };

  const commonProps = {
    className: cn(twStyles.accordionTrigger, { [twStyles.accordionTriggerDisabled]: disabled }, className),
    disabled,
    onPress: handlePress,
    style,
  };

  const renderContent = () => (
    <>
      {hasCollapseIcon && iconPosition === 'left' && (
        <Animated.View
          style={{
            transform: [{ rotate: animatedRotation }],
          }}
          pointerEvents="none"
        >
          <Icon
            name={isOpen ? collapseIcon || 'angle-down-solid' : expandIcon || 'angle-down-solid'}
            color={COLORS.primary}
          />
        </Animated.View>
      )}

      {isString(children) ? (
        <String
          className={cn(
            twStyles.accordionTriggerText,
            hasCollapseIcon && iconPosition === 'left' && twStyles.accordionTriggerTextWithLeftIcon,
            hasCollapseIcon && iconPosition === 'right' && twStyles.accordionTriggerTextWithRightIcon,
          )}
          {...stringProps}
        >
          {children}
        </String>
      ) : (
        <Box
          className={cn(
            hasCollapseIcon && iconPosition === 'left' && twStyles.accordionTriggerTextWithLeftIcon,
            hasCollapseIcon && iconPosition === 'right' && twStyles.accordionTriggerTextWithRightIcon,
          )}
        >
          {children}
        </Box>
      )}

      {hasCollapseIcon && iconPosition === 'right' && (
        <Animated.View
          style={{
            transform: [{ rotate: animatedRotation }],
          }}
          pointerEvents="none"
        >
          <Icon
            name={isOpen ? collapseIcon || 'angle-down-solid' : expandIcon || 'angle-down-solid'}
            color={COLORS.primary}
          />
        </Animated.View>
      )}
    </>
  );

  // Handle asChild case
  if (asChild) {
    const child = Children.only(children);

    if (isValidElement(child)) {
      const childProps = child.props as any;

      return cloneElement(child, {
        ...childProps,
        className: cn(childProps.className, className),
        disabled: disabled || childProps.disabled,
        onPress: (e: any) => {
          childProps.onPress?.(e);
          handlePress();
        },
        style: [childProps.style, style],
      });
    }
  }

  switch (as) {
    case 'pressable':
      return <Pressable {...commonProps}>{renderContent()}</Pressable>;
    case 'ripple-pressable':
      return (
        <RipplePressable {...commonProps} effectColor="#00000030">
          {renderContent()}
        </RipplePressable>
      );
    case 'touchable-opacity':
    default:
      return <TouchableOpacity {...commonProps}>{renderContent()}</TouchableOpacity>;
  }
}
