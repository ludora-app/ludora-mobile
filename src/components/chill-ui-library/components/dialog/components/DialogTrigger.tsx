import type { DialogTriggerProps } from '../../../types';

import { cn, Slot } from '../../../utils';
import { Box } from '../../box';
import { PropsWithChildren } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressable } from '../../ripplePressable';

import { useDialog } from './DialogContext';
import { twStyles } from '../styles/Dialog.styles';
import { dialogDefaultProps } from '../utils/defaultProps';

/**
 * DialogTrigger component that opens the dialog when pressed.
 * Supports different touchable types and can clone child elements.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DialogTrigger asChild>
 *   <Button title="Cloned Trigger" />
 * </DialogTrigger>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Trigger element that will open the dialog
 * @param className - Custom CSS classes
 * @param style - Style object for the trigger
 * @returns Touchable trigger component with proper event handling
 */
export function DialogTrigger(props: PropsWithChildren<DialogTriggerProps>) {
  const { as = dialogDefaultProps.as, asChild, children, className, style } = props;
  const { open } = useDialog();

  const handlePress = () => {
    console.log('handlePress');
    open();
  };

  if (asChild) {
    return (
      <Slot onPress={handlePress} className={className} style={style}>
        {children}
      </Slot>
    );
  }

  const commonProps = {
    className: cn(twStyles.triggerBase, className),
    onPress: handlePress,
    style,
  };

  if (as === 'ripple-pressable') {
    return (
      <Box>
        <RipplePressable {...commonProps}>{children}</RipplePressable>
      </Box>
    );
  }

  if (as === 'touchable-opacity') {
    return (
      <Box>
        <TouchableOpacity {...commonProps}>{children}</TouchableOpacity>
      </Box>
    );
  }

  return (
    <Box>
      <Pressable {...commonProps}>{children}</Pressable>
    </Box>
  );
}

DialogTrigger.displayName = 'DialogTrigger';
