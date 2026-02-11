import { Wrapper } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import { cn, WrapperProps } from '@chillui/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 12px 14px rgba(0, 0, 0, 0.1)',
  },
});

type HeaderWrapperProps = {
  className?: string;
  hasTopSafeArea?: boolean;
  hasShadow?: boolean;
  px?: WrapperProps['px'];
};

export default function HeaderWrapper(props: PropsWithChildren<HeaderWrapperProps>) {
  const { children, className, hasShadow = false, hasTopSafeArea = false, px } = props;
  const { top } = useSafeArea();
  return (
    <Wrapper
      style={[hasShadow && styles.shadow, { paddingTop: hasTopSafeArea ? top : 0 }]}
      className={cn('z-10 justify-center bg-white py-2', className)}
      px={px}
    >
      {children}
    </Wrapper>
  );
}
