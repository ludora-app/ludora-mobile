import { scheduleOnRN } from 'react-native-worklets';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';

import { Box } from '../box';
import List from './list.component';
import { ListAnimatedProps } from '../../types/list.types';
import { useCustomFlatListHook } from './hooks/useFlatlistHook';

const AnimatedList = Animated.createAnimatedComponent(List);

export default function ListAnimated(props: ListAnimatedProps) {
  const { HeaderComponent, onScroll, StickyElementComponent, TopListElementComponent, ...rest } = props;

  const [scrollY, styles, onLayoutHeaderElement, onLayoutTopListElement, onLayoutStickyElement] =
    useCustomFlatListHook();

  const handleOnScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
      if (onScroll) {
        scheduleOnRN(onScroll, {
          nativeEvent: {
            contentInset: event.contentInset,
            contentOffset: {
              x: event.contentOffset.x,
              y: event.contentOffset.y,
            },
            contentSize: event.contentSize,
            layoutMeasurement: event.layoutMeasurement,
            zoomScale: event.zoomScale,
          },
        } as any);
      }
    },
  });

  const renderComponent = (Component: React.ComponentType | React.ReactElement | undefined) => {
    if (!Component) return null;
    if (typeof Component === 'object' && 'type' in Component) {
      return Component;
    }
    return <Component />;
  };

  return (
    <Box className="flex-1">
      {StickyElementComponent && (
        <Animated.View onLayout={onLayoutStickyElement} style={styles.stickyElement}>
          {renderComponent(StickyElementComponent)}
        </Animated.View>
      )}

      {TopListElementComponent && (
        <Animated.View onLayout={onLayoutTopListElement} style={styles.topElement} className="bg-red-600">
          {renderComponent(TopListElementComponent)}
        </Animated.View>
      )}
      <AnimatedList
        {...rest}
        onScroll={handleOnScroll}
        ListHeaderComponent={
          HeaderComponent && (
            <Animated.View onLayout={onLayoutHeaderElement} style={styles.header}>
              {renderComponent(HeaderComponent)}
            </Animated.View>
          )
        }
      />
    </Box>
  );
}
