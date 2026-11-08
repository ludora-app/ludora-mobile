import { tv } from 'tailwind-variants';

/**
 * `default`: home and lists (design system 9c), with the fill bar.
 * `suggestion`: on-boarding suggestions (design system 9b), bigger texts, orange icons, no fill bar.
 */
export const sessionCardTv = tv({
  defaultVariants: {
    variant: 'default',
  },
  slots: {
    container: '',
    infoRows: '',
    pill: 'items-center justify-center rounded-full px-2.5',
    sportImage: '',
    sportTile: 'items-center justify-center',
  },
  variants: {
    variant: {
      default: {
        container: 'gap-2.5 p-3.5',
        infoRows: 'gap-1',
        pill: 'bg-tertiary py-1',
        sportImage: 'size-7',
        sportTile: 'size-10 rounded-control bg-tertiarySoft',
      },
      suggestion: {
        container: 'gap-3 p-4',
        infoRows: 'gap-1.5',
        pill: 'h-7 bg-primarySoft',
        sportImage: 'size-10.5',
        sportTile: 'size-10.5',
      },
    },
  },
});
