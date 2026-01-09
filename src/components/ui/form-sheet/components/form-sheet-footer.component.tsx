import { Wrapper } from '@ludo/ui';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

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

export default function FormSheetFooter(props: PropsWithChildren) {
  const { children } = props;
  const { bottom } = useSafeArea();
  return (
    <Wrapper className="gap-2 bg-white py-2" style={[styles.footer, { paddingBottom: bottom }]} fill={false}>
      {children}
    </Wrapper>
  );
}
