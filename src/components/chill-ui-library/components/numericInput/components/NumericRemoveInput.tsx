import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';

import type { NumericRemoveInputProps } from '../../../types/numericInput.types';

import { Icon } from '../../icon';
import { cn } from '../../../utils';
import { numericInputButtonTv } from '../styles/NumericInput.styles';
import { useNumericInputContext } from '../context/NumericInputContext';

export default function NumericRemoveInput(props: PropsWithChildren<NumericRemoveInputProps>) {
  const {
    children,
    className,
    colorVariant = 'primary',
    iconColor,
    iconSize: customIconSize,
    onPress,
    variant = 'contained',
    ...rest
  } = props;
  const { isDisabled, min, onValueChange, size, step = 1, value } = useNumericInputContext();

  const defaultIconSize = {
    lg: 'lg',
    md: 'md',
    sm: 'sm',
    xl: 'lg',
  };

  const handlePress = (e: any) => {
    if (isDisabled) return;

    const newValue = value - step;

    if (min !== undefined && newValue < min) {
      onValueChange?.(min);
    } else {
      onValueChange?.(newValue);
    }

    onPress?.(e);
  };

  return (
    <Pressable
      className={cn(
        'rounded-l-lg',
        numericInputButtonTv({
          color: colorVariant,
          isDisabled,
          size: size || 'md',
          variant,
        }),
        className,
      )}
      onPress={handlePress}
      disabled={isDisabled}
      {...rest}
    >
      {children || (
        <Icon
          name="chill-ui-minus-regular"
          size={customIconSize || (defaultIconSize[size || 'md'] as any)}
          color={iconColor}
        />
      )}
    </Pressable>
  );
}

NumericRemoveInput.displayName = 'NumericRemoveInput';
