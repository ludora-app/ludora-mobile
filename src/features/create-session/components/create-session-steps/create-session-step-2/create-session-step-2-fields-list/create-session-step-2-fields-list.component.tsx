import { list } from 'radash';
import { useCallback, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { ScrollView } from 'react-native-gesture-handler';

import { FieldResponseDto } from '@/api/generated/model';
import { useGetAllFieldsByFilter } from '@/features/create-session/queries/get-fields-by-filter.query';
import HomeSessionCardListEmpty from '@/features/home/components/home-session-card/home-session-card-list/home-session-card-list-empty.component';
import HomeSessionCardListFooterComponent from '@/features/home/components/home-session-card/home-session-card-list/home-session-card-list-footer.component';

import CreateSessionStep2FieldsListHeader from './create-session-step-2-fields-list-header.component';
import CreateSessionStep2FieldCard from '../create-session-step-2-field-card/create-session-step-2-field-card';
import CreateSessionStep2FieldCardSkeleton from '../create-session-step-2-field-card/create-session-step-2-field-card-skeleton';

type SkeletonItem = { type: 'skeleton'; uid: string };
type ListItem = FieldResponseDto | SkeletonItem;

const SKELETON_COUNT = 3;
const SKELETON_DATA: SkeletonItem[] = list(SKELETON_COUNT).map((_, i) => ({
  type: 'skeleton',
  uid: `skel-${i}`,
}));

export default function CreateSessionStep2FieldsList() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    items: fields,
  } = useGetAllFieldsByFilter();

  const isLoadingSessions = isLoading || isRefetching;
  const showSkeletons = isLoading;

  const onEndReached = useCallback(() => {
    if (!isLoadingSessions && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isLoadingSessions, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const renderItem = useCallback(({ item }) => {
    if ('type' in item && item.type === 'skeleton') {
      return <CreateSessionStep2FieldCardSkeleton />;
    }
    return <CreateSessionStep2FieldCard field={item} />;
  }, []);

  const getItemType = useCallback(
    (item: ListItem) => ('type' in item && item.type === 'skeleton' ? 'skeleton' : 'row'),
    [],
  );

  const dataToRender = useMemo(() => (showSkeletons ? SKELETON_DATA : fields), [showSkeletons, fields]);
  const keyExtractor = useCallback((item: ListItem) => {
    if ('type' in item && item.type === 'skeleton') {
      return (item as SkeletonItem).uid;
    }
    return item?.uid?.toString();
  }, []);

  // TODO: fix keyboard issue with flashlist (dosnt clic on item when keyboard is open)
  return (
    <FlashList
      data={dataToRender}
      renderItem={renderItem}
      getItemType={getItemType}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<HomeSessionCardListEmpty />}
      ListHeaderComponent={<CreateSessionStep2FieldsListHeader />}
      stickyHeaderHiddenOnScroll
      renderScrollComponent={ScrollView}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<HomeSessionCardListFooterComponent isFetchingNextPage={isFetchingNextPage} />}
      scrollEventThrottle={16}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      drawDistance={500}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled
    />
  );
}
