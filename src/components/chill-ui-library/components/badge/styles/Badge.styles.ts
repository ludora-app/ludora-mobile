import { tv } from 'tailwind-variants';

export const twStyles = {
  badgeContent:
    'absolute bg-button-primary-background rounded-full justify-center items-center z-50 border border-background',
  pointerEventsNone: 'pointer-events-none',
};

export const BadgeStringTv = tv({
  base: 'pointer-events-none',
  compoundVariants: [
    // Contained variants - use content color
    {
      className: 'text-button-accent-content',
      colorVariant: 'accent',
      variant: 'contained',
    },
    {
      className: 'text-button-danger-content',
      colorVariant: 'danger',
      variant: 'contained',
    },
    {
      className: 'text-button-dark-content',
      colorVariant: 'dark',
      variant: 'contained',
    },
    {
      className: 'text-button-error-content',
      colorVariant: 'error',
      variant: 'contained',
    },
    {
      className: 'text-button-info-content',
      colorVariant: 'info',
      variant: 'contained',
    },
    {
      className: 'text-button-inverted-content',
      colorVariant: 'inverted',
      variant: 'contained',
    },
    {
      className: 'text-button-light-content',
      colorVariant: 'light',
      variant: 'contained',
    },
    {
      className: 'text-button-muted-content',
      colorVariant: 'muted',
      variant: 'contained',
    },
    {
      className: 'text-button-neutral-content',
      colorVariant: 'neutral',
      variant: 'contained',
    },
    {
      className: 'text-button-primary-content',
      colorVariant: 'primary',
      variant: 'contained',
    },
    {
      className: 'text-button-secondary-content',
      colorVariant: 'secondary',
      variant: 'contained',
    },
    {
      className: 'text-button-success-content',
      colorVariant: 'success',
      variant: 'contained',
    },
    {
      className: 'text-button-tertiary-content',
      colorVariant: 'tertiary',
      variant: 'contained',
    },
    {
      className: 'text-button-warning-content',
      colorVariant: 'warning',
      variant: 'contained',
    },
    {
      className: 'text-button-white-content',
      colorVariant: 'white',
      variant: 'contained',
    },
    // Outlined variants - use background color
    {
      className: 'text-button-accent-background',
      colorVariant: 'accent',
      variant: 'outlined',
    },
    {
      className: 'text-button-danger-background',
      colorVariant: 'danger',
      variant: 'outlined',
    },
    {
      className: 'text-button-dark-background',
      colorVariant: 'dark',
      variant: 'outlined',
    },
    {
      className: 'text-button-error-background',
      colorVariant: 'error',
      variant: 'outlined',
    },
    {
      className: 'text-button-info-background',
      colorVariant: 'info',
      variant: 'outlined',
    },
    {
      className: 'text-button-inverted-background',
      colorVariant: 'inverted',
      variant: 'outlined',
    },
    {
      className: 'text-button-light-background',
      colorVariant: 'light',
      variant: 'outlined',
    },
    {
      className: 'text-button-muted-background',
      colorVariant: 'muted',
      variant: 'outlined',
    },
    {
      className: 'text-button-neutral-background',
      colorVariant: 'neutral',
      variant: 'outlined',
    },
    {
      className: 'text-button-primary-background',
      colorVariant: 'primary',
      variant: 'outlined',
    },
    {
      className: 'text-button-secondary-background',
      colorVariant: 'secondary',
      variant: 'outlined',
    },
    {
      className: 'text-button-success-background',
      colorVariant: 'success',
      variant: 'outlined',
    },
    {
      className: 'text-button-tertiary-background',
      colorVariant: 'tertiary',
      variant: 'outlined',
    },
    {
      className: 'text-button-warning-background',
      colorVariant: 'warning',
      variant: 'outlined',
    },
    {
      className: 'text-button-white-background',
      colorVariant: 'white',
      variant: 'outlined',
    },
  ],
  variants: {
    colorVariant: {
      accent: '',
      danger: '',
      dark: '',
      error: '',
      info: '',
      inverted: '',
      light: '',
      muted: '',
      neutral: '',
      primary: '',
      secondary: '',
      success: '',
      tertiary: '',
      warning: '',
      white: '',
    },

    size: {
      lg: 'text-lg',
      md: 'text-base',
      sm: 'text-sm',
      xs: 'text-xs',
    },
    variant: {
      contained: '',
      outlined: '',
    },
  },
});

export const badgeTv = tv({
  compoundVariants: [
    // Outlined variants
    {
      className: 'border-button-accent-background',
      colorVariant: 'accent',
      variant: 'outlined',
    },
    {
      className: 'border-button-dark-background',
      colorVariant: 'dark',
      variant: 'outlined',
    },
    {
      className: 'border-button-error-background',
      colorVariant: 'error',
      variant: 'outlined',
    },
    {
      className: 'border-button-info-background',
      colorVariant: 'info',
      variant: 'outlined',
    },
    {
      className: 'border-button-light-background',
      colorVariant: 'light',
      variant: 'outlined',
    },
    {
      className: 'border-button-primary-background',
      colorVariant: 'primary',
      variant: 'outlined',
    },
    {
      className: 'border-button-secondary-background',
      colorVariant: 'secondary',
      variant: 'outlined',
    },
    {
      className: 'border-button-success-background',
      colorVariant: 'success',
      variant: 'outlined',
    },
    {
      className: 'border-button-warning-background',
      colorVariant: 'warning',
      variant: 'outlined',
    },
    {
      className: 'border-button-danger-background',
      colorVariant: 'danger',
      variant: 'outlined',
    },
    {
      className: 'border-button-neutral-background',
      colorVariant: 'neutral',
      variant: 'outlined',
    },
    {
      className: 'border-button-muted-background',
      colorVariant: 'muted',
      variant: 'outlined',
    },
    {
      className: 'border-button-tertiary-background',
      colorVariant: 'tertiary',
      variant: 'outlined',
    },
    {
      className: 'border-button-inverted-background',
      colorVariant: 'inverted',
      variant: 'outlined',
    },
    {
      className: 'border-button-white-background',
      colorVariant: 'white',
      variant: 'outlined',
    },
    // Size + Position + Side combinations
    // LG size
    { className: '-top-3 -left-3', position: 'top', side: 'left', size: 'lg' },
    { className: '-top-3 -right-3', position: 'top', side: 'right', size: 'lg' },
    { className: '-bottom-3 -left-3', position: 'bottom', side: 'left', size: 'lg' },
    { className: '-bottom-3 -right-3', position: 'bottom', side: 'right', size: 'lg' },
    // MD size
    { className: '-top-2 -left-2', position: 'top', side: 'left', size: 'md' },
    { className: '-top-2 -right-2', position: 'top', side: 'right', size: 'md' },
    { className: '-bottom-2 -left-2', position: 'bottom', side: 'left', size: 'md' },
    { className: '-bottom-2 -right-2', position: 'bottom', side: 'right', size: 'md' },
    // SM size
    { className: '-top-1.5 -left-1.5', position: 'top', side: 'left', size: 'sm' },
    { className: '-top-1.5 -right-1.5', position: 'top', side: 'right', size: 'sm' },
    { className: '-bottom-1.5 -left-1.5', position: 'bottom', side: 'left', size: 'sm' },
    { className: '-bottom-1.5 -right-1.5', position: 'bottom', side: 'right', size: 'sm' },
    // XS size
    { className: '-top-1 -left-1', position: 'top', side: 'left', size: 'xs' },
    { className: '-top-1 -right-1', position: 'top', side: 'right', size: 'xs' },
    { className: '-bottom-1 -left-1', position: 'bottom', side: 'left', size: 'xs' },
    { className: '-bottom-1 -right-1', position: 'bottom', side: 'right', size: 'xs' },
  ],
  variants: {
    colorVariant: {
      accent: 'bg-button-accent-background',
      danger: 'bg-button-danger-background',
      dark: 'bg-button-dark-background',
      error: 'bg-button-error-background',
      info: 'bg-button-info-background',
      inverted: 'bg-button-inverted-background',
      light: 'bg-button-light-background',
      muted: 'bg-button-muted-background',
      neutral: 'bg-button-neutral-background',
      primary: 'bg-button-primary-background',
      secondary: 'bg-button-secondary-background',
      success: 'bg-button-success-background',
      tertiary: 'bg-button-tertiary-background',
      warning: 'bg-button-warning-background',
      white: 'bg-button-white-background',
    },
    position: {
      bottom: '-bottom-2',
      top: '-top-2',
    },
    side: {
      left: '-left-2',
      right: '-right-2',
    },
    size: {
      lg: 'size-[26px]',
      md: 'size-[24px]',
      sm: 'size-[22px]',
      xs: 'size-[20px]',
    },
    variant: {
      contained: 'border-transparent',
      outlined: 'bg-transparent',
    },
  },
});
