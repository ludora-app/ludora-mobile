import { cn } from '../../../utils';
import { Box } from '../../box';
import { SegmentedControlPanelSliderContentProps } from '../../../types';
import { FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { PropsWithChildren, useMemo, useRef, useEffect, useState, cloneElement } from 'react';

import { twStyles } from '../styles/SegmentedControl.styles';
import { SegmentedControlPanel } from './SegmentedControlPanel';
import { useSegmentedControlState, useSegmentedControlActions } from '../context/SegmentedControlContext';

export function SegmentedControlPanelSliderContent(
  props: PropsWithChildren<SegmentedControlPanelSliderContentProps>,
) {
  const { children, className, style } = props;
  const { selectedOption, validItemsValues } = useSegmentedControlState();
  const { setSelectedOption } = useSegmentedControlActions();
  const flatListRef = useRef<FlatList>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const currentIndex = validItemsValues.indexOf(selectedOption);

  const childrenArray = useMemo(() => {
    if (!children) return [];
    return Array.isArray(children) ? children : [children];
  }, [children]);

  const validItems = useMemo(() => {
    const panels = childrenArray.filter(item => item.type === SegmentedControlPanel).filter(Boolean);
    return panels.map((panel, index) =>
      cloneElement(panel as React.ReactElement<any>, {
        forceRender: true,
        key: index,
      }),
    );
  }, [childrenArray]);

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < validItems.length && flatListRef.current && containerWidth > 0) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [currentIndex, containerWidth, validItems.length]);

  const renderItem = ({ item }: { item: React.ReactNode }) => <Box style={{ width: containerWidth }}>{item}</Box>;

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (containerWidth === 0) return;

    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / containerWidth);

    if (index >= 0 && index < validItemsValues.length && validItemsValues[index] !== selectedOption) {
      setSelectedOption(validItemsValues[index]);
    }
  };

  const handleScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    setTimeout(() => {
      if (flatListRef.current && info.index < validItems.length) {
        flatListRef.current.scrollToIndex({ animated: true, index: info.index });
      }
    }, 500);
  };

  return (
    <Box
      className={cn(twStyles.panelContentContainer, className)}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
      style={style}
    >
      {containerWidth > 0 && validItems.length > 0 && (
        <FlatList
          ref={flatListRef}
          data={validItems}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          snapToInterval={containerWidth}
          decelerationRate="fast"
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
          renderItem={renderItem}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollEndDrag={handleScrollEnd}
          onScrollToIndexFailed={handleScrollToIndexFailed}
          getItemLayout={(_, index) => ({
            index,
            length: containerWidth,
            offset: containerWidth * index,
          })}
        />
      )}
    </Box>
  );
}

SegmentedControlPanelSliderContent.displayName = 'SegmentedControlPanelSliderContent';
