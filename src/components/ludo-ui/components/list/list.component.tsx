import { list } from 'radash';
import { cn, LoadingIndicator } from '@chillui/ui';
import { useCallback, useMemo, useState } from 'react';
import { useWindowDimensions, ViewStyle } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list/react-native';

import COLORS from '@/constants/colors.contstants';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { EmptyResult } from '@/components/ui/empty-resulat';

import { Box } from '../box';
import { renderComponent } from './utils';
import ListFooter from './list-footer.component';
import { ListItemType, ListProps } from '../../types/list.types';

type SkeletonItem = { type: 'skeleton'; uid: string };
type SpecialItem = { type: 'sticky' | 'header_top'; uid: string };
type EmptyItem = { type: 'empty'; uid: string };
type LoadingItem = { type: 'loading'; uid: string };
type ListItem = SkeletonItem | SpecialItem | EmptyItem | LoadingItem;

const SKELETON_COUNT = 3;

const SKELETON_DATA: SkeletonItem[] = list(SKELETON_COUNT).map((_, i) => ({
  type: 'skeleton',
  uid: `skel-${i}`,
}));

// Stable references, so that a re-render with unchanged data is not reported as a data change.
const STICKY_ITEM: SpecialItem = { type: 'sticky', uid: 'sticky' };
const HEADER_TOP_ITEM: SpecialItem = { type: 'header_top', uid: 'header_top' };
const EMPTY_ITEM: EmptyItem = { type: 'empty', uid: 'empty_res' };
const LOADING_ITEM: LoadingItem = { type: 'loading', uid: 'loading' };

export default function List(props: ListProps) {
  const {
    contentContainerClassName,
    contentContainerStyle,
    data,
    emptyResultProps,
    fetchNextPage,
    hasBottomSafeArea = false,
    hasHeaderTransparent,
    hasListStickyComponentTopSafeArea,
    hasNextPage,
    hasRefreshControl,
    hasTopSafeArea = false,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    ItemComponent,
    ListHeaderComponent,
    listHeaderComponentHeight,
    listRef,
    ListStickyComponent,
    ListTopComponent,
    refetch,
    SkeletonComponent,
    style,
    triggerEndReachedOnStart = false,
    ...rest
  } = props;

  const { bottom, safeTop } = useSafeArea();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const showSkeletons = isLoading && !isRefetching && !!SkeletonComponent;
  const isEmptyData = !isLoading && !isRefetching && (!data || data.length === 0);
  const dataToRender = useMemo(() => {
    const items: ListItem[] = [];

    if (ListStickyComponent) {
      items.push(STICKY_ITEM);
    }
    if (ListTopComponent) {
      items.push(HEADER_TOP_ITEM);
    }

    if (showSkeletons) {
      items.push(...SKELETON_DATA);
    } else if (isLoading && !isRefetching) {
      items.push(LOADING_ITEM);
    } else if (isEmptyData) {
      items.push(EMPTY_ITEM);
    } else {
      items.push(...(data || []));
    }

    return items;
  }, [showSkeletons, isEmptyData, data, ListTopComponent, ListStickyComponent, isLoading, isRefetching]);

  // New Architecture reports a scroll length of 0 before the first layout, so without this hint
  // nothing is rendered until a layout round-trip has completed.
  const estimatedListSize = useMemo(() => ({ height: windowHeight, width: windowWidth }), [windowHeight, windowWidth]);

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

  const getItemType = useCallback((item: ListItem): ListItemType => {
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
            return SkeletonComponent ? <SkeletonComponent /> : null;
          case 'sticky':
            return renderComponent(ListStickyComponent);
          case 'header_top':
            return renderComponent(ListTopComponent);
          case 'loading':
            return (
              <Box className="flex-1 items-center justify-center py-10">
                <LoadingIndicator name="swing" color={COLORS.primary} size="xl" />
              </Box>
            );
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

  const listStyle: ViewStyle | undefined = useMemo(() => {
    if ((ListStickyComponent && hasListStickyComponentTopSafeArea) || hasTopSafeArea) {
      return {
        marginTop: safeTop,
      };
    }
    return undefined;
  }, [safeTop, ListStickyComponent, hasListStickyComponentTopSafeArea, hasTopSafeArea]);

  const bottomSafeAreaStyle: ViewStyle | undefined = useMemo(() => {
    if (hasBottomSafeArea && listHeaderComponentHeight) {
      return {
        paddingBottom: bottom + (listHeaderComponentHeight || 0),
      };
    }
    if (hasBottomSafeArea) {
      return {
        paddingBottom: bottom,
      };
    }

    return undefined;
  }, [bottom, hasBottomSafeArea, listHeaderComponentHeight]);

  const headerComponent = useMemo(() => {
    if (hasHeaderTransparent) {
      return <Box style={{ marginTop: -(listHeaderComponentHeight || 0) }}>{renderComponent(ListHeaderComponent)}</Box>;
    }
    return renderComponent(ListHeaderComponent);
  }, [hasHeaderTransparent, listHeaderComponentHeight, ListHeaderComponent]);

  const handleRefresh = useCallback(async () => {
    if (refetch) {
      setIsManualRefreshing(true);
      try {
        await refetch();
      } finally {
        setIsManualRefreshing(false);
      }
    }
  }, [refetch]);

  return (
    <LegendList
      ref={listRef}
      keyExtractor={keyExtractor}
      data={dataToRender}
      renderItem={renderItem}
      getItemType={getItemType}
      recycleItems
      estimatedListSize={estimatedListSize}
      {...(!triggerEndReachedOnStart &&
        listHeaderComponentHeight !== undefined && { estimatedHeaderSize: listHeaderComponentHeight })}
      stickyHeaderIndices={stickyHeaderIndices}
      {...(triggerEndReachedOnStart && { onStartReached: onEndReached })}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      style={[listStyle, style]}
      {...(hasHeaderTransparent &&
        !!listHeaderComponentHeight && {
          stickyHeaderConfig: {
            offset: -listHeaderComponentHeight,
          },
        })}
      {...(hasRefreshControl && {
        refreshControl: (
          <RefreshControl
            refreshing={isManualRefreshing && isRefetching}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
          />
        ),
      })}
      {...(hasRefreshControl && { onRefresh: handleRefresh })}
      contentContainerClassName={cn(
        'grow',
        { 'justify-center': isEmptyData && emptyResultProps?.center },
        contentContainerClassName,
      )}
      ListFooterComponent={
        !triggerEndReachedOnStart ? (
          <ListFooter SkeletonComponent={SkeletonComponent} isFetchingNextPage={isFetchingNextPage} />
        ) : undefined
      }
      scrollEventThrottle={16}
      contentContainerStyle={[
        { marginTop: listHeaderComponentHeight || 0 },
        bottomSafeAreaStyle,
        contentContainerStyle,
      ]}
      ListHeaderComponent={
        triggerEndReachedOnStart ? (
          <ListFooter SkeletonComponent={SkeletonComponent} isFetchingNextPage={isFetchingNextPage} />
        ) : (
          headerComponent
        )
      }
      {...rest}
    />
  );
}
