import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

/**
 * Props for the SeparatorContent component
 */
export type SeparatorContentProps = ViewProps & {
  /**
   * Position of the content within the separator
   * - 'left': Content aligned to the left
   * - 'center': Content centered
   * - 'right': Content aligned to the right
   */
  position?: 'left' | 'center' | 'right';

  /** Custom CSS classes for styling the separator content */
  className?: string;
};

/**
 * Props for the SeparatorDivider component
 */

export type SeparatorDividerProps = ViewProps & {
  /** Custom CSS classes for styling the separator content */
  className?: string;
};

export type SeparatorProps = ViewProps & {
  /** Custom CSS classes for styling the separator content */
  className?: string;
};
