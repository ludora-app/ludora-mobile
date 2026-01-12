import { ListAnimated } from '@/components/ludo-ui';
import { useGetAllFieldsByFilter } from '@/features/create-session/queries/get-fields-by-filter.query';

import CreateSessionStep2FieldCard from '../create-session-step-2-field-card/create-session-step-2-field-card';
import CreateSessionStep2FieldCardSkeleton from '../create-session-step-2-field-card/create-session-step-2-field-card-skeleton';
import CreateSessionStep2FieldsListHeader from './create-session-step-2-fields-list-headers/create-session-step-2-fields-list-header.component';
import CreateSessionStep2FieldsListHeaderSticky from './create-session-step-2-fields-list-headers/create-session-step-2-fields-list-header-sticky.component';
import CreateSessionStep2FieldsListHeaderTopList from './create-session-step-2-fields-list-headers/create-session-step-2-fields-list-header-top-list.component';

export default function CreateSessionStep2FieldsList() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    items: fields,
  } = useGetAllFieldsByFilter();

  // TODO: fix keyboard issue with flashlist (doesn't clic on item when keyboard is open)
  return (
    <ListAnimated
      items={fields}
      isRefetching={isRefetching}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      SkeletonComponent={CreateSessionStep2FieldCardSkeleton}
      ItemComponent={CreateSessionStep2FieldCard}
      StickyElementComponent={CreateSessionStep2FieldsListHeaderSticky}
      HeaderComponent={CreateSessionStep2FieldsListHeader}
      TopListElementComponent={CreateSessionStep2FieldsListHeaderTopList}
      bounces={false}
      emptyResultTitle="create-session-steps.step-2.no_result_title_v"
    />
  );
}
