import { PropsWithChildren } from 'react';

import { Icon } from '../../icon';
import { InputIconProps } from '../../../types/input.types';
import { IconConfig } from '../../icon/context/IconContext';

export default function InputIcon<T extends IconConfig>(props: PropsWithChildren<InputIconProps<T>>) {
  const { children, ...rest } = props;

  if (!children && rest.name) {
    return <Icon<T> {...rest} name={rest.name} />;
  }

  return children;
}

InputIcon.displayName = 'InputIcon';
