import { useCallback, useMemo } from 'react';

import { useToastState } from './useToastState';
import { variantConfig } from '../utils/toastConfig';
import { useToastAnimation } from './useToastAnimation';
import { ToastVariantProps, ToastPositionProps } from '../../../types';

export const useToast = (variants: any, onDismiss?: () => void) => {
  const {
    customRender,
    hideToast: hideToastState,
    isVisible,
    message,
    showToast: showToastState,
    title,
    toastPosition,
    updateToastData,
    variant,
  } = useToastState();

  const {
    hideToast: hideToastAnimation,
    opacity,
    progressWidth,
    scale,
    showToast: showToastAnimation,
    translateY,
  } = useToastAnimation();

  const getConfig = useCallback(
    (variantType: ToastVariantProps) => {
      const defaultConfig = variantConfig[variantType];
      const customConfig = variants[variantType];

      if (!customConfig) return defaultConfig;
      if (!defaultConfig) return customConfig;

      return {
        ...defaultConfig,
        ...customConfig,
        iconProps: { ...defaultConfig.iconProps, ...customConfig.iconProps },
        messageStringProps: { ...defaultConfig.messageStringProps, ...customConfig.messageStringProps },
        titleStringProps: { ...defaultConfig.titleStringProps, ...customConfig.titleStringProps },
      };
    },
    [variants],
  );

  const showToast = useCallback(
    (
      msg: string,
      toastTitle?: string,
      render?: React.ReactNode,
      variantType: ToastVariantProps = 'info',
      position: ToastPositionProps = 'bottom',
      duration: number = 3000,
    ) => {
      updateToastData(msg, variantType, position, toastTitle, render);

      showToastState();

      requestAnimationFrame(() => {
        showToastAnimation(position, duration).then(() => {
          hideToastAnimation(position).then(() => {
            hideToastState();
            if (onDismiss) {
              onDismiss();
            }
          });
        });
      });
    },
    [updateToastData, showToastState, showToastAnimation, hideToastAnimation, hideToastState, onDismiss],
  );
  const config = useMemo(() => getConfig(variant), [variant, getConfig]);

  return {
    config,
    customRender,
    isVisible,
    message,
    opacity,
    progressWidth,
    scale,
    showToast,
    title,
    toastPosition,
    translateY,
    variant,
  };
};
