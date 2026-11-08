import { cn } from '@chillui/ui';
import { StyleSheet } from 'react-native';
import { PropsWithChildren, ReactNode } from 'react';
import { Box, BoxGrow, BoxRow, String, Wrapper } from '@ludo/ui';

import { GoBackButton } from '../../navigation/header-go-back/components/go-back-button.component';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 10px 24px -14px rgba(120, 80, 30, 0.35)',
  },
});

type HeaderRoundedProps = {
  className?: string;
  hasGoBack?: boolean;
  onGoBack?: () => void;
  rightContent?: ReactNode;
  title: string;
};

export const HeaderRounded = (props: PropsWithChildren<HeaderRoundedProps>) => {
  const { children, className, hasGoBack = false, onGoBack, rightContent, title } = props;

  const hasSideSlots = hasGoBack || !!rightContent;

  return (
    <Wrapper
      safeArea={['top']}
      className={cn('z-10 gap-3.5 rounded-b-header bg-white pb-4.5', className)}
      style={styles.shadow}
    >
      <BoxRow className="min-h-12 items-center gap-2">
        {hasSideSlots && <Box className="size-11">{hasGoBack && <GoBackButton onPress={onGoBack} />}</Box>}
        <BoxGrow>
          <String variant="title-1" position="center">
            {title}
          </String>
        </BoxGrow>
        {hasSideSlots && <Box className="size-11">{rightContent}</Box>}
      </BoxRow>
      {children}
    </Wrapper>
  );
};
