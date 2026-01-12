import { Pressable } from 'react-native';

import type { NumericAddInputProps } from '../../../types/numericInput.types';

import { Icon } from '../../icon';
import { cn } from '../../../utils';
import { numericInputButtonTv } from '../styles/NumericInput.styles';
import { useNumericInputContext } from '../context/NumericInputContext';

export default function NumericAddInput(props: NumericAddInputProps) {
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
  const { isDisabled, max, onValueChange, size, step = 1, value } = useNumericInputContext();

  const defaultIconSize = {
    lg: 'lg',
    md: 'md',
    sm: 'sm',
    xl: 'lg',
  };

  const handlePress = (e: any) => {
    if (isDisabled) return;

    const newValue = value + step;

    if (max !== undefined && newValue > max) {
      onValueChange?.(max);
    } else {
      onValueChange?.(newValue);
    }

    onPress?.(e);
  };

  return (
    <Pressable
      className={cn(
        'rounded-r-lg',
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
          name="chill-ui-add-regular"
          size={customIconSize || (defaultIconSize[size || 'md'] as any)}
          color={iconColor}
        />
      )}
    </Pressable>
  );
}

NumericAddInput.displayName = 'NumericAddInput';
