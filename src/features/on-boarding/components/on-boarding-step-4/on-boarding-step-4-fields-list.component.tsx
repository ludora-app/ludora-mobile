import { useMemo } from 'react';

import { List } from '@/components/ludo-ui';
import { FieldResponseDto, FieldResponseDtoType } from '@/api/generated/model';
import CreateSessionStep2FieldCardSkeleton from '@/features/create-session/components/create-session-steps/create-session-step-2/create-session-step-2-field-card/create-session-step-2-field-card-skeleton';

import OnBoardingStep4FieldCard from './on-boarding-step-4-field-card';
import { useGetAllFieldsByFilter } from '../../queries/get-fields-by-filter.query';

const LIST_TOP_COMPONENT_HEIGHT = 88;
const LIST_STICKY_COMPONENT_HEIGHT = 59.33;
const LIST_PUBLIC_FIELD_ITEM_HEIGHT = 227;
const LIST_PRIVATE_FIELD_ITEM_HEIGHT = 241;

export default function OnBoardingStep4FieldsList() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    items: fields,
  } = useGetAllFieldsByFilter();

  const fixedEstimatedItemsSize = useMemo(
    () => (index: number, item: FieldResponseDto) => {
      switch (index) {
        case 0:
          return LIST_STICKY_COMPONENT_HEIGHT;
        case 1:
          return LIST_TOP_COMPONENT_HEIGHT;
        default:
          if (item.type === FieldResponseDtoType.PRIVATE) {
            return LIST_PRIVATE_FIELD_ITEM_HEIGHT;
          }
          return LIST_PUBLIC_FIELD_ITEM_HEIGHT;
      }
    },
    [],
  );

  // TODO: fix keyboard issue with flashlist (doesn't clic on item when keyboard is open)
  return (
    <List
      data={fields}
      isRefetching={isRefetching}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      getFixedItemSize={fixedEstimatedItemsSize}
      SkeletonComponent={CreateSessionStep2FieldCardSkeleton}
      ItemComponent={OnBoardingStep4FieldCard}
      // ListStickyComponent={CreateSessionStep2FieldsListHeaderSticky}
      // ListHeaderComponent={CreateSessionStep2FieldsListHeader}
      // ListTopComponent={CreateSessionStep2FieldsListHeaderTopList}
      bounces={false}
      emptyResultProps={{
        hasRandomTitle: true,
        title: 'create-session-steps.step-2.no_result_title_v',
      }}
    />
  );
}
