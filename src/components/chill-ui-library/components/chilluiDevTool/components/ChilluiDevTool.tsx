import { ChilluiDevToolsProps } from '../../../types';
import ChilluiDevToolImpl from './ChilluiDevToolImpl';

export default function ChilluiDevTool(props: ChilluiDevToolsProps) {
  if (__DEV__) {
    return <ChilluiDevToolImpl {...props} />;
  }

  return null;
}
