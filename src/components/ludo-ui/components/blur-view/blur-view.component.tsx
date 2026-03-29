import { PropsWithChildren } from 'react';
import { GlassView } from 'expo-glass-effect';
import BlurViewRN from '@sbaiahmed1/react-native-blur';

import { IS_ANDROID, IS_IOS } from '@/constants/platform.constants';

import { Box } from '../box';
import { BlurViewProps } from '../../types';

const BLUR_INTENSITY = 10;

export default function BlurView(props: PropsWithChildren<BlurViewProps>) {
  const { blurProps, children, glassProps, onAndroid = 'blur', onIos = 'glass', style } = props;

  if (IS_IOS) {
    if (onIos === 'glass') {
      return (
        <GlassView style={style} {...glassProps}>
          {children}
        </GlassView>
      );
    }
    return (
      <BlurViewRN style={style} blurType="light" blurAmount={BLUR_INTENSITY} {...blurProps}>
        {children}
      </BlurViewRN>
    );
  }

  if (IS_ANDROID) {
    if (onAndroid === 'view') {
      return <Box style={style}>{children}</Box>;
    }
    return (
      <BlurViewRN style={style} blurType="light" blurAmount={BLUR_INTENSITY} {...blurProps}>
        {children}
      </BlurViewRN>
    );
  }

  return <Box style={style}>{children}</Box>;
}
