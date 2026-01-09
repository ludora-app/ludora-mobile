import { FieldValues, UseControllerProps } from 'react-hook-form';

import { InputFieldProps } from '@/components/chill-ui-library';

import { IconProps } from './icon.types';

export type FormInputProps<T extends FieldValues = FieldValues> = Omit<UseControllerProps<T>, 'defaultValue'> &
  InputFieldProps & {
    label?: string;
    inputFieldClassName?: string;
    inputContainerClassName?: string;
    hasError?: boolean;
    hasMessageError?: boolean;
    hasErrorTranslation?: boolean;
    leftIconAction?: IconProps;
    rightIconAction?: IconProps;
  };
