import { tv } from 'tailwind-variants';

// Main Button Tailwind Variant
export const ButtonTv = tv({
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

    fit: {
      true: 'self-start',
    },
    isDisabled: {
      true: 'opacity-[0.4]',
    },
    size: {
      '2xl': 'h-[64px]',
      '2xs': 'h-[28px]',
      lg: 'h-[48px]',
      md: 'h-[40px]',
      sm: 'h-[36px]',
      xl: 'h-[56px]',
      xs: 'h-[32px]',
    },
    variant: {
      contained: 'border-transparent',
      outlined: 'bg-transparent',
      text: 'bg-transparent border-transparent',
    },
  },
});

// Button String/Title Tailwind Variants
export const ButtonStringTv = tv({
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
    // Text variants - use background color
    {
      className: 'text-button-accent-background',
      colorVariant: 'accent',
      variant: 'text',
    },
    {
      className: 'text-button-danger-background',
      colorVariant: 'danger',
      variant: 'text',
    },
    {
      className: 'text-button-dark-background',
      colorVariant: 'dark',
      variant: 'text',
    },
    {
      className: 'text-button-error-background',
      colorVariant: 'error',
      variant: 'text',
    },
    {
      className: 'text-button-info-background',
      colorVariant: 'info',
      variant: 'text',
    },
    {
      className: 'text-button-inverted-background',
      colorVariant: 'inverted',
      variant: 'text',
    },
    {
      className: 'text-button-light-background',
      colorVariant: 'light',
      variant: 'text',
    },
    {
      className: 'text-button-muted-background',
      colorVariant: 'muted',
      variant: 'text',
    },
    {
      className: 'text-button-neutral-background',
      colorVariant: 'neutral',
      variant: 'text',
    },
    {
      className: 'text-button-primary-background',
      colorVariant: 'primary',
      variant: 'text',
    },
    {
      className: 'text-button-secondary-background',
      colorVariant: 'secondary',
      variant: 'text',
    },
    {
      className: 'text-button-success-background',
      colorVariant: 'success',
      variant: 'text',
    },
    {
      className: 'text-button-tertiary-background',
      colorVariant: 'tertiary',
      variant: 'text',
    },
    {
      className: 'text-button-warning-background',
      colorVariant: 'warning',
      variant: 'text',
    },
    {
      className: 'text-button-white-background',
      colorVariant: 'white',
      variant: 'text',
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

    variant: {
      contained: '',
      outlined: '',
      text: '',
    },
  },
});

export const buttonContentTv = tv({
  variants: {
    fit: { false: 'flex-1' },
    position: {
      center: 'justify-center',
      left: 'justify-start',
      right: 'justify-end',
    },
  },
});

export const twStyles = {
  content: 'flex-row items-center',
  pointerEventsNone: 'pointer-events-none',
  touchableComponent: 'px-3 rounded-lg border-2 items-center flex-row',
};
