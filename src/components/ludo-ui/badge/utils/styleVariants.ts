import { tv } from 'tailwind-variants';

const backgroundVariants = tv({
  variants: {
    defaultVariants: {
      backgroundColor: 'default',
    },
    variant: {
      black: 'bg-black',
      bluePrimary: 'bg-bluePrimary',
      default: 'bg-ring',
      destructive: 'bg-destructive',
      primary: 'bg-primary',
      purplePrimary: 'bg-purplePrimary',
      secondary: 'bg-secondary',
      white: 'bg-white',
    },
  },
});

export default backgroundVariants;
