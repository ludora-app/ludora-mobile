import { TextInput } from 'react-native';
import { forwardRef, PropsWithChildren } from 'react';

import type { InputProps } from '../../../types/input.types';

import { Box } from '../../box';
import { InputContext } from '../context/InputContext';

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
 * @returns Styled input component with validation and icon support using Tailwind CSS
 */
const Input = forwardRef<TextInput, PropsWithChildren<InputProps>>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <InputContext.Provider value={{}}>
      <Box className={className} {...rest}>
        {children}
      </Box>
    </InputContext.Provider>
  );
});

Input.displayName = 'Input';

export default Input;
