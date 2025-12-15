import { Animated, Pressable, TextInput } from 'react-native';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { Box } from '../../box';
import { Icon } from '../../icon';
import { String } from '../../string';
import { InputProps } from '../../../types';
import { AnimatedBox } from '../../animatedBox';
import { inputDefaultProps } from '../utils/defaultProps';
import { cn, getStringLength, isString } from '../../../utils';
import { inputContainerTv, inputFieldTv, twStyles } from '../styles/Input.styles';

/**
 * The `<Input />` component provides a comprehensive text input with validation, icons, error handling, and customizable styling.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Input } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={emailValue}
 *   onChangeText={setEmailValue}
 * />
 * ```
 *
 * @param allow - Input validation type: 'all' | 'numbers' | 'letters' | 'lettersWithoutSpecialCharacters' (default: 'all')
 * @param className - Custom CSS classes for the input container (NativeWind)
 * @param clearIconProps - Props for the clear icon component
 * @param clickableAs - Animation type when input is pressed: 'scale' | undefined
 * @param customRegex - Custom regex pattern for input validation
 * @param editable - Whether the input is editable (default: true)
 * @param errorClassName - Custom CSS classes for error state (NativeWind)
 * @param errorIconName - Icon name to display with error message
 * @param errorMessage - Error message to display below input
 * @param errorStringProps - Props for the error message String component
 * @param eyeIconProps - Props for the eye/eye-slash icon component
 * @param font - Font family variant for the input text
 * @param hasClearIcon - Whether to show clear icon when input has value (default: true)
 * @param hasError - Whether input is in error state
 * @param hasSecureTextEntry - Whether input should hide text (password field)
 * @param inputClassName - Custom CSS classes for the input field
 * @param isDisabled - Whether input is disabled
 * @param isStretchable - Whether input should stretch to full width
 * @param label - Label text to display above input
 * @param labelStringProps - Props for the label String component
 * @param leftIconAction - Configuration for left icon (iconName, iconSize, iconColor, iconPress, customIcon)
 * @param lengthStringProps - Props for the character count String component
 * @param maxLength - Maximum number of characters allowed
 * @param multiline - Whether input supports multiple lines
 * @param onChangeText - Callback when input text changes
 * @param onPress - Callback when input is pressed
 * @param rightIconAction - Configuration for right icon (iconName, iconSize, iconColor, iconPress, customIcon)
 * @param showLength - Whether to show character count
 * @param size - Input size variant ('xs' | 'sm' | 'md' | 'lg' | 'xl')
 * @param value - Current input value
 * @param wrapperRef - Ref for the input container wrapper
 * @returns Styled input component with validation and icon support using Tailwind CSS
 */
const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    allow = inputDefaultProps.allow,
    className,
    clearIconProps,
    clickableAs,
    customRegex,
    editable = inputDefaultProps.editable,
    errorClassName,
    errorIconName,
    errorMessage,
    errorStringProps,
    eyeIconProps,
    font = inputDefaultProps.font,
    hasClearIcon = inputDefaultProps.hasClearIcon,
    hasError,
    hasSecureTextEntry,
    inputClassName,
    isDisabled,
    isStretchable,
    label,
    labelStringProps,
    leftIconAction,
    lengthStringProps,
    maxLength,
    multiline,
    onChangeText,
    onPress,
    rightIconAction,
    showLength,
    size = inputDefaultProps.size,
    value,
    wrapperRef,
    ...rest
  } = props;

  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(hasSecureTextEntry || false);
  const [inputValue, setInputValue] = useState<string>(value || '');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const xmarkIconSize = useMemo(() => {
    if (size === 'lg' || size === 'xl') return 'sm';
    return 'xs';
  }, [size]);

  /**
   * Validates input text based on allow prop or custom regex
   */
  const validateInput = (text: string): boolean => {
    if (customRegex) {
      return customRegex.test(text);
    }

    switch (allow) {
      case 'numbers':
        return /^\d*$/.test(text);
      case 'letters':
        return /^[a-zA-ZÀ-ÿ\s]*$/.test(text);
      case 'lettersWithoutSpecialCharacters':
        return /^[a-zA-ZÀ-ÿ0-9\s]*$/.test(text);
      case 'all':
      default:
        return true;
    }
  };

  /**
   * Clears the input value and calls onChangeText callback
   */
  const handleClearInput = () => {
    setInputValue('');
    onChangeText?.('');
  };

  /**
   * Handles text changes with validation and state updates
   */
  const handleOnChange = (text: string) => {
    if (validateInput(text)) {
      !isString(value) && setInputValue(text);
      onChangeText?.(text);
    }
  };

  /**
   * Handles press in animation for scale effect
   */
  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      duration: 100,
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Handles press out animation to restore scale
   */
  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      duration: 100,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  return (
    <Box>
      {!!label && (
        <String size="sm" className={twStyles.label} {...labelStringProps}>
          {label}
        </String>
      )}
      <AnimatedBox
        ref={wrapperRef}
        style={clickableAs === 'scale' ? { transform: [{ scale: scaleAnim }] } : undefined}
        className={cn(
          inputContainerTv({ hasError: !!hasError, isDisabled: !!isDisabled }),
          hasError && errorClassName,
          className,
        )}
      >
        {!!leftIconAction?.iconName && !leftIconAction?.customIcon && (
          <Icon
            name={leftIconAction?.iconName as any}
            size={leftIconAction?.iconSize || xmarkIconSize}
            color={leftIconAction?.iconColor}
            onPress={leftIconAction?.iconPress}
            className={twStyles.leftIcon}
            hasPressEffect={leftIconAction?.hasPressEffect}
          />
        )}
        {leftIconAction?.customIcon && (
          <Pressable onPress={leftIconAction?.iconPress} className={twStyles.leftIcon}>
            {leftIconAction?.customIcon}
          </Pressable>
        )}

        <TextInput
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          ref={ref}
          value={inputValue}
          className={cn(
            inputFieldTv({ font, isStretchable: !!isStretchable, multiline: !!multiline, size }),
            inputClassName,
          )}
          onChangeText={handleOnChange}
          secureTextEntry={isSecureEntry}
          multiline={multiline}
          maxLength={maxLength}
          editable={isDisabled ? false : !!editable}
          placeholderTextColor={inputDefaultProps.placeholderTextColor}
          {...rest}
        />

        <Box className={twStyles.iconContainer}>
          {inputValue.length > 0 && hasClearIcon && (
            <Icon onPress={handleClearInput} name="xmark-solid" size={xmarkIconSize} {...clearIconProps} />
          )}

          {!!rightIconAction?.iconName && !rightIconAction?.customIcon && (
            <Icon
              name={rightIconAction?.iconName as any}
              size={rightIconAction?.iconSize || xmarkIconSize}
              color={rightIconAction?.iconColor}
              onPress={rightIconAction?.iconPress}
              hasPressEffect={rightIconAction?.hasPressEffect}
              className={twStyles.rightIcon}
            />
          )}
          {rightIconAction?.customIcon && (
            <Pressable onPress={rightIconAction?.iconPress} className={twStyles.rightIcon}>
              {rightIconAction?.customIcon}
            </Pressable>
          )}

          {hasSecureTextEntry && (
            <Icon
              onPress={() => setIsSecureEntry(!isSecureEntry)}
              size={xmarkIconSize}
              {...eyeIconProps}
              name={isSecureEntry ? 'eye-slash-solid' : 'eye-solid'}
            />
          )}
        </Box>
      </AnimatedBox>
      <Box
        className={cn(twStyles.bottomInputContainer, {
          [twStyles.bottomInputContainerShowLength]: showLength && !errorMessage,
        })}
      >
        {!!errorMessage && (
          <Box className={twStyles.errorContainer}>
            {!!errorIconName && <Icon name={errorIconName as any} size="xs" color="#FF0000" />}
            <String size="xs" colorVariant="error" {...errorStringProps}>
              {errorMessage}
            </String>
          </Box>
        )}
        {showLength && (
          <String size="xs" className={twStyles.lengthText} {...lengthStringProps}>
            {maxLength ? `${getStringLength(inputValue ?? '')}/${maxLength}` : getStringLength(inputValue ?? '')}
          </String>
        )}
      </Box>
    </Box>
  );
});

Input.displayName = 'Input';

export default Input;
