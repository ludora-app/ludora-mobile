import { tv } from 'tailwind-variants';

// height Tailwind Variants
export const heightVr = tv({
  base: 'h-16',
  variants: {
    size: {
      '2xl': 'h-24',
      '2xs': 'h-8',
      lg: 'h-16',
      md: 'h-14',
      sm: 'h-12',
      xl: 'h-20',
      xs: 'h-10',
    },
  },
});

// background color Tailwind Variants
export const btnVariant = tv({
  base: 'bg-primary',
  variants: {
    variant: {
      icon: 'rounded-lg bg-white w-full',
      light: 'bg-white',
      lightBorder: 'bg-white border border-ring',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
    },
  },
});

// position Tailwind Variants
export const positionVr = tv({
  base: 'self-center',
  variants: {
    position: {
      center: 'self-center',
      left: 'self-start',
      right: 'self-end',
    },
  },
});

// opacity Tailwind Variants
export const opacityVariant = tv({
  base: 'opacity-100',
  variants: {
    disabled: {
      true: 'opacity-40',
    },
    loading: {
      true: 'opacity-40',
    },
  },
});

export const textLeftIconPosition = tv({
  variants: {
    textLeftIconPosition: {
      true: 'gap-2',
    },
  },
});
