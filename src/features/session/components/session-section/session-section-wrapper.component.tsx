import { Box } from '@ludo/ui';
import { cn } from '@chillui/ui';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

type SessionSectionWrapperProps = {
  className?: string;
  withShadow?: boolean;
};

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
});

export default function SessionSectionWrapper(props: PropsWithChildren<SessionSectionWrapperProps>) {
  const { children, className, withShadow = false } = props;
  return (
    <Box
      className={cn('gap-2', { 'rounded-lg bg-white p-3': withShadow }, className)}
      style={withShadow ? styles.shadow : undefined}
    >
      {children}
    </Box>
  );
}
