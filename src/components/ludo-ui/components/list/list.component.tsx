import { list } from 'radash';
import { LayoutChangeEvent } from 'react-native';
import { useCallback, useMemo, useState } from 'react';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { EmptyResult } from '@/components/ui/empty-resulat';

import { Box } from '../box';
import { renderComponent } from './utils';
import ListFooter from './list-footer.component';
import { ListProps } from '../../types/list.types';

type SkeletonItem = { type: 'skeleton'; id: string };
type SpecialItem = { type: 'sticky' | 'header_top'; id: string };

type ListItem = SkeletonItem | SpecialItem;

const SKELETON_COUNT = 3;

const SKELETON_DATA: SkeletonItem[] = list(SKELETON_COUNT).map((_, i) => ({
  id: `skel-${i}`,
  type: 'skeleton',
}));

export default function List(props: ListProps) {
  const {
    contentContainerStyle,
    data,
    emptyResultTitle,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    ItemComponent,
    ListHeaderStickyComponent,
    ListStickyComponent,
    ListTopComponent,
    SkeletonComponent,
    ...rest
  } = props;

  const [stickyHeaderHeight, setStickyHeaderHeight] = useState(0);
  const { top } = useSafeArea();

  const showSkeletons = isLoading && !isRefetching && (!data || data.length === 0);

  const dataToRender = useMemo(() => {
    const items: ListItem[] = [];

    if (ListStickyComponent) {
      items.push({ id: 'sticky', type: 'sticky' });
    }
    if (ListTopComponent) {
      items.push({ id: 'header_top', type: 'header_top' });
    }

    const content = showSkeletons ? SKELETON_DATA : data || [];

    return [...items, ...content];
  }, [showSkeletons, data, ListTopComponent, ListStickyComponent]);

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
          default:
            return <ItemComponent item={item} />;
        }
      }
      return <ItemComponent item={item} />;
    },
    [ItemComponent, SkeletonComponent, ListStickyComponent, ListTopComponent],
  );

  const keyExtractor = useCallback((item: ListItem, index: number) => {
    if (item && typeof item === 'object') {
      if ('type' in item) return item.id;
      if ('uid' in item) return String((item as any).uid);
      if ('id' in item) return String((item as any).id);
    }
    return String(index);
  }, []);

  const listStyle = useMemo(() => {
    if (ListStickyComponent) {
      return {
        marginTop: top,
      };
    }
    return undefined;
  }, [top, ListStickyComponent]);

  const onStickyHeaderLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setStickyHeaderHeight(height);
  };

  const listContentContainerStyle = useMemo(() => {
    const style = [
      ListHeaderStickyComponent && {
        marginTop: stickyHeaderHeight - top,
      },
      contentContainerStyle,
    ];
    return style;
  }, [stickyHeaderHeight, top, contentContainerStyle, ListHeaderStickyComponent]);

  return (
    <>
      {ListHeaderStickyComponent && (
        <Box className="absolute w-full" onLayout={onStickyHeaderLayout}>
          {renderComponent(ListHeaderStickyComponent)}
        </Box>
      )}
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
        style={listStyle}
        keyboardShouldPersistTaps="always"
        ListFooterComponent={
          <ListFooter SkeletonComponent={SkeletonComponent} isFetchingNextPage={isFetchingNextPage} />
        }
        ListEmptyComponent={<EmptyResult title={emptyResultTitle} />}
        {...(ListHeaderStickyComponent &&
          stickyHeaderHeight && {
            stickyHeaderConfig: {
              offset: -stickyHeaderHeight + top,
            },
          })}
        contentContainerStyle={listContentContainerStyle}
        {...rest}
      />
    </>
  );
}
