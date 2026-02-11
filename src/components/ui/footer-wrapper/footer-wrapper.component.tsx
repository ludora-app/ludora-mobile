import { cn } from '@chillui/ui';
import { Wrapper } from '@ludo/ui';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

import { useSafeArea } from '@/hooks/safe-area.hook';

const styles = StyleSheet.create({
  boxShadowBlack: {
    boxShadow: '0px -10px 10px rgba(0, 0, 0, 0.1)',
  },
  boxShadowPrimary: {
    boxShadow: '0px 0px 10px #F1450040',
  },
});
type FooterWrapperProps = {
  hasBottomSafeArea?: boolean;
  shadowVariant?: 'black' | 'primary';
  className?: string;
};

export default function FooterWrapper(props: PropsWithChildren<FooterWrapperProps>) {
  const { children, className, hasBottomSafeArea = false, shadowVariant = 'black' } = props;
  const { bottom } = useSafeArea();
  return (
    <Wrapper
      className={cn('gap-2 bg-white py-2', className)}
      style={[
        shadowVariant === 'black' ? styles.boxShadowBlack : styles.boxShadowPrimary,
        hasBottomSafeArea && { paddingBottom: bottom },
      ]}
      fill={false}
    >
      {children}
    </Wrapper>
  );
}
