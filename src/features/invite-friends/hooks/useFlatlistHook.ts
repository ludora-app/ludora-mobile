import { useState } from 'react';
import { Dimensions, LayoutChangeEvent, ViewStyle } from 'react-native';
import { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, SharedValue } from 'react-native-reanimated';

type ICustomFlatListStyles = {
  header: ViewStyle;
  stickyElement: any; // Type pour useAnimatedStyle
  topElement: any; // Type pour useAnimatedStyle
};

type TUseCustomFlatListHook = [
  SharedValue<number>,
  ICustomFlatListStyles,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
];

const window = Dimensions.get('window');

export const useCustomFlatListHook = (): TUseCustomFlatListHook => {
  const scrollY = useSharedValue(0);
  const [heights, setHeights] = useState({
    header: 0,
    sticky: 0,
    topList: 0,
  });

  // Style statique pour le header (calculé au re-render quand les heights changent)
  const headerStyle: ViewStyle = {
    marginBottom: heights.sticky + heights.topList,
  };

  // Animation pour l'élément Sticky
  const stickyAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-window.height, heights.header],
      [window.height, -heights.header],
      Extrapolate.CLAMP,
    );

    return {
      left: 0,
      marginTop: heights.header,
      position: 'absolute',
      right: 0,
      transform: [{ translateY }],
      zIndex: 2,
    };
  }, [heights.header]); // On recalcule si la hauteur du header change

  // Animation pour l'élément Top List
  const topElementAnimatedStyle = useAnimatedStyle(() => {
    const totalHeight = heights.header + heights.sticky + heights.topList;
    const translateY = interpolate(
      scrollY.value,
      [-window.height, totalHeight],
      [window.height, -totalHeight],
      Extrapolate.CLAMP,
    );

    return {
      left: 0,
      marginTop: heights.header + heights.sticky,
      position: 'absolute',
      right: 0,
      transform: [{ translateY }],
      zIndex: 1,
    };
  }, [heights]);

  const styles = {
    header: headerStyle,
    stickyElement: stickyAnimatedStyle,
    topElement: topElementAnimatedStyle,
  };

  const onLayoutHeaderElement = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeights(prev => ({ ...prev, header: height }));
  };

  const onLayoutTopListElement = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeights(prev => ({ ...prev, topList: height }));
  };

  const onLayoutTopStickyElement = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeights(prev => ({ ...prev, sticky: height }));
  };

  return [scrollY, styles, onLayoutHeaderElement, onLayoutTopListElement, onLayoutTopStickyElement];
};
