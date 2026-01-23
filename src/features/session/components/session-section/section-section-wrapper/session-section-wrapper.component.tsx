import { Box } from '@ludo/ui';
import { cn } from '@chillui/ui';
import { PropsWithChildren } from 'react';


type SessionSectionWrapperProps = {
  className?: string;
};


export default function SessionSectionWrapper(props: PropsWithChildren<SessionSectionWrapperProps>) {
  const { children, className } = props;

  return (
    <Box className={cn('gap-2', className)}>
      {children}
    </Box>
  );
}
