import { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { GetListFixedItemSize, List } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { useFabScrollHide } from '@/hooks/use-fab-scroll-hide.hook';
import { FieldResponseDto, FieldResponseDtoType } from '@/api/generated/model';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import { useGetAllFieldsByFilter } from '@/features/create-session/queries/get-fields-by-filter.query';
import MyFieldsListFab from '@/features/my-fields/components/my-fields-list/my-fields-list-fab.component';

import CreateSessionStep2FieldCard from '../create-session-step-2-field-card/create-session-step-2-field-card';
import CreateSessionStep2FieldCardSkeleton from '../create-session-step-2-field-card/create-session-step-2-field-card-skeleton';
import CreateSessionStep2FieldsListHeader from './create-session-step-2-fields-list-headers/create-session-step-2-fields-list-header.component';
import CreateSessionStep2FieldsListHeaderSticky from './create-session-step-2-fields-list-headers/create-session-step-2-fields-list-header-sticky.component';
import CreateSessionStep2FieldsListHeaderTopList from './create-session-step-2-fields-list-headers/create-session-step-2-fields-list-header-top-list.component';

const LIST_TOP_COMPONENT_HEIGHT = 95;
const LIST_STICKY_COMPONENT_HEIGHT = 59.33;
const LIST_PUBLIC_FIELD_ITEM_HEIGHT = 227;
const LIST_PRIVATE_FIELD_ITEM_HEIGHT = 241;

const EMPTY_RESULT_PROPS = {
  hasRandomTitle: true,
  randomOptions: 3,
  title: 'create-session-steps.step-2.no_result_title_v',
} as const;

export default function CreateSessionStep2FieldsList() {
  const router = useRouter();
  const sport = useCreateSessionStore(state => state.session?.sport);
  const { fabAnimatedStyle, handleScroll } = useFabScrollHide();

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    items: fields,
    refetch,
  } = useGetAllFieldsByFilter();

  const fixedItemsSize = useMemo<GetListFixedItemSize<FieldResponseDto>>(
    () => (item, _index, type) => {
      if (type === 'sticky') {
        return LIST_STICKY_COMPONENT_HEIGHT;
      }
      if (type === 'header_top') {
        return LIST_TOP_COMPONENT_HEIGHT;
      }
      if (item.type === FieldResponseDtoType.PRIVATE) {
        return LIST_PRIVATE_FIELD_ITEM_HEIGHT;
      }

      return LIST_PUBLIC_FIELD_ITEM_HEIGHT;
    },
    [],
  );

  const handleAddField = () => {
    router.navigate({
      params: { sport },
      pathname: ROUTES.MY_FIELDS.ADD,
    });
  };

  return (
    <>
      <List
        data={fields}
        isRefetching={isRefetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        hasRefreshControl
        isFetchingNextPage={isFetchingNextPage}
        getFixedItemSize={fixedItemsSize}
        SkeletonComponent={CreateSessionStep2FieldCardSkeleton}
        ItemComponent={CreateSessionStep2FieldCard}
        ListStickyComponent={CreateSessionStep2FieldsListHeaderSticky}
        ListHeaderComponent={CreateSessionStep2FieldsListHeader}
        ListTopComponent={CreateSessionStep2FieldsListHeaderTopList}
        onScroll={handleScroll}
        emptyResultProps={EMPTY_RESULT_PROPS}
      />
      <MyFieldsListFab onPress={handleAddField} animatedStyle={fabAnimatedStyle} />
    </>
  );
}
