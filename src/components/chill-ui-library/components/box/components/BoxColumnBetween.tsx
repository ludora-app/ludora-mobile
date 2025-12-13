import type { BoxProps } from '../../../types';

import { cn } from '../../../utils';

import { View as NativeView } from './View';
import { twStyles } from '../styles/Box.styles';

/**
 * The `<BoxColumnBetween />` component distributes its children with `space-between` in a vertical column using Tailwind CSS classes.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnBetween className="h-64 p-4">
 *   <String>Header</String>
 *   <String>Content</String>
 *   <Button>Action</Button>
 * </BoxColumnBetween>
 * ```
 *
 * @param className - Additional Tailwind CSS classes to apply to the container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnBetween(props: BoxProps) {
  const { className, ...rest } = props;
  return <NativeView className={cn(twStyles.boxColumnBetween, className)} {...rest} />;
}

BoxColumnBetween.displayName = 'BoxColumnBetween';

export { BoxColumnBetween };
