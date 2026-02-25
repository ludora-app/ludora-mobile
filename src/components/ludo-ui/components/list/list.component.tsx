import { list } from 'radash';
import { ViewStyle } from 'react-native';
import { cn, LoadingIndicator } from '@chillui/ui';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';

import COLORS from '@/constants/colors.contstants';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { EmptyResult } from '@/components/ui/empty-resulat';

import { Box } from '../box';
import { renderComponent } from './utils';
import ListFooter from './list-footer.component';
import { ListProps } from '../../types/list.types';

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

  const { bottom, top } = useSafeArea();
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const showSkeletons = isLoading && !isRefetching && !!SkeletonComponent;
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
    } else if (isLoading && !isRefetching) {
      items.push({ type: 'loading', uid: 'loading' });
    } else if (isEmptyData) {
      items.push({ type: 'empty', uid: 'empty_res' });
    } else {
      items.push(...(data || []));
    }

    return items;
  }, [showSkeletons, isEmptyData, data, ListTopComponent, ListStickyComponent, isLoading, isRefetching]);

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
        marginTop: top,
      };
    }
    return undefined;
  }, [top, ListStickyComponent, hasListStickyComponentTopSafeArea, hasTopSafeArea]);

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


  const headerComponent = () => {
    if (hasHeaderTransparent) {
      return (
        <Box style={{ marginTop: -(listHeaderComponentHeight || 0) }}>
          {renderComponent(ListHeaderComponent)}
        </Box>
      );
    }
    return renderComponent(ListHeaderComponent);
  };

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
      stickyIndices={stickyHeaderIndices}
      {...(triggerEndReachedOnStart && { onStartReached: onEndReached })}
      {...(onEndReached && { onEndReached })}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      style={[listStyle, style]}
      {...(hasHeaderTransparent && !!listHeaderComponentHeight && {
        stickyHeaderConfig: {
          offset: -listHeaderComponentHeight
        }
      })}
      {...(hasRefreshControl && {
        refreshControl: (
          <RefreshControl refreshing={isManualRefreshing && isRefetching} onRefresh={handleRefresh} colors={[COLORS.primary]} />
        )
      })}
      {...(hasRefreshControl && { onRefresh: handleRefresh })}
      keyboardShouldPersistTaps="always"
      contentContainerClassName={cn('grow', { "justify-center": isEmptyData && emptyResultProps?.center }, contentContainerClassName)}
      ListFooterComponent={
        !triggerEndReachedOnStart
          ? <ListFooter SkeletonComponent={SkeletonComponent} isFetchingNextPage={isFetchingNextPage} />
          : undefined
      }
      scrollEventThrottle={16}
      contentContainerStyle={[{ marginTop: listHeaderComponentHeight || 0 }, bottomSafeAreaStyle, contentContainerStyle]}
      ListHeaderComponent={
        triggerEndReachedOnStart
          ? <ListFooter SkeletonComponent={SkeletonComponent} isFetchingNextPage={isFetchingNextPage} />
          : headerComponent
      }
      {...rest}
    />

  );
}
