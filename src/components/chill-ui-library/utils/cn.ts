import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Design system radii from global.css `--radius-*`, so `rounded-field` and `rounded-full` override each other
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ['badge', 'button', 'button-sm', 'card', 'control', 'field', 'header', 'sheet'],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
