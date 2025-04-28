import { tv } from 'tailwind-variants';

// Tailwind Variants
export const textSizeVr = tv({
  base: 'text-lg',
  variants: {
    size: {
      '2xl': 'text-3xl',
      '2xs': 'text-xs',
      '3xl': 'text-4xl',
      '4xl': 'text-5xl leading-snug',
      lg: 'text-xl',
      md: 'text-lg',
      sm: 'text-base',
      xl: 'text-2xl',
      xs: 'text-sm',
    },
  },
});

export const textTypeVr = tv({
  compoundVariants: [
    {
      className: 'font-nunitoLight',
      type: 'regular',
      weight: 'light',
    },
    {
      className: 'font-nunitoRegular',
      type: 'regular',
      weight: 'regular',
    },
    {
      className: 'font-nunitoMedium',
      type: 'regular',
      weight: 'medium',
    },
    {
      className: 'font-nunitoSemiBold',
      type: 'regular',
      weight: 'semiBold',
    },
    {
      className: 'font-nunitoBold',
      type: 'regular',
      weight: 'bold',
    },
    {
      className: 'font-nunitoBlack',
      type: 'regular',
      weight: 'black',
    },
    {
      className: 'font-nunitoLightItalic',
      type: 'italic',
      weight: 'light',
    },
    {
      className: 'font-nunitoItalic',
      type: 'italic',
      weight: 'regular',
    },
    {
      className: 'font-nunitoSemiBoldItalic',
      type: 'italic',
      weight: 'medium',
    },
    {
      className: 'font-nunitoSemiBoldItalic',
      type: 'italic',
      weight: 'semiBold',
    },
    {
      className: 'font-nunitoBoldItalic',
      type: 'italic',
      weight: 'bold',
    },
    {
      className: 'font-nunitoBlackItalic',
      type: 'italic',
      weight: 'black',
    },
  ],
  defaultVariants: {
    type: 'regular',
    weight: 'regular',
  },
  variants: {
    type: {
      italic: '',
      regular: '',
    },
    weight: {
      black: '',
      bold: '',
      light: '',
      medium: '',
      regular: '',
      semiBold: '',
    },
  },
});

export const textColorVr = tv({
  variants: {
    defaultVariants: {
      variant: 'dark',
    },
    variant: {
      danger: 'text-red-500',
      dark: 'text-black',
      destructive: 'text-destructive',
      error: 'text-error',
      info: 'text-blue-300',
      light: 'text-gray-300',
      primary: 'text-primary',
      ring: 'text-ring',
      secondary: 'text-secondary',
      success: 'text-green-500',
      tertiary: 'text-gray-400',
      warning: 'text-yellow-500',
      white: 'text-white',
    },
  },
});

export const textPositionVr = tv({
  base: 'text-left',
  variants: {
    position: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right',
    },
  },
});
