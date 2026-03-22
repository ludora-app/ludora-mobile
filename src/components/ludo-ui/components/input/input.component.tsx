import { forwardRef, useState } from 'react';
import { Input as InputChillUi, InputContainer, InputField, InputLabel, cn, Box, BoxRow } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';

import { Icon } from '../icon';
import { String } from '../string';
import { InputProps } from '../../types/input.types';

const Input = forwardRef<any, InputProps>((props, ref) => {
  const {
    className,
    error,
    hasClearIcon = true,
    hasError,
    hasLengthCounter,
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
  const showLengthCounter = hasLengthCounter && !!inputFieldProps?.maxLength;

  const [showPassword, setShowPassword] = useState(false);

  const isSecure = inputFieldProps?.secureTextEntry ? !showPassword : false;

  const showClearIcon = hasClearIcon && inputFieldProps?.value;

  return (
    <InputChillUi className={className}>
      {!!label && <InputLabel colorVariant={showError ? 'error' : 'dark'}>{label}</InputLabel>}
      <InputContainer
        className={cn({ 'border-error': showError, 'border-primary': isFocused }, inputContainerClassName)}
      >
        {leftIconAction?.name && <Icon {...leftIconAction} className="mr-2" />}

        <InputField
          ref={ref}
          placeholderTextColor={COLORS.ring}
          cursorColor={COLORS.primary}
          selectionColor={`${COLORS.primary}70`}
          {...inputFieldProps}
          style={[
            { alignSelf: 'stretch', color: '#000', flex: 1 },
            inputFieldProps?.style,
            inputFieldProps?.multiline && { textAlignVertical: 'top' },
          ]}
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
      <BoxRow className="items-center gap-2">
        <Box className="flex-1 flex-row items-center">
          {showMessageError && (
            <>
              <Icon name="warning-solid" size="xs" color="red" />
              <String colorVariant="error" size="xs" truncate>
                {error}
              </String>
            </>
          )}
        </Box>

        {showLengthCounter && (
          <Box>
            <String size="xs" colorVariant="muted">
              {inputFieldProps?.value?.length ?? 0}/{inputFieldProps?.maxLength}
            </String>
          </Box>
        )}
      </BoxRow>
    </InputChillUi>
  );
});

Input.displayName = "Input"

export default Input;
