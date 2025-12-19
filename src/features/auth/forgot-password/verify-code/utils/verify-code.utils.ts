import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData } from 'react-native';

export const goToPreviousInput = ({
  e,
  index,
  inputRefs,
  value,
}: {
  e: NativeSyntheticEvent<TextInputKeyPressEventData>;
  value: string;
  index: number;
  inputRefs: React.RefObject<TextInput[]>;
}) => {
  if (e.nativeEvent.key === 'Backspace' && index > 0 && (!value || value.length === 0)) {
    inputRefs.current?.[index - 1].focus();
  }
};

export const goToNextInput = ({ index, inputRefs }: { inputRefs: React.RefObject<TextInput[]>; index: number }) => {
  inputRefs.current[index + 1].focus();
};
