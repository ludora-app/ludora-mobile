import type { InputProps } from '@chillui/ui';

import { FieldValues, UseControllerProps } from 'react-hook-form';

export type FormInputProps<T extends FieldValues = FieldValues> = Omit<UseControllerProps<T>, 'defaultValue'> &
  InputProps;
