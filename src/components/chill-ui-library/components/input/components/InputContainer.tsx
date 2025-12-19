import { PropsWithChildren } from 'react';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { inputContainerTv } from '../styles/Input.styles';
import { useInputContext } from '../context/InputContext';
import { InputContainerProps } from '../../../types/input.types';

export default function InputContainer(props: PropsWithChildren<InputContainerProps>) {
  const { children, className, ...rest } = props;

  const { errorClassName, hasError, isDisabled } = useInputContext();

  return (
    <Box
      className={cn(
        inputContainerTv({ hasError: !!hasError, isDisabled: !!isDisabled }),
        hasError && errorClassName,
        className,
      )}
      {...rest}
    >
      {children}
    </Box>
  );
}

InputContainer.displayName = 'InputContainer';
