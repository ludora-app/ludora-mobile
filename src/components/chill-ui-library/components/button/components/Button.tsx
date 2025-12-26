import { Pressable, TouchableOpacity } from 'react-native';
import { forwardRef, PropsWithChildren, useMemo } from 'react';

import type { ButtonProps } from '../../../types';

import { cn } from '../../../utils';
import { ScalePressable } from '../../scalePressable';
import { RipplePressable } from '../../ripplePressable';
import { ButtonContext } from '../context/ButtonContext';
import { buttonDefaultProps } from '../utils/defaultProps';
import { ButtonTv, twStyles } from '../styles/Button.styles';

type SizingVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * Maps button size to sizing variant for child components
 */
function getSizingVariant(size: ButtonProps['size']): SizingVariant {
  switch (size) {
    case '2xl':
      return 'xl';
    case '2xs':
      return 'xs';
    case 'lg':
      return 'md';
    case 'md':
      return 'md';
    case 'sm':
      return 'sm';
    case 'xl':
      return 'lg';
    case 'xs':
      return 'sm';
    default:
      return 'md';
  }
}

/**
 * Renders the appropriate touchable component based on the 'as' prop
 */
const TouchableComponent = forwardRef<any, PropsWithChildren<ButtonProps>>(
  ({ as = buttonDefaultProps.as, children, isDisabled, onPress, ...props }, ref) => {
    const commonProps = {
      disabled: isDisabled,
      onPress: isDisabled ? undefined : onPress,
      ref,
      ...props,
    };

    switch (as) {
      case 'pressable':
        return <Pressable {...commonProps}>{children}</Pressable>;

      case 'ripple-pressable':
        return <RipplePressable {...commonProps}>{children}</RipplePressable>;

      case 'scale-pressable':
        return <ScalePressable {...commonProps}>{children}</ScalePressable>;

      case 'touchable-opacity':
      default:
        return <TouchableOpacity {...commonProps}>{children}</TouchableOpacity>;
    }
  },
);

TouchableComponent.displayName = 'TouchableComponent';

/**
 * The `<Button />` component is a versatile and customizable button for React Native applications.
 * Supports multiple touchable types, loading states, and various styling options.
 *
 * Uses compound components API (shadcn-style)
 *
 * @example
 * ```tsx
 * <Button onPress={handlePress}>
 *   <ButtonContain>
 *     <ButtonIcon name="star" position="left" />
 *     <ButtonContent>
 *       <ButtonTitle>Favorite</ButtonTitle>
 *     </ButtonContent>
 *   </ButtonContain>
 * </Button>
 * ```
 */
const Button = forwardRef<any, PropsWithChildren<ButtonProps>>((props, ref) => {
  const {
    as = buttonDefaultProps.as,
    children,
    className,
    colorVariant = buttonDefaultProps.colorVariant,
    isDisabled,
    onPress,
    size = buttonDefaultProps.size,
    style,
    variant = buttonDefaultProps.variant,
  } = props;

  const sizingVariant = getSizingVariant(size);

  const contextValue = useMemo(
    () => ({
      colorVariant,
      isDisabled: !!isDisabled,
      size,
      sizingVariant,
      variant,
    }),
    [colorVariant, isDisabled, size, sizingVariant, variant],
  );

  return (
    <ButtonContext.Provider value={contextValue}>
      <TouchableComponent
        ref={ref}
        as={as}
        className={cn(
          twStyles.touchableComponent,
          ButtonTv({
            colorVariant,
            isDisabled: !!isDisabled,
            size,
            variant,
          }),
          className,
        )}
        isDisabled={isDisabled}
        onPress={onPress}
        style={style}
      >
        {children}
      </TouchableComponent>
    </ButtonContext.Provider>
  );
});

Button.displayName = 'Button';

export default Button;
