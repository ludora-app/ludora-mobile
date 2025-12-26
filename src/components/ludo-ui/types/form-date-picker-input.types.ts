import { DatePickerProps } from 'react-native-date-picker';

import { FormInputProps } from './form-input.types';

export type FormDatePickerInputProps<T> = FormInputProps<T> & {
  datePickerProps?: DatePickerProps;
};
