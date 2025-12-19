import { useState } from 'react';
import {
  Input as InputChillUi,
  InputContainer,
  InputField,
  InputLabel,
  InputIcon,
  InputMessage,
  cn,
} from '@chillui/ui';

import COLORS from '@/constants/COLORS';
import { TIcons } from '@/constants/ICONS';

import { InputProps } from '../../types/input.types';

export default function Input(props: InputProps) {
  const {
    className,
    error,
    hasError,
    hasMessageError,
    inputContainerClassName,
    inputFieldProps,
    label,
    leftIconAction,
    rightIconAction,
  } = props;

  const showError = hasError && !!error;
  const showMessageError = !!error && hasMessageError;

  const [showPassword, setShowPassword] = useState(false);

  const isSecure = inputFieldProps.secureTextEntry ? !showPassword : false;

  return (
    <InputChillUi className={className}>
      {!!label && <InputLabel colorVariant={showError ? 'error' : 'dark'}>{label}</InputLabel>}
      <InputContainer className={cn({ 'border-error': showError }, inputContainerClassName)}>
        {leftIconAction?.name && <InputIcon<TIcons> {...leftIconAction} />}

        <InputField
          placeholderTextColor={COLORS.ring}
          cursorColor="#1E1E1E"
          selectionColor="#1E1E1E"
          style={{ color: '#000' }}
          {...inputFieldProps}
          secureTextEntry={isSecure}
        />

        {rightIconAction?.name && <InputIcon<TIcons> {...rightIconAction} />}

        {inputFieldProps.secureTextEntry && (
          <InputIcon<TIcons>
            name={showPassword ? 'eye-slash-solid' : 'eye-solid'}
            color="#000"
            onPress={() => setShowPassword(prev => !prev)}
            size="sm"
            pressEffectSize="xs"
          />
        )}
      </InputContainer>
      {showMessageError && <InputMessage colorVariant="error">{error}</InputMessage>}
    </InputChillUi>
  );
}
