import { tv } from 'tailwind-variants';

import type { WrapperSafeAreaEdge, WrapperSafeAreaOffset } from '../../../types';

export const twStyles = {
  keyboardAvoidingView: 'flex-1',
  safeArea: 'z-50 flex-1 px-3',
  scrollView: 'flex-grow',
};

export const wrapperTv = tv({
  defaultVariants: {
    px: 'md',
  },
  variants: {
    fill: {
      true: 'flex-1',
    },
    grow: {
      true: 'flex-grow',
    },
    px: {
      lg: 'px-[24px]',
      md: 'px-[16px]',
      none: 'px-0',
      sm: 'px-[8px]',
      xl: 'px-[32px]',
      xs: 'px-[4px]',
    },
    // Full class names so Uniwind's scanner generates them (`pb-safe-offset-${n}` would be missed)
    safeBottom: {
      1: 'android:pb-safe-offset-1 pb-safe',
      2: 'android:pb-safe-offset-2 pb-safe',
      3: 'android:pb-safe-offset-3 pb-safe',
      4: 'android:pb-safe-offset-4 pb-safe',
      5: 'android:pb-safe-offset-5 pb-safe',
      6: 'android:pb-safe-offset-6 pb-safe',
      7: 'android:pb-safe-offset-7 pb-safe',
      8: 'android:pb-safe-offset-8 pb-safe',
      true: 'android:pb-safe-offset-5 pb-safe',
    },
    safeLeft: {
      1: 'pl-safe-offset-1',
      2: 'pl-safe-offset-2',
      3: 'pl-safe-offset-3',
      4: 'pl-safe-offset-4',
      5: 'pl-safe-offset-5',
      6: 'pl-safe-offset-6',
      7: 'pl-safe-offset-7',
      8: 'pl-safe-offset-8',
      true: 'pl-safe',
    },
    safeRight: {
      1: 'pr-safe-offset-1',
      2: 'pr-safe-offset-2',
      3: 'pr-safe-offset-3',
      4: 'pr-safe-offset-4',
      5: 'pr-safe-offset-5',
      6: 'pr-safe-offset-6',
      7: 'pr-safe-offset-7',
      8: 'pr-safe-offset-8',
      true: 'pr-safe',
    },
    safeTop: {
      1: 'pt-safe-offset-1',
      2: 'pt-safe-offset-2',
      3: 'pt-safe-offset-3',
      4: 'pt-safe-offset-4',
      5: 'pt-safe-offset-5',
      6: 'pt-safe-offset-6',
      7: 'pt-safe-offset-7',
      8: 'pt-safe-offset-8',
      true: 'android:pt-safe-offset-2 pt-safe',
    },
  },
});

const SAFE_AREA_VARIANTS = {
  bottom: 'safeBottom',
  left: 'safeLeft',
  right: 'safeRight',
  top: 'safeTop',
} as const;

type SafeAreaVariants = Partial<
  Record<(typeof SAFE_AREA_VARIANTS)[keyof typeof SAFE_AREA_VARIANTS], true | WrapperSafeAreaOffset>
>;

/**
 * `tv` takes one value per variant, so `['top', 'bottom-4']` becomes `{ safeBottom: 4, safeTop: true }`
 */
export const getSafeAreaVariants = (safeArea: WrapperSafeAreaEdge[] = []) =>
  safeArea.reduce<SafeAreaVariants>((variants, edge) => {
    const [side, offset] = edge.split('-') as [keyof typeof SAFE_AREA_VARIANTS, string | undefined];
    return { ...variants, [SAFE_AREA_VARIANTS[side]]: offset ? (Number(offset) as WrapperSafeAreaOffset) : true };
  }, {});
