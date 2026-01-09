import { cn, Slot } from '../../../utils';
import { Box } from '../../box';
import { PropsWithChildren } from 'react';
import { SegmentedControlPanelProps } from '../../../types';

import { twStyles } from '../styles/SegmentedControl.styles';
import { useSegmentedControlState } from '../context/SegmentedControlContext';

/**
 * Panel that renders content when its value matches the selected option.
 *
 * @example
 * ```tsx
 * <SegmentedControlPanel value="option1">
 *   <Box className="p-4 bg-blue-100 rounded-lg">
 *     <String className="text-lg font-bold">Content for Option 1</String>
 *   </Box>
 * </SegmentedControlPanel>
 * ```
 *
 * @param value - The value that must match the selected option to display this panel (required)
 * @param asChild - Whether to use the asChild pattern, rendering children directly without wrapper (default: false)
 * @param className - Custom CSS classes for styling the panel container (NativeWind)
 * @param style - Style object for the panel container (React Native)
 * @param children - Child components to render when this panel is active (required)
 * @param ...rest - All other props from View component (onLayout, testID, accessibilityLabel, etc.)
 * @returns SegmentedControlPanel component that conditionally renders content
 * @throws Error if used outside of SegmentedControlProvider context
 */
export function SegmentedControlPanel(props: PropsWithChildren<SegmentedControlPanelProps>) {
  const { asChild, children, className, forceRender, value, ...rest } = props;
  const { selectedOption } = useSegmentedControlState();

  if (!forceRender && selectedOption !== value) {
    return null;
  }

  if (asChild) {
    return (
      <Slot className={className} {...rest}>
        {children}
      </Slot>
    );
  }

  return (
    <Box className={cn(twStyles.panelContainer, className)} {...rest}>
      {children}
    </Box>
  );
}

SegmentedControlPanel.displayName = 'SegmentedControlPanel';
