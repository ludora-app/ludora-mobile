import { useMemo } from 'react';
import { List } from '@ludo/ui';
import { useRouter } from 'expo-router';

import ROUTES from '@/constants/routes.constants';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID } from '@/constants/platform.constants';
import { FieldCardSkeleton } from '@/components/ui/field-card';
import { useFabScrollHide } from '@/hooks/use-fab-scroll-hide.hook';
import { HEADER_OUTLINED_HEIGHT } from '@/components/ui/navigation/header-outlined/header-outlined.component';

import MyFieldCard from './my-field-card.component';
import MyFieldsListFab from './my-fields-list-fab.component';
import { useGetMyFields } from '../../queries/get-my-fields.query';
import MyFieldsHeader from '../my-fields-headers/my-fields-header.component';
import MyFieldsHeaderSticky from '../my-fields-headers/my-fields-header-sticky.component';

const LIST_ITEM_SIZE_HEIGHT = 185;
const LIST_STICKY_COMPONENT_HEIGHT = 75;

export default function MyFieldsList() {
  const router = useRouter();
  const { bottom } = useSafeArea();
  const { fabAnimatedStyle, handleScroll } = useFabScrollHide();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } = useGetMyFields();

  const handleFixedItemsSize = useMemo(
    () => (index: number) => {
      if (index === 0) {
        return LIST_STICKY_COMPONENT_HEIGHT;
      }
      return LIST_ITEM_SIZE_HEIGHT;
    },
    [],
  );

  const handleAddField = () => {
    router.navigate(ROUTES.MY_FIELDS.ADD);
  };

  const paddingBottom = useMemo(() => {
    if (IS_ANDROID) {
      return bottom + HEADER_OUTLINED_HEIGHT;
    }
    return bottom;
  }, [bottom]);

  const listHeaderComponent = useMemo(
    () => <MyFieldsHeader titleKey="my_fields.header_title" />,
    [],
  );
  const listStickyComponent = useMemo(() => <MyFieldsHeaderSticky />, []);
  const contentContainerStyle = useMemo(() => ({ paddingBottom }), [paddingBottom]);

  return (
    <>
      <List
        data={items}
        ItemComponent={MyFieldCard}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        ListHeaderComponent={listHeaderComponent}
        ListStickyComponent={listStickyComponent}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        isRefetching={isRefetching}
        refetch={refetch}
        hasRefreshControl
        contentContainerClassName="grow bg-background px-4 rounded-t-xl"
        contentContainerStyle={contentContainerStyle}
        hasHeaderTransparent
        hasTopSafeArea
        listHeaderComponentHeight={HEADER_OUTLINED_HEIGHT}
        getFixedItemSize={handleFixedItemsSize}
        SkeletonComponent={FieldCardSkeleton}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <MyFieldsListFab onPress={handleAddField} animatedStyle={fabAnimatedStyle} />
    </>
  );
}
