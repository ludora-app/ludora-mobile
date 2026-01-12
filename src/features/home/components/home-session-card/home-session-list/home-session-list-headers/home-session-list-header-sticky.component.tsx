import { Box, Wrapper } from '@ludo/ui';
import Animated, { useAnimatedStyle, interpolate, SharedValue, Extrapolation } from 'react-native-reanimated';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { FiltersHeader } from '@/components/ui/filters-header';

interface HomeSessionListHeaderStickyProps {
  scrollY: SharedValue<number>;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);

const HEADER_HEIGHT = 170;

export default function HomeSessionListHeaderSticky({ scrollY }: HomeSessionListHeaderStickyProps) {
  const { top } = useSafeArea();

  const animatedStyle = useAnimatedStyle(() => {
    const paddingTop = interpolate(scrollY.value, [HEADER_HEIGHT, HEADER_HEIGHT + top], [10, top], Extrapolation.CLAMP);

    const borderTopRadius = interpolate(
      scrollY.value,
      [HEADER_HEIGHT, HEADER_HEIGHT + top],
      [12, 0],
      Extrapolation.CLAMP,
    );

    return {
      borderTopLeftRadius: borderTopRadius,
      borderTopRightRadius: borderTopRadius,
      paddingTop,
    };
  });

  return (
    <AnimatedBox style={animatedStyle} className="rounded-t-2xl bg-background">
      <Wrapper>
        <FiltersHeader
          numberOfFilters={0}
          source="filter_fields"
          goBackPath="/create-session"
          // selectedDayCarouselDate={selectedDayCarouselDate}
          // onFiltersChange={setFilters}
        />
      </Wrapper>
    </AnimatedBox>
  );
}
