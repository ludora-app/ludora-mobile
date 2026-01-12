import { cn } from '@chillui/ui';
import { Wrapper } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';

import { useSafeArea } from '@/hooks/safe-area.hook';

const styles = StyleSheet.create({
  footer: {
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      height: -10,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
  },
});

type FooterWrapperProps = {
  className?: string;
};

export default function FooterWrapper(props: PropsWithChildren<FooterWrapperProps>) {
  const { children, className } = props;
  const { bottom } = useSafeArea();
  return (
    <Wrapper
      style={[styles.footer, { paddingBottom: bottom }]}
      className={cn('items-center justify-center bg-background py-2', className)}
    >
      {children}
    </Wrapper>
  );
}
