import { Link } from 'expo-router';
import { String as StringChillUi } from '@chillui/ui';

import { StringProps } from '../../types/string.types';

export default function String(props: StringProps) {
  const { children, redirect, truncate, ...rest } = props;

  const isTruncated = {
    ellipsizeMode: 'tail' as const,
    numberOfLines: 1,
  };

  if (redirect) {
    return (
      <Link href={redirect} asChild>
        <StringChillUi colorVariant="black" {...rest} {...(truncate && isTruncated)}>
          {children}
        </StringChillUi>
      </Link>
    );
  }
  return (
    <StringChillUi colorVariant="black" {...rest} {...(truncate && isTruncated)}>
      {children}
    </StringChillUi>
  );
}
