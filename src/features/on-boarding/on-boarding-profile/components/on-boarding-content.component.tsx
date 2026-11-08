import { BoxGrow } from '@ludo/ui';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

import { ON_BOARDING_HEADER_RADIUS } from '../constants/on-boarding.constants';
import { useIsOnBoardingPlayAreaMapVisible } from '../hooks/on-boarding-steps.hook';

// The screens can't draw outside their bounds: they are pulled up behind the header (z-10) so the map fills its corners
const styles = StyleSheet.create({
  underHeader: {
    marginTop: -ON_BOARDING_HEADER_RADIUS,
  },
});

export const OnBoardingContent = (props: PropsWithChildren) => {
  const { children } = props;
  const isPlayAreaMapVisible = useIsOnBoardingPlayAreaMapVisible();

  return <BoxGrow style={isPlayAreaMapVisible && styles.underHeader}>{children}</BoxGrow>;
};
