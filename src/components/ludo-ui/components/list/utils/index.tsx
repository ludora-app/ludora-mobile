export const renderComponent = (Component: React.ComponentType | React.ReactElement | undefined) => {
  if (!Component) return null;
  if (typeof Component === 'object' && 'type' in Component) {
    return Component;
  }
  return <Component />;
};
