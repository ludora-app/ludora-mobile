import { PropsWithChildren } from 'react';

import { String } from '../../string';
import { isString } from '../../../utils';
import { twStyles } from '../styles/Input.styles';
import { InputLabelProps } from '../../../types/input.types';

export default function InputLabel(props: PropsWithChildren<InputLabelProps>) {
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

InputLabel.displayName = 'InputLabel';
