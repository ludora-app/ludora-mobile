import { FieldValues, useController } from 'react-hook-form';

import { CodeInput } from '../code-input';
import { FormCodeInputProps } from '../../types/code-input.types';

export const FormCodeInput = <T extends FieldValues = FieldValues>(props: FormCodeInputProps<T>) => {
  const { className, control, hasError = false, length, name, onChangeText, onComplete } = props;
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ control, name });

  const handleChangeText = (code: string) => {
    onChange(code);
    onChangeText?.(code);
  };

  return (
    <CodeInput
      className={className}
      hasError={hasError || !!error}
      length={length}
      onChangeText={handleChangeText}
      onComplete={onComplete}
      value={value}
    />
  );
};
