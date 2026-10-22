import { Box } from '@ludo/ui';
import { cn } from '@chillui/ui';
import { PropsWithChildren } from 'react';

import { IS_ANDROID } from '@/constants/platform.constants';

type FormSheetWrapperProps = {
  className?: string;
};

export const FormSheetWrapper = (props: PropsWithChildren<FormSheetWrapperProps>) => {
  const { children, className } = props;
  return <Box className={cn('pt-2', IS_ANDROID && 'pb-safe', className)}>{children}</Box>;
};

FormSheetWrapper.displayName = 'FormSheetWrapper';
