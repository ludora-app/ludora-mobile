import { TextInput } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '../../../utils';
import { inputFieldTv } from '../styles/Input.styles';
import { useInputContext } from '../context/InputContext';
import { InputFieldProps } from '../../../types/input.types';

export default function InputField(props: InputFieldProps) {
  const { allow, as, className, customRegex, font, onChangeText, ref, size, value, ...rest } = props;
  const [inputValue, setInputValue] = useState<string>(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const { isStretchable, multiline } = useInputContext();

  const validateInput = useCallback(
    (text: string): boolean => {
      if (!allow && !customRegex) {
        return true;
      }
      if (customRegex) {
        return customRegex.test(text);
      }

      switch (allow) {
        case 'numbers':
          return /^\d*$/.test(text);
        case 'letters':
          return /^[a-zA-ZÀ-ÿ\s]*$/.test(text);
        case 'lettersWithoutSpecialCharacters':
          return /^[a-zA-ZÀ-ÿ0-9\s]*$/.test(text);
        case 'all':
        default:
          return true;
      }
    },
    [allow, customRegex],
  );

  /**
   * Handles text changes with validation and state updates
   */
  const handleOnChange = useCallback(
    (text: string) => {
      if (validateInput(text)) {
        setInputValue(text);
        onChangeText?.(text);
      }
    },
    [onChangeText, validateInput],
  );

  return (
    <TextInput
      ref={ref}
      value={inputValue}
      className={cn(inputFieldTv({ font, isStretchable: !!isStretchable, multiline: !!multiline, size }), className)}
      onChangeText={handleOnChange}
      {...rest}
    />
  );
}

InputField.displayName = 'InputField';
