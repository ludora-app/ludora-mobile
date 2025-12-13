import React, { Children, cloneElement, createContext, useMemo } from 'react';

import type { AccordionProps } from './Accordion.types';

import { cn, Box } from '@chillui/ui';

export const AccordionContext = createContext<Partial<AccordionProps>>({});

function AccordionList(props: AccordionProps) {
  const {
    androidRipple = {
      color: 'rgba(0,0,0,0.3)',
      foreground: true,
    },
    animationDuration = 300,
    children,
    compact = false,
    containerClassName,
    contentContainerClassName,
    contentWrapperClassName,
    headerClassName,
    itemContainerClassName,
    rightIcon,
    subTitleClassName,
    titleClassName,
    titleContainerClassName,
  } = props;

  const accordionContextValue = useMemo(
    () => ({
      androidRipple,
      animationDuration,
      compact,
      contentContainerClassName,
      contentWrapperClassName,
      headerClassName,
      itemContainerClassName,
      rightIcon,
      subTitleClassName,
      titleClassName,
      titleContainerClassName,
    }),
    [
      compact,
      animationDuration,
      androidRipple,
      rightIcon,
      titleClassName,
      subTitleClassName,
      headerClassName,
      titleContainerClassName,
      itemContainerClassName,
      contentContainerClassName,
      contentWrapperClassName,
    ],
  );

  const renderChildren = () =>
    Children.map(children, (child: any, index) =>
      cloneElement(child, {
        index,
      }),
    );

  return (
    <AccordionContext.Provider value={accordionContextValue}>
      <Box
        className={cn(
          {
            'gap-2 rounded-lg bg-white shadow-sm': !compact,
          },
          containerClassName,
        )}
      >
        {renderChildren()}
      </Box>
    </AccordionContext.Provider>
  );
}

export default AccordionList;
