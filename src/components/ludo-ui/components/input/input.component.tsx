import { useState } from 'react';
import { Input as InputChillUi, InputContainer, InputField, InputLabel, InputMessage, cn, Box } from '@chillui/ui';

import COLORS from '@/constants/COLORS';

import { Icon } from '../icon';
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
        {leftIconAction?.name && <Icon {...leftIconAction} />}

        <InputField
          placeholderTextColor={COLORS.ring}
          cursorColor="#1E1E1E"
          selectionColor="#1E1E1E"
          style={{ color: '#000' }}
          {...inputFieldProps}
          secureTextEntry={isSecure}
        />

        {rightIconAction?.name && <Icon {...rightIconAction} />}

        {inputFieldProps.secureTextEntry && (
          <Icon
            name={showPassword ? 'eye-slash-solid' : 'eye-solid'}
            color="#00000099"
            onPress={() => setShowPassword(prev => !prev)}
            size="sm"
            pressEffectSize="xs"
          />
        )}
      </InputContainer>
      {showMessageError && (
        <Box className="flex-row items-center">
          <Icon name="warning-solid" size="xs" color="red" />
          <InputMessage colorVariant="error" size="xs">
            {error}
          </InputMessage>
        </Box>
      )}
    </InputChillUi>
  );
}
