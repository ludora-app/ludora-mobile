import { DialogContentProps } from '../../../types';

/**
 * Default props for Dialog component
 */
export const dialogDefaultProps = {
  animation: 'fade' as DialogContentProps['animation'],
  as: 'pressable' as const,
  closeOnBackdropPress: true,
  closeOnGoBack: true,
  hasBackdrop: true,
  size: 'md' as DialogContentProps['size'],
  useDefaultContainer: true,
};
