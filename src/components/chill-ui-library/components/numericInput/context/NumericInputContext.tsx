import { createContext, useContext } from 'react';

type NumericInputContextValue = {
  isDisabled?: boolean;
  max?: number;
  min?: number;
  onValueChange?: (value: number) => void;
  size?: 'xl' | 'lg' | 'md' | 'sm';
  step?: number;
  value: number;
};

export const NumericInputContext = createContext<NumericInputContextValue | null>(null);

export function useNumericInputContext() {
  const context = useContext(NumericInputContext);

  if (!context) {
    throw new Error('NumericInput compound components must be used within a NumericInput component');
  }

  return context;
}
