export type SliderValue = number | string;

export type SliderProps<T extends SliderValue> = {
  className?: string;
  getLabel: (value: T) => string;
  onChange: (value: T) => void;
  value: T;
  values: readonly T[];
};
