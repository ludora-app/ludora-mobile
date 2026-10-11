import { Link } from 'expo-router';
import { String as StringChillUi } from '@chillui/ui';

import { StringProps } from '../../types/string.types';

// Design system: titles use Baloo 2, the rest of the interface uses Figtree
function getDefaultFont(variant: StringProps['variant']): StringProps['font'] {
  if (variant?.startsWith('title-')) return 'secondaryExtraBold';
  return 'primaryMedium';
}

export default function String(props: StringProps) {
  const { children, colorVariant = 'dark', font, redirect, truncate, variant, ...rest } = props;

  const isTruncated = {
    ellipsizeMode: 'tail' as const,
    numberOfLines: 1,
  };

  const content = (
    <StringChillUi
      colorVariant={colorVariant}
      font={font ?? getDefaultFont(variant)}
      variant={variant}
      {...rest}
      {...(truncate && isTruncated)}
    >
      {children}
    </StringChillUi>
  );

  if (redirect) {
    return (
      <Link href={redirect} asChild>
        {content}
      </Link>
    );
  }
  return content;
}
