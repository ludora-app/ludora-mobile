import { list } from 'radash';
import { cn } from '@chillui/ui';
import { useCallback, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';

import { EmptyResult } from '@/components/ui/empty-resulat';

import ListFooter from './list-footer.component';
import { ListProps } from '../../types/list.types';

type SkeletonItem = { type: 'skeleton'; uid: string };
type ListItem = any[] | SkeletonItem;

const SKELETON_COUNT = 3;
const SKELETON_DATA: SkeletonItem[] = list(SKELETON_COUNT).map((_, i) => ({
  type: 'skeleton',
  uid: `skel-${i}`,
}));

export default function List(props: ListProps) {
  const {
    contentContainerClassName,
    emptyResultTitle,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    ItemComponent,
    items,
    SkeletonComponent,
    ...rest
  } = props;

  const isLoadingSessions = isLoading || isRefetching;
  const showSkeletons = isLoading;

  const onEndReached = useCallback(() => {
    if (!isLoadingSessions && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isLoadingSessions, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const renderItem = useCallback(
    ({ item }) => {
      if ('type' in item && item.type === 'skeleton') {
        return <SkeletonComponent />;
      }
      return <ItemComponent item={item} />;
    },
    [ItemComponent, SkeletonComponent],
  );

  const getItemType = useCallback(
    (item: ListItem) => ('type' in item && item.type === 'skeleton' ? 'skeleton' : 'row'),
    [],
  );

  const dataToRender = useMemo(() => (showSkeletons ? SKELETON_DATA : items), [showSkeletons, items]);
  const keyExtractor = useCallback((item: ListItem) => {
    if ('type' in item && item.type === 'skeleton') {
      return (item as SkeletonItem).uid;
    }
    return (item as any)?.uid?.toString();
  }, []);

  return (
    <FlashList
      keyExtractor={keyExtractor}
      data={dataToRender}
      renderItem={renderItem}
      getItemType={getItemType}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      contentContainerClassName={cn('pb-5', contentContainerClassName)}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      ListFooterComponent={<ListFooter SkeletonComponent={SkeletonComponent} isFetchingNextPage={isFetchingNextPage} />}
      ListEmptyComponent={<EmptyResult title={emptyResultTitle} />}
      {...rest}
    />
  );
}
