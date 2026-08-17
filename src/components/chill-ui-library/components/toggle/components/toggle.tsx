import { useState } from 'react';
import { Switch, View } from 'react-native';

import { ToggleProps } from '../../../types';
import { cn, isUndefined } from '../../../utils';
import { toggleTv } from '../styles/toggle.styles';
import { toggleDefaultProps } from '../utils/defaultProps';

/**
 * Toggle component that provides a switch-like interface for boolean values.
 * Built on top of React Native's Switch component with enhanced styling and state management.
 * Features customizable colors, sizes, and support for loading and disabled states.
 *
 * @example
 * ```tsx
 * // Basic toggle
 * <Toggle value={isEnabled} onChange={setIsEnabled} />
 * ```
 *
 * @param value - Current toggle state (true for on, false for off)
 * @param onChange - Callback function called when toggle state changes
 * @param size - Toggle size variant (default: 'md') lg, md, sm, xl, xs
 * @param isDisabled - Whether the toggle is disabled (default: false)
 * @param isLoading - Whether the toggle is in loading state (default: false)
 * @param className - Custom CSS classes for the container
 * @param thumbColorOn - Color of the thumb when toggle is on
 * @param thumbColorOff - Color of the thumb when toggle is off
 * @param trackColorOn - Color of the track when toggle is on
 * @param trackColorOff - Color of the track when toggle is off
 * @param style - Custom style for the container (only NativeWind)
 * @returns Toggle component with switch-like interface
 */
export function Toggle(props: ToggleProps) {
  const {
    className,
    isDisabled = toggleDefaultProps.isDisabled,
    isLoading = toggleDefaultProps.isLoading,
    onChange,
    size = toggleDefaultProps.size,
    style,
    thumbColorOff,
    thumbColorOn,
    trackColorOff,
    trackColorOn,
    value,
  } = props;
  const isControlled = !isUndefined(value);
  const [internalValue, setInternalValue] = useState(value ?? false);
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (v: boolean) => {
    if (isDisabled || isLoading) return;
    if (!isControlled) {
      setInternalValue(v);
    }
    onChange?.(v);
  };

  return (
    <View className={cn(toggleTv({ size }), className)} style={style}>
      <Switch
        disabled={isLoading || isDisabled}
        ios_backgroundColor={trackColorOff}
        onValueChange={handleChange}
        thumbColor={
          currentValue
            ? (thumbColorOn ?? toggleDefaultProps.thumbColorOn)
            : (thumbColorOff ?? toggleDefaultProps.thumbColorOff)
        }
        trackColor={{
          false: trackColorOff ?? toggleDefaultProps.trackColorOff,
          true: trackColorOn ?? toggleDefaultProps.trackColorOn,
        }}
        value={currentValue}
      />
    </View>
  );
}

Toggle.displayName = 'Toggle';
