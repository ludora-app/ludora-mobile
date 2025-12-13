import { useState, useCallback } from 'react';
import { ToastPositionProps, ToastVariantProps } from '../../../types';

export const useToastState = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [customRender, setCustomRender] = useState<React.ReactNode>(null);
  const [variant, setVariant] = useState<ToastVariantProps>('success');
  const [toastPosition, setToastPosition] = useState<ToastPositionProps>('bottom');

  const resetState = useCallback(() => {
    setIsVisible(false);
    setMessage('');
    setTitle('');
    setCustomRender(null);
    setVariant('success');
    setToastPosition('bottom');
  }, []);

  const updateToastData = useCallback(
    (
      msg: string,
      variantType: ToastVariantProps,
      position: ToastPositionProps,
      toastTitle?: string,
      render?: React.ReactNode,
    ) => {
      setMessage(msg);
      setTitle(toastTitle || '');
      setCustomRender(render || null);
      setVariant(variantType);
      setToastPosition(position);
    },
    [],
  );

  const showToast = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    customRender,
    hideToast,
    isVisible,
    message,
    resetState,
    showToast,
    title,
    toastPosition,
    updateToastData,
    variant,
  };
};
