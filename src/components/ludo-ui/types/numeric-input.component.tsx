import { FieldValues, UseControllerProps } from 'react-hook-form';
import { NumericInputProps as NumericInputPropsChillUi } from '@chillui/ui';

import { FormInputProps } from './form-input.types';

export type NumericInputProps<T extends FieldValues = FieldValues> = Omit<UseControllerProps<T>, 'defaultValue'> &
  NumericInputPropsChillUi & {
    inputProps?: Omit<FormInputProps<T>, 'name' | 'control'>;
  };
