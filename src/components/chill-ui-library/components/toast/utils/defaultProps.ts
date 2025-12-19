import { ToastPositionProps, ToastVariantProps } from '../../../types';

export const toastDefaultProps = {
  allowMultiple: false,
  maxToasts: 4,
  offsetY: 0,
  position: 'top' as ToastPositionProps,
  swipeable: true,
  variant: 'success' as ToastVariantProps,
};
