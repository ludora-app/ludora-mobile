import { cssInterop } from 'nativewind';
import Animated from 'react-native-reanimated';
import { ViewProps as NativeViewProps } from 'react-native';
import NativeView from 'react-native/Libraries/Components/View/ViewNativeComponent';

import { AnimatedViewProps } from '../utils/types';

const AnimatedNativeView = Animated.createAnimatedComponent(NativeView);

export function View(props: NativeViewProps) {
  const { children, ...rest } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <NativeView {...rest}>{children}</NativeView>;
}

cssInterop(View, {
  className: {
    target: 'style', // map className->style
  },
});

export function AnimatedView(props: AnimatedViewProps) {
  const { children, ...rest } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AnimatedNativeView {...rest}>{children}</AnimatedNativeView>;
}

cssInterop(AnimatedView, {
  className: {
    target: 'style', // map className->style
  },
});
