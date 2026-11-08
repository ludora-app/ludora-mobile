import { useRef } from 'react';
import { cn } from '@chillui/ui';
import { TextInput, TextInputKeyPressEvent } from 'react-native';

import { BoxRow } from '../box';
import { Input } from '../input';
import { CodeInputProps } from '../../types/code-input.types';

const DEFAULT_CODE_LENGTH = 6;
const MAX_LENGTH = 1;
const NON_DIGITS = /\D/g;
// Stands for an empty box followed by a filled one, so every digit keeps its box
const EMPTY_BOX = ' ';

/**
 * One-time code input: one box per digit, auto-advance, backspace back to the previous box, and paste / OS autofill
 * of the whole code in any box. `value` keeps each digit at its box index, an empty box before a filled one being a
 * space (`'12 4'`): check completeness with a digits-only regex, not with `value.length`.
 */
export const CodeInput = (props: CodeInputProps) => {
  const { className, hasError = false, length = DEFAULT_CODE_LENGTH, onChangeText, onComplete, value = '' } = props;
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const boxes = Array.from({ length }, (_, index) => value[index]?.trim() ?? '');

  const updateBoxes = ({ focusIndex, nextBoxes }: { focusIndex: number; nextBoxes: string[] }) => {
    const code = nextBoxes
      .map(digit => digit || EMPTY_BOX)
      .join('')
      .trimEnd();
    onChangeText(code);
    inputRefs.current[Math.max(0, Math.min(focusIndex, length - 1))]?.focus();
    if (nextBoxes.every(Boolean)) {
      onComplete?.(code);
    }
  };

  const handleChangeText = ({ index, text }: { index: number; text: string }) => {
    const digits = text.replace(NON_DIGITS, '');

    // Pasted or autofilled code: the whole code lands in a single box
    if (digits.length >= length) {
      updateBoxes({ focusIndex: length - 1, nextBoxes: digits.slice(-length).split('') });
      return;
    }

    const nextBoxes = [...boxes];
    if (!digits) {
      nextBoxes[index] = '';
      updateBoxes({ focusIndex: index, nextBoxes });
      return;
    }

    // Typing over a filled box: the text still holds the previous digit
    const previousDigit = boxes[index];
    const typed = previousDigit ? digits.replace(previousDigit, '') || previousDigit : digits;
    typed.split('').forEach((digit, offset) => {
      if (index + offset < length) {
        nextBoxes[index + offset] = digit;
      }
    });
    updateBoxes({ focusIndex: index + typed.length, nextBoxes });
  };

  // Backspace on an empty box doesn't change its text, so onChangeText never fires: clear the previous box here
  const handleKeyPress = ({
    event,
    index,
  }: {
    event: TextInputKeyPressEvent;
    index: number;
  }) => {
    if (event.nativeEvent.key !== 'Backspace' || boxes[index] || index === 0) return;
    const nextBoxes = [...boxes];
    nextBoxes[index - 1] = '';
    updateBoxes({ focusIndex: index - 1, nextBoxes });
  };

  return (
    <BoxRow className={cn('gap-2', className)}>
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(ref: TextInput | null) => {
            inputRefs.current[index] = ref;
          }}
          className="flex-1"
          hasClearIcon={false}
          inputContainerClassName={cn('px-0', { 'border-error': hasError })}
          inputFieldProps={{
            allow: 'numbers',
            autoComplete: 'one-time-code',
            className: 'mt-1 text-center font-secondary-extra-bold text-[24px]',
            keyboardType: 'number-pad',
            maxLength: MAX_LENGTH,
            onChangeText: text => handleChangeText({ index, text }),
            onKeyPress: event => handleKeyPress({ event, index }),
            placeholder: `${index + 1}`,
            value: boxes[index],
          }}
        />
      ))}
    </BoxRow>
  );
};
