import { PropsWithChildren } from 'react';

import type { AvatarProps } from '../../../types';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { avatarTv } from '../styles/Avatar.styles';
import { AvatarProvider } from '../context/AvatarContext';
import { avatarDefaultProps } from '../utils/defaultProps';

/**
 * The <Avatar /> component displays user profile images with fallback to initials.
 * Supports different sizes, shapes, and touchable interactions.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Avatar } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Avatar
 *   data={{
 *     firstname: 'John',
 *     lastname: 'Doe',
 *     image_url: 'https://example.com/avatar.jpg'
 *   }}
 *   size="lg"
 *   variant="square"
 * />
 * ```
 *
 * @param color - Custom background color
 * @param className - Custom CSS classes (only used with NativeWind)
 * @param size - Avatar size variant (default: 'md')
 * @param style - Custom inline styles
 * @param variant - Avatar shape variant (default: 'circle') - 'circle' | 'square'
 *
 * @see {@link https://github.com/your-repo/chill-ui/tree/main/src/components/avatar/README.md Documentation}
 */
export default function Avatar(props: PropsWithChildren<AvatarProps>) {
  const {
    children,
    className,
    color,
    size = avatarDefaultProps.size,
    style,
    variant = avatarDefaultProps.variant,
  } = props;

  const commonProps = {
    className: cn(avatarTv({ size, variant }), className),
    style: [{ ...(color && { backgroundColor: color }) }, style],
  };

  return (
    <AvatarProvider size={size}>
      <Box {...commonProps}>{children}</Box>
    </AvatarProvider>
  );
}
