import { FieldValues, useController } from 'react-hook-form';
import {
  InputMessage,
  NumericAddInput,
  NumericInput as NumericInputChillUi,
  NumericRemoveInput,
} from '@chillui/ui';

import { Box } from '../box';
import { Icon } from '../icon';
import { FormInput } from '../form';
import { NumericInputProps } from '../../types/numeric-input.component';

export default function NumericInput<T extends FieldValues = FieldValues>(props: NumericInputProps<T>) {
  const { control, inputProps, name, size, ...rest } = props;

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ control, name });

  const handleChange = (v: number) => {
    onChange(v?.toString());
  };

  return (
    <>
      <NumericInputChillUi value={Number(value)} {...rest} size={size} onValueChange={handleChange}>
        <NumericRemoveInput />
        <FormInput
          control={control}
          name={name}
          inputContainerClassName="rounded-none w-28"
          inputFieldClassName="text-center"
          size={size}
          hasMessageError={false}
          hasClearIcon={false}
          allow="numbers"
          maxLength={3}
          keyboardType="number-pad"
          {...inputProps}
        />

        <NumericAddInput />
      </NumericInputChillUi>
      {!!error && (
        <Box className="flex-row items-center">
          <Icon name="warning-solid" size="xs" color="red" />
          <InputMessage colorVariant="error" size="xs">
            {error?.message}
          </InputMessage>
        </Box>
      )}
    </>
  );
}
