import React, { ReactNode, ReactElement, ElementType } from 'react';

export const getChildByType = <T>(children: ReactNode, type: ElementType): ReactElement<T> | undefined => {
  const childrenArray = React.Children.toArray(children);
  return childrenArray.find(child => React.isValidElement(child) && child.type === type) as ReactElement<T> | undefined;
};

/**
 * Utile pour cloner un enfant et lui injecter des props (ex: style, id)
 */
export const cloneChildWithProps = (children: ReactNode, extraProps: any) =>
  React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...extraProps, ...(child.props as Record<string, unknown>) });
    }
    return child;
  });

/**
 * Utile pour cloner un element et lui injecter des props (ex: style, id)
 */
export const cloneElement = <P>(element: ReactElement<P>, extraProps: Partial<P>): ReactElement<P> | null =>
  element ? (React.cloneElement(element, extraProps) as ReactElement<P>) : null;

/**
 * Extrait une prop spécifique d'un sous-composant trouvé dans les children.
 */
export const getComponentProp = <P, K extends keyof P>(
  children: ReactNode,
  componentType: React.ComponentType<any>,
  propName: K,
  defaultValue?: P[K],
): P[K] | undefined => {
  const childrenArray = React.Children.toArray(children);

  const component = childrenArray.find(
    child =>
      React.isValidElement(child) &&
      (child.type === componentType || (child.type as any).displayName === componentType.displayName),
  ) as ReactElement<P> | undefined;

  return component?.props[propName] ?? defaultValue;
};

export const extractPropFromComponent = <P, K extends keyof P>(
  component: ReactElement<P> | undefined | null,
  propName: K,
  defaultValue?: P[K],
): P[K] | undefined => {
  if (!component) return defaultValue;
  return component.props[propName] ?? defaultValue;
};

export const hasChildByType = (children: ReactNode, type: ElementType): boolean => {
  const childrenArray = React.Children.toArray(children);
  return childrenArray.some(child => React.isValidElement(child) && child.type === type);
};
