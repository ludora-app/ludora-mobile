import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';

import type { pelletTv } from '../components/pellet/styles/Pellet.styles';

/**
 * Props for the Pellet component.
 * Simplified for a simple dot/indicator.
 */
export type PelletProps = VariantProps<typeof pelletTv> & {
  /** Custom CSS classes for the pellet container (NativeWind) */
  className?: string;
  /** Whether the pellet is disabled */
  isDisabled?: boolean;
  /** Style object for the pellet container */
  style?: StyleProp<ViewStyle>;
};
