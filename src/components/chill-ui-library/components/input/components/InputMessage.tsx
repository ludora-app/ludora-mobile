import { PropsWithChildren } from 'react';

import { String } from '../../string';
import { isString } from '../../../utils';
import { twStyles } from '../styles/Input.styles';
import { InputMessageProps } from '../../../types/input.types';

export default function InputMessage(props: PropsWithChildren<InputMessageProps>) {
  const { children, title, ...rest } = props;

  if (title || isString(children)) {
    return (
      <String size="sm" className={twStyles.label} {...rest}>
        {title || children}
      </String>
    );
  }

  return children;
}

InputMessage.displayName = 'InputLabel';
