import { useCallback, useEffect, useState } from 'react';

import type { NumericInputFieldProps } from '../../../types/numericInput.types';

import { cn } from '../../../utils';
import { String } from '../../string';
import { Input, InputContainer, InputField } from '../../input';
import { useNumericInputContext } from '../context/NumericInputContext';

export default function NumericInputField(props: NumericInputFieldProps) {
  const { className, content, ref, ...rest } = props;
  const { isDisabled, onValueChange, size, value } = useNumericInputContext();
  const [displayValue, setDisplayValue] = useState(value?.toString());

  useEffect(() => {
    setDisplayValue(value?.toString());
  }, [value]);

  const handleOnChange = useCallback(
    (text: string) => {
      setDisplayValue(text);

      if (text === '' || text === '-') {
        return;
      }

      const numValue = parseInt(text, 10);
      if (!Number.isNaN(numValue)) {
        onValueChange?.(numValue);
      }
    },
    [onValueChange],
  );

  return (
    <Input>
      <InputContainer className={cn('w-16 rounded-none', className)}>
        <InputField
          {...rest}
          allow="numbers"
          keyboardType="number-pad"
          onChangeText={handleOnChange}
          value={displayValue}
          size={size}
          className="text-center"
          editable={!isDisabled}
        />
        <String color="#9e9e9e">{content}</String>
      </InputContainer>
    </Input>
  );
}

NumericInputField.displayName = 'NumericInputField';
