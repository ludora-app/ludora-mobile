import { list } from 'radash';
import React, { useCallback, useMemo } from 'react';
import { FlashList, FlashListProps } from '@shopify/flash-list';

type ListProps = {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  itemComponent: React.ComponentType<{ item: any }>;
  items: any[];
  skeletonComponent?: React.ComponentType;
  hasNextPage: boolean;
} & Omit<FlashListProps<any>, 'renderItem' | 'getItemType' | 'data' | 'keyExtractor'>;

type SkeletonItem = { type: 'skeleton'; uid: string };
type ListItem = FieldResponseDto | SkeletonItem;

const SKELETON_COUNT = 3;
const SKELETON_DATA: SkeletonItem[] = list(SKELETON_COUNT).map((_, i) => ({
  type: 'skeleton',
  uid: `skel-${i}`,
}));

export default function List(props: ListProps) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    itemComponent: ItemComponent,
    items,
    skeletonComponent: SkeletonComponent,
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
    return item?.uid?.toString();
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
      onEndReachedThreshold={0.7}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      {...rest}
    />
  );
}
