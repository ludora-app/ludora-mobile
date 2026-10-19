import { VariantProps } from 'tailwind-variants';
import { ComponentType, RefObject } from 'react';
import { ViewProps, ScrollViewProps, ScrollView } from 'react-native';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import {
  KeyboardAvoidingViewProps,
  KeyboardStickyViewProps,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller';

import { wrapperTv } from '../components/wrapper/styles/Wrapper.styles';

type WrapperSafeAreaSide = 'top' | 'right' | 'bottom' | 'left';

export type WrapperSafeAreaOffset = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
 * Safe area edge: `'bottom'` pads by the inset, `'bottom-4'` by the inset plus spacing 4 (16px)
 */
export type WrapperSafeAreaEdge = WrapperSafeAreaSide | `${WrapperSafeAreaSide}-${WrapperSafeAreaOffset}`;

/**
 * Base props for Wrapper components
 */
export type WrapperBaseProps = ViewProps &
  // Safe area variants are driven by `safeArea` only
  Omit<VariantProps<typeof wrapperTv>, 'safeBottom' | 'safeLeft' | 'safeRight' | 'safeTop'> & {
    /** Custom CSS classes for the wrapper (NativeWind only) */
    className?: string;
    /** Safe area edges to pad, optionally with a spacing offset (`'bottom-4'`) */
    safeArea?: WrapperSafeAreaEdge[];
  };

/**
 * Props for Wrapper component (basic container)
 */
export type WrapperProps = WrapperBaseProps;

/**
 * Props for WrapperScrollView component
 */
export type WrapperScrollViewProps = WrapperBaseProps &
  ScrollViewProps & {
    ref?: RefObject<ScrollView | null>;
  };

/**
 * Props for WrapperGestureHandlerScrollView component
 */
export type WrapperGestureHandlerScrollViewProps = WrapperBaseProps &
  ScrollViewProps & {
    contentContainerClassName?: string;
    ref?: RefObject<GestureHandlerScrollView | null>;
  };

/**
 * Props for WrapperSafeAreaView component
 */
export type WrapperSafeAreaViewProps = WrapperBaseProps & {
  emulateUnlessSupported?: boolean;
};

/**
 * Props for WrapperKeyboardAvoidingView component
 */
export type WrapperKeyboardAvoidingViewProps = WrapperBaseProps & KeyboardAvoidingViewProps;

/**
 * Props for WrapperKeyboardAvoidingStickyView component
 */
export type WrapperKeyboardAvoidingStickyViewProps = WrapperBaseProps & KeyboardStickyViewProps;

/**
 * Props for WrapperKeyboardAwareScrollView component
 */
export type WrapperKeyboardAwareScrollViewProps = WrapperBaseProps &
  KeyboardAwareScrollViewProps & {
    /** Bottom offset for keyboard */
    bottomOffset?: number;
    /** Content container className */
    contentContainerClassName?: string;

    /** ScrollView component */
    ScrollViewComponent?: ComponentType<ScrollViewProps>;

    /** Disable scroll on keyboard hide */
    disableScrollOnKeyboardHid?: boolean;

    /** Whether the keyboard aware scroll view is enabled */
    enabled?: boolean;

    /** Extra keyboard space */
    extraKeyboardSpace?: number;
  };
