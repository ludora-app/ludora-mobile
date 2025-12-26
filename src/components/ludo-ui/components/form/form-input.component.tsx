import type { FocusEvent } from 'react-native';

import { useCallback } from 'react';
import { useTranslate } from '@tolgee/react';
import { useController, FieldValues } from 'react-hook-form';

import { Input } from '../input';
import { FormInputProps } from '../../types/form-input.types';

export default function FormInput<T extends FieldValues = FieldValues>(props: FormInputProps<T>) {
  const {
    className,
    control,
    hasError = true,
    hasErrorTranslation = true,
    hasMessageError = true,
    inputContainerClassName,
    inputFieldClassName,
    label,
    name,
    onChangeText,
    placeholder,
    ...rest
  } = props;
  const { t } = useTranslate();
  const {
    field: { onBlur: onBlurForm, onChange, value },
    fieldState: { error },
  } = useController({ control, name });

  const onBlur = useCallback(
    (e: FocusEvent) => {
      onBlurForm();
    },
    [onBlurForm],
  );

  const handleOnChangeText = useCallback(
    (text: string) => {
      onChangeText?.(text);
      onChange(text);
    },
    [onChange, onChangeText],
  );

  return (
    <Input
      error={hasErrorTranslation ? t(error?.message) : error?.message}
      hasError={hasError}
      hasMessageError={hasMessageError}
      inputFieldProps={{
        className: inputFieldClassName,
        onBlur,
        onChangeText: handleOnChangeText,
        placeholder,
        value,

        ...rest,
      }}
      label={label}
      inputContainerClassName={inputContainerClassName}
      className={className}
    />
  );
}
