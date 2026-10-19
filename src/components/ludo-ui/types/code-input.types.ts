import { FieldValues, UseControllerProps } from 'react-hook-form';

export type CodeInputProps = {
  className?: string;
  hasError?: boolean;
  /** Number of boxes, one digit each. Defaults to 6. */
  length?: number;
  onChangeText: (code: string) => void;
  /** Called once every box is filled. */
  onComplete?: (code: string) => void;
  /** Digits by box; an empty box before a filled one is a space (`'12 4'`). */
  value?: string;
};

export type FormCodeInputProps<T extends FieldValues = FieldValues> = Omit<UseControllerProps<T>, 'defaultValue'> &
  Pick<CodeInputProps, 'className' | 'hasError' | 'length' | 'onComplete'> & {
    onChangeText?: (code: string) => void;
  };
