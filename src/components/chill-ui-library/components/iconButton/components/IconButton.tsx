import { Pressable, TouchableOpacity } from 'react-native';

import { Box } from '../../box';
import { Icon } from '../../icon';
import { cn } from '../../../utils';
import { ScalePressable } from '../../scalePressable';
import { RipplePressable } from '../../ripplePressable';
import { IconConfig } from '../../icon/context/IconContext';
import { LoadingIndicator } from '../../loadingIndicatorsKit';
import { iconButtonDefaultProps } from '../utils/defaultProps';
import { IconButtonProps } from '../../../types/iconButton.types';
import { iconButtonTv, twStyles } from '../styles/IconButton.styles';

/**
 * The `<ButtonIcon />` component provides a flexible and accessible icon button implementation.
 * Supports multiple touchable types, loading states, and icon customization using NativeWind.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { ButtonIcon } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <ButtonIcon iconName="bell-solid" onPress={handlePress} />
 * ```
 *
 * @param as - Type of touchable component to use: 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable' (default: 'touchable-opacity')
 * @param className - Custom CSS classes for the button container (NativeWind)
 * @param colorVariant - Button color variant: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'accent' | 'dark' | 'light' | 'danger' | 'neutral' | 'muted' | 'tertiary' | 'inverted' | 'white' (default: 'primary')
 * @param iconColor - Color of the icon
 * @param iconName - Name of the icon to display (required)
 * @param isDisabled - Whether the button is disabled
 * @param isLoading - Whether the button is in loading state
 * @param loadingIndicatorProps - Props to pass to the loading indicator
 * @param onPress - Press callback function
 * @param rounded - Button shape: 'circle' | 'square' (default: 'square')
 * @param size - Icon size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
 * @param style - Style object for the button container
 * @param variant - Button style variant: 'contained' | 'outlined' (default: 'contained')
 */
export default function IconButton<T extends IconConfig>(props: IconButtonProps<T>) {
  const {
    as = iconButtonDefaultProps.as,
    className,
    colorVariant = iconButtonDefaultProps.colorVariant,
    iconColor,
    iconName,
    isDisabled = iconButtonDefaultProps.isDisabled,
    isLoading = iconButtonDefaultProps.isLoading,
    loadingIndicatorProps,
    onPress,
    rounded = iconButtonDefaultProps.rounded,
    size,
    style,
    variant = iconButtonDefaultProps.variant,
  } = props;

  const isButtonDisabled = isDisabled || isLoading;

  const commonProps = {
    className: cn(iconButtonTv({ colorVariant, isDisabled, isLoading, rounded, variant }), className),
    disabled: isButtonDisabled,
    onPress: isButtonDisabled ? undefined : onPress,
    style,
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator name="spinner" {...loadingIndicatorProps} />;
    }
    return (
      <Box className={twStyles.pointerEventsNone}>
        <Icon name={iconName} size={size} color={iconColor} />
      </Box>
    );
  };

  switch (as) {
    case 'ripple-pressable':
      return (
        <Box>
          <RipplePressable {...commonProps}>{renderContent()}</RipplePressable>
        </Box>
      );

    case 'pressable':
      return (
        <Box>
          <Pressable {...commonProps}>{renderContent()}</Pressable>
        </Box>
      );
    case 'scale-pressable':
      return (
        <Box>
          <ScalePressable {...commonProps}>{renderContent()}</ScalePressable>
        </Box>
      );
    case 'touchable-opacity':
    default:
      return (
        <Box>
          <TouchableOpacity {...commonProps}>{renderContent()}</TouchableOpacity>
        </Box>
      );
  }
}
