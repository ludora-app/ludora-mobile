import { tv } from 'tailwind-variants';

export const mascotHaloTv = tv({
  defaultVariants: {
    size: 'md',
  },
  slots: {
    container: 'items-center justify-center',
    halo: 'absolute rounded-full bg-tertiaryHalo',
    icon: '',
  },
  variants: {
    size: {
      // HeaderMascot
      sm: { container: 'size-20', halo: 'size-20', icon: 'size-20' },
      // On-boarding "joined" header
      md: { container: 'h-37.5 w-50', halo: 'size-37.5', icon: 'size-35' },
      // Register header
      lg: { container: 'h-52.5 w-60', halo: 'size-52.5', icon: 'size-47.5' },
      // Full-screen "profile ready"
      xl: { container: 'h-57.5 w-65', halo: 'size-55', icon: 'size-52.5' },
    },
  },
});
