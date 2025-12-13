// Font weight mapping for better cross-platform support
export const fontWeights = {
  '100': '100',
  '200': '200',
  '300': '300',
  '400': '400',
  '500': '500',
  '600': '600',
  '700': '700',
  '800': '800',
  '900': '900',
  black: '900',
  bold: '700',
  heavy: '800',
  light: '200',
  medium: '500',
  normal: '400',
  semibold: '600',
  thin: '100',
} as const;

// Font style options
export const fontStyles = {
  italic: 'italic',
  normal: 'normal',
} as const;
