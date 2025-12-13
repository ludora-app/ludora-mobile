import { StyleProp, ViewStyle } from 'react-native';

export type ChilluiDevToolsProps = {
  className?: string;
  side?: 'left' | 'right';
  position?: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
};

export type ChilluiDevToolProps = ChilluiDevToolsProps & {
  handleToggleStorybook: () => void;
};
