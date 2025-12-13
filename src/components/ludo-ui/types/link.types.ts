import type { LinkProps as LinkNativeProps } from 'expo-router';

import { RouteValues } from '@/constants/ROUTES';

export type LinkProps = LinkNativeProps & {
  href: RouteValues;
};
