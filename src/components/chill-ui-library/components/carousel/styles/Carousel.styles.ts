import { tv } from 'tailwind-variants';

export const twStyles = {
  carousel: 'relative',
  carouselButtonDisabled: 'opacity-50',
  carouselContainer: 'relative',
  carouselDots: 'flex-row gap-2',
  carouselElement: 'absolute w-full items-center justify-center',
  carouselNextButton:
    'absolute right-4 top-1/2 z-50 -translate-y-1/2 items-center justify-center rounded-full bg-[#fff]',
  carouselPrevButton: 'absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#fff]',
  padding2: 'p-2',
};

export const IconTv = tv({
  variants: {
    size: {
      lg: 'size-4',
      md: 'size-3',
      sm: 'size-2',
      xl: 'size-5',
      xs: 'size-1.5',
    },
  },
});
