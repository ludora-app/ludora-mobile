import { Wrapper } from '@ludo/ui';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

import { useSafeArea } from '@/hooks/safe-area.hook';

const styles = StyleSheet.create({
  footer: {
    boxShadow: '0px -10px 10px rgba(0, 0, 0, 0.1)',
  },
});
type FormSheetFooterProps = {
  hasBottomSafeArea?: boolean;
};

export default function FormSheetFooter(props: PropsWithChildren<FormSheetFooterProps>) {
  const { children, hasBottomSafeArea = false } = props;
  const { bottom } = useSafeArea();
  return (
    <Wrapper
      className="gap-2 py-2"
      style={[styles.footer, hasBottomSafeArea && { paddingBottom: bottom }]}
      fill={false}
    >
      {children}
    </Wrapper>
  );
}
