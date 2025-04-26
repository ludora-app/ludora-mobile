import { cssInterop } from 'nativewind';
import { createElement, ReactElement } from 'react';
import { Animated, Text as NativeText, TextProps as NativeTextProps } from 'react-native';

export interface TextProps extends NativeTextProps {
  className?: string;
  onPress?: () => void;
  useFastText?: boolean;
}

export type FastTextProps = Omit<
  TextProps,
  'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress' | 'pressRetentionOffset'
>;
export function FastText(props: FastTextProps): ReactElement {
  return createElement('RCTText', props);
}

export function Text(props: TextProps) {
  const { children, className, onPress, useFastText = true, ...rest } = props;

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  if (onPress || useFastText === false) {
    return (
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      <NativeText {...rest} className={className || ''} onPressOut={handlePress}>
        {children}
      </NativeText>
    );
  }

  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <FastText {...rest} className={className || ''}>
      {children}
    </FastText>
  );
}

cssInterop(Text, {
  className: {
    target: 'style', // map className->style
  },
});

export const AnimatedText = Animated.createAnimatedComponent(FastText);

cssInterop(AnimatedText, {
  className: {
    target: 'style', // map className->style
  },
});
