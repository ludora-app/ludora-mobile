import { Button } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import COLORS from '@/constants/COLORS';
import { useUserMe } from '@/queries/user-me.query';
import { truncateString } from '@/utils/string.utils';
import { ReanimatedBox } from '@/components/chill-ui-library';
import Header from '@/components/ui/header/components/header.component';

const styles = StyleSheet.create({
  orangeHeader: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 0,
  },
});

interface HomeHeaderProps {
  scrollY: SharedValue<number>;
}

export function HomeHeader({ scrollY }: HomeHeaderProps) {
  const { t } = useTranslate();
  const { userMe } = useUserMe();

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolation.CLAMP),
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 200], [0, -50], Extrapolation.CLAMP),
      },
    ],
    zIndex: scrollY.value < 10 ? 10 : 0,
  }));

  return (
    <ReanimatedBox style={[styles.orangeHeader, headerAnimatedStyle]}>
      <Header
        title={t('home.header.title', { username: truncateString({ maxLength: 8, str: userMe?.firstname ?? '' }) })}
        subTitle={t('home.header.sub_title')}
      >
        <Button
          title={t('home.header.button_create_match')}
          colorVariant="inverted"
          as="scale-pressable"
          iconProps={{
            color: COLORS.primary,
            name: 'flash-solid',
            size: 'lg',
          }}
          contentProps={{
            className: 'gap-1',
          }}
        />
      </Header>
    </ReanimatedBox>
  );
}
