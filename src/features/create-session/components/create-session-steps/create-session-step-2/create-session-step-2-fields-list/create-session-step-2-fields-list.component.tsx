import { Icon, List } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import ROUTES from '@/constants/routes.constants';
import { FieldResponseDto, FieldResponseDtoType } from '@/api/generated/model';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import { useGetAllFieldsByFilter } from '@/features/create-session/queries/get-fields-by-filter.query';

import CreateSessionStep2FieldCard from '../create-session-step-2-field-card/create-session-step-2-field-card';
import CreateSessionStep2FieldCardSkeleton from '../create-session-step-2-field-card/create-session-step-2-field-card-skeleton';
import CreateSessionStep2FieldsListHeader from './create-session-step-2-fields-list-headers/create-session-step-2-fields-list-header.component';
import CreateSessionStep2FieldsListHeaderSticky from './create-session-step-2-fields-list-headers/create-session-step-2-fields-list-header-sticky.component';
import CreateSessionStep2FieldsListHeaderTopList from './create-session-step-2-fields-list-headers/create-session-step-2-fields-list-header-top-list.component';

const LIST_TOP_COMPONENT_HEIGHT = 88;
const LIST_STICKY_COMPONENT_HEIGHT = 59.33;
const LIST_PUBLIC_FIELD_ITEM_HEIGHT = 227;
const LIST_PRIVATE_FIELD_ITEM_HEIGHT = 241;

const SCROLL_THRESHOLD = 5;

export default function CreateSessionStep2FieldsList() {
  const router = useRouter();
  const sport = useCreateSessionStore(state => state.session?.sport);

  const lastScrollY = useRef(0);
  const fabScale = useSharedValue(1);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    items: fields,
    refetch,
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

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = e.nativeEvent.contentOffset.y;
    const delta = currentY - lastScrollY.current;

    if (delta > SCROLL_THRESHOLD) {
      fabScale.value = withTiming(0, { duration: 200 });
    } else if (delta < -SCROLL_THRESHOLD) {
      fabScale.value = withTiming(1, { duration: 200 });
    }

    lastScrollY.current = currentY;
  }, [fabScale]);

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  const handleAddField = () => {
    router.push({
      params: { sport },
      pathname: ROUTES.CREATE_SESSION.STEP_2_CREATE_FIELD_FORM_SHEET,
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
        getFixedItemSize={fixedEstimatedItemsSize}
        SkeletonComponent={CreateSessionStep2FieldCardSkeleton}
        ItemComponent={CreateSessionStep2FieldCard}
        ListStickyComponent={CreateSessionStep2FieldsListHeaderSticky}
        ListHeaderComponent={CreateSessionStep2FieldsListHeader}
        ListTopComponent={CreateSessionStep2FieldsListHeaderTopList}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        emptyResultProps={{
          hasRandomTitle: true,
          title: 'create-session-steps.step-2.no_result_title_v',
        }}
      />
      <Animated.View style={[fabAnimatedStyle]} className="absolute bottom-6 right-5">
        <Pressable
          onPress={handleAddField}
          className="size-14 items-center justify-center rounded-full bg-primary"
        >
          <Icon name="add-circle-regular" size="lg" color="#FFF" />
        </Pressable>
      </Animated.View>
    </>
  );
}
