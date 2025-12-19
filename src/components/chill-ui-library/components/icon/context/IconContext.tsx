import { createContext, useContext, PropsWithChildren, useMemo } from 'react';

import { ICONS } from '../../../constants';

export interface PathObject {
  d: string;
  fill?: string;
  stroke?: string;
  opacity?: string;
  fillRule?: string;
  clipRule?: string;
  strokeWidth?: string;
  strokeLinecap?: string;
  strokeLinejoin?: string;
}

export interface IconStructure {
  d?: string;
  fill?: string;
  stroke?: string;
  opacity?: string;
  fillRule?: string;
  clipRule?: string;
  strokeWidth?: string;
  strokeLinecap?: string;
  strokeLinejoin?: string;
  props?: Record<string, any>;
  children?: readonly IconStructure[];
  type: 'g' | 'path' | 'defs' | 'clipPath' | 'rect';
}

export interface IconConfig {
  [key: string]: {
    viewBox: string;
    path?: (string | PathObject)[] | readonly (string | PathObject)[];
    structure?: IconStructure;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    opacity?: string;
  };
}

interface IconContextType<T extends IconConfig = IconConfig> {
  icons: T;
}

const IconContext = createContext<IconContextType | undefined>(undefined);

/**
 * IconProvider component that allows users to register custom icons globally
 *
 * @example
 * ```tsx
 * const customIcons = {
 *   star: {
 *     viewBox: '0 0 24 24',
 *     path: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
 *     fill: '#F59E0B',
 *     stroke: '#F59E0B',
 *     strokeWidth: '2',
 *     strokeLinecap: 'round',
 *     strokeLinejoin: 'round',
 *     opacity: '1',
 *   }
 * };
 *
 * <IconProvider icons={customIcons}>
 *   <App />
 * </IconProvider>
 * ```
 */
export function IconProvider<T extends IconConfig = typeof ICONS>({
  children,
  icons = {} as T,
}: PropsWithChildren<{ icons?: T }>) {
  const value = useMemo(() => ({ icons: { ...ICONS, ...icons } as T & typeof ICONS }), [icons]);

  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}

/**
 * Hook to access the icon context
 * @returns Icon context with registered icons and registerIcons function
 * @throws Error if used outside of IconProvider
 */
export function useIconContext<T extends IconConfig = typeof ICONS>(): IconContextType<T> {
  const context = useContext(IconContext);
  if (!context) {
    return { icons: {} as T };
  }
  return context as IconContextType<T>;
}
