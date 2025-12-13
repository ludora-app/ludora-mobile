import { Link as LinkNative } from 'expo-router';

import { LinkProps } from '../../types/link.types';

export default function Link(props: LinkProps) {
  const { children, ...rest } = props;
  return <LinkNative {...rest}>{children}</LinkNative>;
}
