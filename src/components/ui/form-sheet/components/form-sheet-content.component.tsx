import { cn } from '@chillui/ui';
import { Wrapper } from '@ludo/ui';
import { PropsWithChildren } from 'react';

type FormSheetContentProps = {
  className?: string;
};

export const FormSheetContent = (props: PropsWithChildren<FormSheetContentProps>) => {
  const { children, className } = props;
  return (
    <Wrapper fill={false} className={cn('pt-4 pb-6', className)}>
      {children}
    </Wrapper>
  );
};

FormSheetContent.displayName = 'FormSheetContent';
