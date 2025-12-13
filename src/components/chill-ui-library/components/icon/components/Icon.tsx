import { Pressable, TouchableOpacity } from 'react-native';

import type { IconProps } from '../../../types';
import type { IconConfig } from '../context/IconContext';

import { Box } from '../../box';
import { cn } from '../../../utils';
import CustomIcon from './CustomIcon';
import { RipplePressable } from '../../ripplePressable';
import { iconDefaultProps } from '../utils/defaultProps';
import { iconSizeTv, iconPressableTv, iconPaddingTv, twStyles } from '../styles/Icon.styles';
/**
 * The `<Icon />` component displays SVG icons with customizable size, color, and press interactions.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Icon } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Icon name="heart-solid" />
 * ```
 *
 * @param as - Component to use when pressable: 'pressable' | 'touchable-opacity' | 'ripple-pressable' (default: 'pressable')
 * @param className - Custom CSS classes for the icon container (NativeWind)
 * @param color - Icon color (default: '#000')
 * @param hasPressEffect - Whether to show press effect when pressed (default: true)
 * @param name - Icon name from the available icon set (required)
 * @param onPress - Callback function when icon is pressed
 * @param pressEffectSize - Size of the press effect padding
 * @param pressEffectStyle - Custom styles for the press effect
 * @param size - Icon size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' (default: 'md')
 * @param style - Additional inline styles
 */
export default function Icon<T extends IconConfig>(props: IconProps<T>) {
  const {
    as,
    className,
    color,
    hasPressEffect = iconDefaultProps.hasPressEffect,
    name,
    onPress,
    pressEffectSize,
    size = iconDefaultProps.size,
    style,
  } = props;

  const iconContent = (
    <CustomIcon name={name} className={cn(iconSizeTv({ size }), className)} style={style} color={color} />
  );

  if (!onPress) {
    return iconContent;
  }

  switch (as) {
    case 'ripple-pressable':
      return (
        <Box>
          <RipplePressable className={cn(twStyles.iconBase, className)} style={style} onPress={onPress}>
            {iconContent}
          </RipplePressable>
        </Box>
      );
    case 'touchable-opacity':
      return (
        <Box>
          <TouchableOpacity className={cn(twStyles.iconBase, className)} style={style} onPress={onPress}>
            {iconContent}
          </TouchableOpacity>
        </Box>
      );

    case 'pressable':
    default:
      return (
        <Box>
          <Pressable
            className={cn(
              twStyles.iconBase,
              iconPressableTv({ hasPressEffect }),
              hasPressEffect && iconPaddingTv({ size: pressEffectSize ?? size }),
              className,
            )}
            style={style}
            onPress={onPress}
          >
            {iconContent}
          </Pressable>
        </Box>
      );
  }
}
