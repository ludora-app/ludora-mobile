import { useCallback } from 'react';
import { useController } from 'react-hook-form';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import cn from '../cn/cn';
import Input from './Input';
import { Box } from '../box';
import { FormInputProps } from '../utils/types';
import String from '../string/components/String';

export default function FormInput(props: FormInputProps) {
  const { className, control, name, onBlur: onBlurProp } = props;

  const {
    field: { onBlur: onBlurForm, onChange, value },
    fieldState: { error, invalid },
  } = useController({ control, name });

  const onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlurProp?.(e);
      onBlurForm();
    },
    [onBlurForm, onBlurProp],
  );

  return (
    <Box>
      <Input
        className={cn({ 'border-destructive': invalid }, className)}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
      />
      <String variant="destructive" weight="semiBold" className="pl-1" size="sm">
        {error?.message}
      </String>
    </Box>
  );
}
