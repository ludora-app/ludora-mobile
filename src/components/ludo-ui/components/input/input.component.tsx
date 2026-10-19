import { forwardRef, useState } from 'react';
import { NativeSyntheticEvent, TargetedEvent } from 'react-native';
import { Input as InputChillUi, InputContainer, InputField, InputLabel, cn, Box, BoxRow } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';
import { IS_IOS } from '@/constants/platform.constants';

import { Icon } from '../icon';
import { String } from '../string';
import { InputProps } from '../../types/input.types';

export const Input = forwardRef<any, InputProps>((props, ref) => {
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
  const isDisabled = inputFieldProps?.editable === false;
  const showMessageError = !!error && hasMessageError;
  const showLengthCounter = hasLengthCounter && !!inputFieldProps?.maxLength;

  const [showPassword, setShowPassword] = useState(false);

  const isSecure = inputFieldProps?.secureTextEntry ? !showPassword : false;

  const showClearIcon = hasClearIcon && !isDisabled && !!inputFieldProps?.value;

  const handleFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
    setIsFocused(true);
    inputFieldProps?.onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TargetedEvent>) => {
    setIsFocused(false);
    inputFieldProps?.onBlur?.(e);
  };

  return (
    <InputChillUi className={className}>
      {!!label && (
        <InputLabel colorVariant={showError ? 'error' : 'dark'} font="primaryBold" className="ml-0 text-sm">
          {label}
        </InputLabel>
      )}
      <InputContainer
        className={cn(
          'min-h-14 rounded-field border-2 border-input bg-white px-4',
          {
            'bg-darkSoft': isDisabled,
            'border-error': showError,
            'border-primary': isFocused && !showError,
          },
          inputContainerClassName,
        )}
      >
        {leftIconAction?.name && <Icon {...leftIconAction} className="mr-2" />}

        <InputField
          ref={ref}
          placeholderTextColor={COLORS.placeholder}
          cursorColor={COLORS.primary}
          selectionColor={IS_IOS ? COLORS.primary : `${COLORS.primary}70`}
          selectionHandleColor={COLORS.primary}
          {...inputFieldProps}
          className={cn('font-primary-medium text-base', inputFieldProps?.className)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            { alignSelf: 'stretch', color: isDisabled ? `${COLORS.dark}8C` : COLORS.dark, flex: 1 },
            inputFieldProps?.style,
            inputFieldProps?.multiline && { textAlignVertical: 'top' },
          ]}
          secureTextEntry={isSecure}
        />

        {rightContentProps?.content && <String {...rightContentProps}>{rightContentProps.content}</String>}

        {rightIconAction?.name && <Icon {...rightIconAction} />}
        {showClearIcon && (
          <Icon
            name="close-circle-regular"
            color={`${COLORS.dark}99`}
            onPress={() => inputFieldProps?.onChangeText?.('')}
            size="sm"
            pressEffectSize="xs"
          />
        )}
        {inputFieldProps?.secureTextEntry && (
          <Icon
            name={showPassword ? 'eye-slash-regular' : 'eye-regular'}
            color={`${COLORS.dark}99`}
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
              <Icon name="warning-solid" size="xs" color={COLORS.error} />
              <String colorVariant="error" font="primarySemiBold" variant="body-xs" truncate>
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

Input.displayName = 'Input';
