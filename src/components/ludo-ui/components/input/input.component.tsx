import { useState } from 'react';
import { Input as InputChillUi, InputContainer, InputField, InputLabel, InputMessage, cn, Box } from '@chillui/ui';

import COLORS from '@/constants/COLORS';

import { Icon } from '../icon';
import { String } from '../string';
import { InputProps } from '../../types/input.types';

export default function Input(props: InputProps) {
  const {
    className,
    error,
    hasClearIcon = true,
    hasError,
    hasMessageError,
    inputContainerClassName,
    inputFieldProps,
    label,
    leftIconAction,
    rightContentProps,
    rightIconAction,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const showError = hasError && !!error;
  const showMessageError = !!error && hasMessageError;

  const [showPassword, setShowPassword] = useState(false);

  const isSecure = inputFieldProps?.secureTextEntry ? !showPassword : false;

  const showClearIcon = hasClearIcon && inputFieldProps?.value;


  return (
    <InputChillUi className={className}>
      {!!label && <InputLabel colorVariant={showError ? 'error' : 'dark'}>{label}</InputLabel>}
      <InputContainer className={cn({ 'border-error': showError, "border-primary": isFocused }, inputContainerClassName)}>
        {leftIconAction?.name && <Icon {...leftIconAction} className="mr-2" />}

        <InputField
          placeholderTextColor={COLORS.ring}
          cursorColor="#1E1E1E"
          selectionColor="#1E1E1E"
          style={{ color: '#000' }}
          {...inputFieldProps}
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {rightContentProps?.content && <String {...rightContentProps}>{rightContentProps.content}</String>}

        {rightIconAction?.name && <Icon {...rightIconAction} />}
        {showClearIcon && (
          <Icon
            name="close-circle-bulk"
            color="#00000099"
            onPress={() => inputFieldProps?.onChangeText?.('')}
            size="sm"
            pressEffectSize="xs"
          />
        )}
        {inputFieldProps?.secureTextEntry && (
          <Icon
            name={showPassword ? 'eye-slash-solid' : 'eye-solid'}
            color="#00000099"
            onPress={() => setShowPassword(prev => !prev)}
            size="sm"
            pressEffectSize="xs"
            className={cn({ 'ml-1': showClearIcon })}
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
