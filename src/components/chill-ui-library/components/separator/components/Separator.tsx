import { Box } from '../../box';
import { cn } from '../../../utils';
import { SeparatorProps } from '../../../types';
import { twStyles } from '../styles/Separator.styles';

/**
 * The `<Separator />` component displays a horizontal line for visual separation.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Separator } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Separator />
 * ```
 *
 * @param className - Custom CSS classes for styling the separator
 * @param viewProps - Rest of the view props
 */
export function Separator(props: SeparatorProps) {
  const { className, ...rest } = props;
  return <Box className={cn(twStyles.separator, className)} {...rest} />;
}

Separator.displayName = 'Separator';
