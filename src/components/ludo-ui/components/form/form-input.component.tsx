import type { FocusEvent } from 'react-native';

import { useTranslate } from '@tolgee/react';
import { useCallback, forwardRef } from 'react';
import { useController } from 'react-hook-form';

import { Input } from '../input';
import { FormInputProps } from '../../types/form-input.types';

const FormInput = forwardRef<any, FormInputProps<any>>((props, ref) => {
  const {
    className,
    control,
    hasClearIcon,
    hasError = true,
    hasErrorTranslation = true,
    hasLengthCounter,
    hasMessageError = true,
    inputContainerClassName,
    inputFieldClassName,
    label,
    leftIconAction,
    name,
    onChangeText,
    onFocus: onFocusProp,
    placeholder,
    rightContentProps,
    rightIconAction,
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
      onChange(text);
      onChangeText?.(text);
    },
    [onChange, onChangeText],
  );

  return (
    <Input
      ref={ref}
      error={hasErrorTranslation ? t(error?.message) : error?.message}
      hasError={hasError}
      hasMessageError={hasMessageError}
      inputFieldProps={{
        className: inputFieldClassName,
        onBlur,
        onChangeText: handleOnChangeText,
        onFocus: onFocusProp,
        placeholder,
        value,
        ...rest,
      }}
      label={label}
      hasClearIcon={hasClearIcon}
      inputContainerClassName={inputContainerClassName}
      className={className}
      leftIconAction={leftIconAction}
      rightIconAction={rightIconAction}
      rightContentProps={rightContentProps}
      hasLengthCounter={hasLengthCounter}
    />
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
