import { tv } from 'tailwind-variants';

export const chilluiDevToolsTv = tv({
  base: 'absolute z-50 flex-row items-center justify-center gap-2 rounded-xl p-2',
  variants: {
    position: {
      bottom: 'bottom-20',
      top: 'top-20',
    },
    side: {
      left: 'left-5',
      right: 'right-5',
    },
  },
});
