import type { LinkProps as LinkNativeProps } from 'expo-router';

import { RouteValues } from '@/constants/routes.constants';

export type LinkProps = LinkNativeProps & {
  href: RouteValues;
};
