import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import { cn } from '@/components/chill-ui-library/utils';

import type { NumericInputProps } from '../../../types/numericInput.types';

import { Box } from '../../box';
import { NumericInputContext } from '../context/NumericInputContext';

function NumericInput({
  children,
  className,
  isDisabled = false,
  max,
  min,
  onValueChange,
  size = 'md',
  step = 1,
  value = 0,
}: PropsWithChildren<NumericInputProps>) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleValueChange = useCallback(
    (newValue: number) => {
      let finalValue = newValue;

      if (min !== undefined && finalValue < min) {
        finalValue = min;
      }
      if (max !== undefined && finalValue > max) {
        finalValue = max;
      }

      setInternalValue(finalValue);
      onValueChange?.(finalValue);
    },
    [min, max, onValueChange],
  );

  const contextValue = useMemo(
    () => ({
      isDisabled,
      max,
      min,
      onValueChange: handleValueChange,
      size,
      step,
      value: internalValue,
    }),
    [handleValueChange, isDisabled, max, min, size, step, internalValue],
  );

  return (
    <NumericInputContext.Provider value={contextValue}>
      <Box className={cn('flex-row', className)}>{children}</Box>
    </NumericInputContext.Provider>
  );
}

NumericInput.displayName = 'NumericInput';

export default NumericInput;
