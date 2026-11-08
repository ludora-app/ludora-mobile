import { FlatList, ViewToken } from 'react-native';
import { Children, useCallback, useEffect } from 'react';

import { useCarousel } from './CarouselContext';
import { useAutoPlay } from '../hooks/useAutoPlay';
import { CarouselContentProps } from '../../../types';

const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 50,
};

/**
 * CarouselContent component manages the scrollable content area of the carousel (Tailwind version).
 * Handles the FlatList implementation, viewability tracking, and auto-play functionality.
 *
 * @example
 * ```tsx
 * <CarouselContent>
 *   <CarouselItem>Slide 1</CarouselItem>
 *   <CarouselItem>Slide 2</CarouselItem>
 * </CarouselContent>
 * ```
 *
 * @param children - CarouselItem components to display
 * @param className - Custom CSS classes for the FlatList container
 */
function CarouselContent(props: CarouselContentProps) {
  const { children, className, ...rest } = props;

  const {
    autoPlay,
    autoPlayDirection,
    autoPlayInterval,
    autoPlayLoop,
    currentIndex,
    flatListRef,
    orientation,
    setContentStyle,
    setCurrentIndex,
    setTotalItems,
    totalItems,
  } = useCarousel();

  const validItems = Children.toArray(children).filter(Boolean);
  const itemCount = validItems.length;

  useEffect(() => {
    setTotalItems(itemCount);
  }, [itemCount, setTotalItems]);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const nextIndex = viewableItems[0]?.index;
      if (nextIndex != null) {
        setCurrentIndex(nextIndex);
      }
    },
    [setCurrentIndex],
  );

  useAutoPlay({
    autoPlay,
    autoPlayDirection,
    autoPlayInterval,
    autoPlayLoop,
    currentIndex,
    flatListRef,
    setCurrentIndex,
    totalItems,
  });

  return (
    <FlatList
      keyExtractor={(_, index) => `carousel-item-${index}`}
      pagingEnabled
      viewabilityConfig={VIEWABILITY_CONFIG}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      className={className}
      bounces={false}
      {...rest}
      onViewableItemsChanged={onViewableItemsChanged}
      horizontal={orientation === 'horizontal'}
      ref={flatListRef}
      renderItem={({ item }) => item}
      data={validItems}
      onLayout={e => {
        setContentStyle({ height: e.nativeEvent.layout.height, width: e.nativeEvent.layout.width });
      }}
    />
  );
}

CarouselContent.displayName = 'CarouselContent';

export { CarouselContent };
