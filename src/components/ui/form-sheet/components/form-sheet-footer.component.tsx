import { Wrapper } from '@ludo/ui';
import { PropsWithChildren } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';

import { useSafeArea } from '@/hooks/safe-area.hook';

const styles = StyleSheet.create({
  boxShadowBlack: {
    boxShadow: '0px -10px 10px rgba(0, 0, 0, 0.1)',
  },
  boxShadowPrimary: {
    boxShadow: '0px 0px 10px #F1450040',
  },
});
type FormSheetFooterProps = {
  hasBottomSafeArea?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  shadowVariant?: 'black' | 'primary';
};

export default function FormSheetFooter(props: PropsWithChildren<FormSheetFooterProps>) {
  const { children, hasBottomSafeArea = false, onLayout, shadowVariant = 'black' } = props;
  const { bottom } = useSafeArea();
  return (
    <Wrapper
      className="gap-2 bg-white py-2"
      style={[
        shadowVariant === 'black' ? styles.boxShadowBlack : styles.boxShadowPrimary,
        hasBottomSafeArea && { paddingBottom: bottom },
      ]}
      fill={false}
      onLayout={onLayout}
    >
      {children}
    </Wrapper>
  );
}
