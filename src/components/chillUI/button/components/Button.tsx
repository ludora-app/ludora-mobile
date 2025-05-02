import { Link } from 'expo-router';
import COLORS from '@/constants/COLORS';
import { twMerge } from 'tailwind-merge';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Box } from '../../box';
import { Icon } from '../../icon';
import { BtnProps } from '../../utils/types';
import String from '../../string/components/String';
import { heightVr, btnVariant, positionVr, opacityVariant, textLeftIconPosition } from '../utils/styleVariants';

const loadingIconSize = (size: string) => {
  switch (size) {
    case '2xs':
      return 20;
    case 'xs':
      return 24;
    case 'sm':
      return 28;
    case 'md':
      return 32;
    case 'lg':
      return 36;
    default:
      return 32;
  }
};

export default function Button({
  btnClassName,
  children,
  disabled,
  leftIcon,
  loading,
  onPress,
  position = 'center',
  redirect,
  size = 'md',
  textClassName,
  textLeftIcon,
  textSize,
  textWeight = 'bold',
  title,
  variant = 'primary',
  ...props
}: BtnProps) {
  const stringVariant = () => {
    switch (variant) {
      case 'primary':
        return 'white';
      case 'secondary':
        return 'primary';
      case 'light':
        return 'primary';
      case 'lightBorder':
        return 'dark';
      default:
        return 'white';
    }
  };

  const button = (
    <TouchableOpacity
      onPress={onPress}
      className={twMerge(
        'w-full items-center justify-center rounded-full',
        heightVr({ size }),
        btnVariant({ variant }),
        positionVr({ position }),
        opacityVariant({ disabled, loading }),
        btnClassName,
      )}
      disabled={disabled || loading}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    >
      {children}
      {loading ? (
        <ActivityIndicator color="#fff" size={loadingIconSize(size)} />
      ) : (
        <Box
          className={twMerge(
            'w-full flex-row items-center justify-center',
            textLeftIconPosition({
              textLeftIconPosition: !!textLeftIcon && !!title,
            }),
          )}
        >
          {leftIcon && (
            <Box className="absolute left-4">
              <Icon variant={leftIcon} color={variant === 'light' ? COLORS.primary : '#fff'} />
            </Box>
          )}
          {textLeftIcon && textLeftIcon}
          {!!title && (
            <String
              className={textClassName ?? ''}
              weight={textWeight}
              variant={stringVariant()}
              size={textSize ?? size}
              position="center"
            >
              {title}
            </String>
          )}
        </Box>
      )}
    </TouchableOpacity>
  );
  return redirect ? (
    <Link href={redirect} asChild>
      {button}
    </Link>
  ) : (
    button
  );
}
