import { Link } from 'expo-router';
import { String as StringChillUi } from '@chillui/ui';

import { StringProps } from '../../types/string.types';

export default function String(props: StringProps) {
  const { children, redirect, ...rest } = props;

  if (redirect) {
    return (
      <Link href={redirect} asChild>
        <StringChillUi colorVariant="black" {...rest}>
          {children}
        </StringChillUi>
      </Link>
    );
  }
  return (
    <StringChillUi colorVariant="black" {...rest}>
      {children}
    </StringChillUi>
  );
}
