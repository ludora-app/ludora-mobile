import { cn } from '@chillui/ui';
import { PropsWithChildren } from 'react';
import { Button, Wrapper } from '@ludo/ui';

type FormSheetFooterProps = {
  className?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  isButtonDisabled?: boolean;
};

export const FormSheetFooter = (props: PropsWithChildren<FormSheetFooterProps>) => {
  const { buttonTitle, children, className, isButtonDisabled = false, onButtonPress } = props;
  return (
    <Wrapper fill={false} className={cn('gap-2', className)}>
      {buttonTitle && <Button title={buttonTitle} onPress={onButtonPress} isDisabled={isButtonDisabled} size="xl" />}
      {children}
    </Wrapper>
  );
};

FormSheetFooter.displayName = 'FormSheetFooter';
