import type { AccordionContentProps } from '../../../types';

import { Box } from '../../box';
import { String } from '../../string';
import { cn, isString } from '../../../utils';
import { useAccordion } from './AccordionContext';
import { twStyles } from '../styles/Accordion.styles';
import { useAccordionItem } from './AccordionItemContext';

/**
 * AccordionContent is the collapsible content area that shows/hides based on the accordion state.
 * Supports smooth animations and custom styling.
 *
 * @example
 * ```tsx
 * <AccordionContent stringProps={{ variant: 'body-2' }}>
 *   This content will be shown when the accordion item is expanded.
 * </AccordionContent>
 *
 * // Custom styling
 * <AccordionContent className="bg-gray-100 p-4">
 *   <Box>
 *     <String>Custom styled content</String>
 *   </Box>
 * </AccordionContent>
 * ```
 *
 * @param children - Content to display when expanded
 * @param className - Custom CSS classes
 * @param stringProps - Props to pass to String component when children is a string
 * @param style - Additional inline styles
 * @param ...rest - Props to pass to View props
 */
export default function AccordionContent(props: AccordionContentProps) {
  const { children, className, stringProps, style, ...rest } = props;
  const { isItemOpen } = useAccordion();
  const { value } = useAccordionItem();

  const isOpen = isItemOpen(value);

  const staticHeight = isOpen ? 'auto' : 0;

  return (
    <Box
      style={{
        height: staticHeight,
        overflow: 'hidden',
      }}
    >
      <Box className={cn(twStyles.accordionContent, className)} style={style} {...rest}>
        {isString(children) ? <String {...stringProps}>{children}</String> : children}
      </Box>
    </Box>
  );
}
