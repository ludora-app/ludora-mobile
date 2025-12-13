import { cn } from '../../../utils';
import { Box } from '../../box';
import { Icon } from '../../icon';
import { CarouselDotsProps } from '../../../types';

import { useCarousel } from './CarouselContext';
import { twStyles } from '../styles/Carousel.styles';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * CarouselDots component displays navigation dots indicating the current slide (Tailwind version).
 *
 * Automatically reflects the current slide and total number of slides from the carousel context.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CarouselDots />
 *
 * // Custom colors and size
 * <CarouselDots
 *   activeColor="blue"
 *   inactiveColor="gray"
 *   size="lg"
 * />
 *
 * // With custom styling
 * <CarouselDots
 *   className="gap-4"
 *   activeColor="#3b82f6"
 *   inactiveColor="#d1d5db"
 * />
 * ```
 *
 * @param activeColor - Color of the active dot (default: 'white')
 * @param className - Custom CSS classes for the dots container
 * @param inactiveColor - Color of inactive dots (default: 'gray')
 * @param size - Dot icon size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'xs')
 * @param style - Custom style object for the dots container
 */
function CarouselDots(props: CarouselDotsProps) {
  const {
    activeColor = carouselDefaultProps.dotActiveColor,
    className,
    inactiveColor = carouselDefaultProps.dotInactiveColor,
    size = carouselDefaultProps.dotSize,
    style,
  } = props;
  const { currentIndex, totalItems } = useCarousel();

  return (
    <Box className={cn(twStyles.carouselDots, className)} style={style}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <Icon
          key={`dot-${index}`}
          name={carouselDefaultProps.dotName}
          size={size}
          color={currentIndex === index ? activeColor : inactiveColor}
        />
      ))}
    </Box>
  );
}

CarouselDots.displayName = 'CarouselDots';

export { CarouselDots };
