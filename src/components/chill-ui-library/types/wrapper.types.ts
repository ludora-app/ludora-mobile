import { VariantProps } from 'tailwind-variants';
import { ComponentType, RefObject } from 'react';
import { ViewProps, ScrollViewProps, ScrollView } from 'react-native';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingViewProps, KeyboardStickyViewProps } from 'react-native-keyboard-controller';

import { wrapperTv } from '../components/wrapper/styles/Wrapper.styles';

/**
 * Base props for Wrapper components
 */
export type WrapperBaseProps = ViewProps &
  VariantProps<typeof wrapperTv> & {
    /** Custom CSS classes for the wrapper (NativeWind only) */
    className?: string;
    /** Whether to wrap content in SafeAreaView */
    hasSafeArea?: boolean;
    /** Safe area edges to apply when hasSafeArea is true */
    edges?: ('top' | 'right' | 'bottom' | 'left')[];
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
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
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
  ScrollViewProps & {
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
