import { list } from 'radash';
import { cn } from '@chillui/ui';
import { useCallback, useMemo, useState } from 'react';
import { ViewStyle, LayoutChangeEvent, StyleProp } from 'react-native';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';
import Animated, { useAnimatedStyle, interpolate, useSharedValue, Extrapolation } from 'react-native-reanimated';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { EmptyResult } from '@/components/ui/empty-resulat';

import { Box } from '../box';
import { renderComponent } from './utils';
import ListFooter from './list-footer.component';
import { ListProps } from '../../types/list.types';

type SkeletonItem = { type: 'skeleton'; uid: string };
type SpecialItem = { type: 'sticky' | 'header_top'; uid: string };
type EmptyItem = { type: 'empty'; uid: string };
type ListItem = SkeletonItem | SpecialItem | EmptyItem;

const SKELETON_COUNT = 3;

const SKELETON_DATA: SkeletonItem[] = list(SKELETON_COUNT).map((_, i) => ({
  type: 'skeleton',
  uid: `skel-${i}`,
}));

export default function List(props: ListProps) {
  const {
    contentContainerClassName,
    contentContainerStyle,
    data,
    emptyResultProps,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    ItemComponent,
    ListHeaderStickyComponent,
    ListHeaderStickyComponentIsAnimated = true,
    ListStickyComponent,
    ListStickyComponentTopSafeArea,
    ListTopComponent,
    SkeletonComponent,
    style,
    ...rest
  } = props;

  const [stickyHeaderHeight, setStickyHeaderHeight] = useState(0);
  const scrollY = useSharedValue(0);
  const { top } = useSafeArea();

  const showSkeletons = isLoading && !isRefetching;
  const isEmptyData = !isLoading && !isRefetching && (!data || data.length === 0);
  const dataToRender = useMemo(() => {
    const items: ListItem[] = [];

    if (ListStickyComponent) {
      items.push({ type: 'sticky', uid: 'sticky' });
    }
    if (ListTopComponent) {
      items.push({ type: 'header_top', uid: 'header_top' });
    }

    if (showSkeletons) {
      items.push(...SKELETON_DATA);
    } else if (isEmptyData) {
      items.push({ type: 'empty', uid: 'empty_res' });
    } else {
      items.push(...(data || []));
    }

    return items;
  }, [showSkeletons, isEmptyData, data, ListTopComponent, ListStickyComponent]);

  const stickyHeaderIndices = useMemo(() => {
    if (ListStickyComponent) {
      return [0];
    }
    return undefined;
  }, [ListStickyComponent]);

  const onEndReached = useCallback(() => {
    if (!isLoading && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isLoading, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const getItemType = useCallback((item: ListItem) => {
    if (item && typeof item === 'object' && 'type' in item) {
      return item.type;
    }
    return 'row';
  }, []);

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<ListItem>) => {
      if (item && typeof item === 'object' && 'type' in item) {
        switch (item.type) {
          case 'skeleton':
            return <SkeletonComponent />;
          case 'sticky':
            return renderComponent(ListStickyComponent);
          case 'header_top':
            return renderComponent(ListTopComponent);
          case 'empty':
            return <EmptyResult {...emptyResultProps} />;
          default:
            return <ItemComponent item={item} />;
        }
      }
      return <ItemComponent item={item} />;
    },
    [ItemComponent, SkeletonComponent, ListStickyComponent, ListTopComponent, emptyResultProps],
  );

  const keyExtractor = useCallback((item: ListItem, index: number) => {
    if (item && typeof item === 'object') {
      return String((item as any).uid);
    }
    return String(index);
  }, []);

  const onStickyHeaderLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setStickyHeaderHeight(height);
  };

  const listContentContainerStyle: StyleProp<ViewStyle> | undefined = useMemo(() => {
    const listContainerStyle = ListHeaderStickyComponent && {
      marginTop: stickyHeaderHeight - top,
    };

    return listContainerStyle;
  }, [stickyHeaderHeight, top, ListHeaderStickyComponent]);

  const listStyle: ViewStyle | undefined = useMemo(() => {
    if (ListStickyComponent && ListStickyComponentTopSafeArea) {
      return {
        marginTop: top,
      };
    }
    return undefined;
  }, [top, ListStickyComponent, ListStickyComponentTopSafeArea]);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, stickyHeaderHeight], [1, 0], Extrapolation.CLAMP);
    const translateY = interpolate(
      scrollY.value,
      [0, stickyHeaderHeight],
      [0, -stickyHeaderHeight * 0.3],
      Extrapolation.CLAMP,
    );
    const zIndex = interpolate(scrollY.value, [0, stickyHeaderHeight], [50, -1], Extrapolation.CLAMP);
    return {
      opacity,
      transform: [{ translateY }],
      zIndex,
    };
  }, [stickyHeaderHeight]);

  return (
    <>
      {ListHeaderStickyComponent &&
        (ListHeaderStickyComponentIsAnimated ? (
          <Animated.View className="absolute w-full" style={headerAnimatedStyle} onLayout={onStickyHeaderLayout}>
            {renderComponent(ListHeaderStickyComponent)}
          </Animated.View>
        ) : (
          <Box className="absolute w-full" onLayout={onStickyHeaderLayout}>
            {renderComponent(ListHeaderStickyComponent)}
          </Box>
        ))}
      <LegendList
        keyExtractor={keyExtractor}
        data={dataToRender}
        renderItem={renderItem}
        getItemType={getItemType}
        recycleItems
        stickyIndices={stickyHeaderIndices}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        style={[listStyle, style]}
        keyboardShouldPersistTaps="always"
        contentContainerClassName={cn('grow', contentContainerClassName)}
        ListFooterComponent={
          <ListFooter SkeletonComponent={SkeletonComponent} isFetchingNextPage={isFetchingNextPage} />
        }
        onScroll={e => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
        {...(ListHeaderStickyComponent &&
          stickyHeaderHeight && {
            stickyHeaderConfig: {
              offset: -stickyHeaderHeight + top,
            },
          })}
        contentContainerStyle={[listContentContainerStyle, contentContainerStyle]}
        {...rest}
      />
    </>
  );
}
