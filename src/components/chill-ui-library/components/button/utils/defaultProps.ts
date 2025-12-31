import { ButtonContentProps } from '../../../types/button.types';

export const buttonDefaultProps = {
  as: 'touchable-opacity' as const,
  colorVariant: 'primary' as const,
  contentPosition: 'center' as const,
  fit: false,
  isDisabled: false,
  isLoading: false,
  position: 'center' as ButtonContentProps['position'],
  size: 'md' as const,
  variant: 'contained' as const,
};
