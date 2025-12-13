import { Box } from '../../box';
import { useCarousel } from './CarouselContext';
import { CarouselItemProps } from '../../../types';
import { carouselDefaultProps } from '../utils/defaultProps';

/**
 * CarouselItem component represents a single slide in the carousel.
 *
 * @example
 * ```tsx
 * <CarouselItem>
 *   <ImageBackground source={{ uri: 'image.jpg' }}>
 *     <String>Slide Content</String>
 *   </ImageBackground>
 * </CarouselItem>
 * ```
 *
 * @param className - Custom CSS classes for the item container
 * @param children - Content to render inside the carousel item
 * @param style - Custom style object for the item container
 * @param isFullWidth - Whether the item should take full width of the carousel
 */
function CarouselItem(props: CarouselItemProps) {
  const { children, isFullWidth = carouselDefaultProps.isFullWidth, style, ...rest } = props;
  const { contentStyle } = useCarousel();

  const itemStyle = isFullWidth ? contentStyle : undefined;

  return (
    <Box {...rest} style={[itemStyle, style]}>
      {children}
    </Box>
  );
}

CarouselItem.displayName = 'CarouselItem';

export { CarouselItem };
