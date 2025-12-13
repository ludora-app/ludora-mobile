import { useCallback } from 'react';
import { useController, FieldValues } from 'react-hook-form';
import type { FocusEvent } from 'react-native';

import { Input } from '@chillui/ui';

import { FormInputProps } from '../../types/form-input.types';

export default function FormInput<T extends FieldValues = FieldValues>(props: FormInputProps<T>) {
  const { control, name, onBlur: onBlurProp, ...rest } = props;

  const {
    field: { onBlur: onBlurForm, onChange, value },
    fieldState: { error, invalid },
  } = useController({ control, name });

  const onBlur = useCallback(
    (e: FocusEvent) => {
      onBlurProp?.(e);
      onBlurForm();
    },
    [onBlurForm, onBlurProp],
  );

  return (
    <Input
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      errorMessage={error?.message}
      hasError={invalid}
      {...rest}
    />
  );
}
