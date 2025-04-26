import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

import { View as NativeView } from './View';

export default function Box(props: ViewProps) {
  const { children, ...rest } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <NativeView {...rest}>{children}</NativeView>;
}
