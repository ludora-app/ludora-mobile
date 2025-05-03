import COLORS from '@/constants/COLORS';
import { FlashList } from '@shopify/flash-list';
import { ImageSourcePropType } from 'react-native';
import { String, Flow, Box, Button, Icon } from '@chillUI';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import HomeSessionCard from './home-session-card.component';

interface Session {
  id: string;
  title: string;
  notes: number;
  sport: string;
  endTime: string;
  latitude: number;
  startTime: string;
  longitude: number;
  currentPlayers: number;
  maximumPlayers: number;
  image: ImageSourcePropType;
}

const AnimatedFlashList = Animated.createAnimatedComponent<React.ComponentProps<typeof FlashList<Session>>>(FlashList);

function EmptyList() {
  return <String>Pas de sessions trouvées pour le moment</String>;
}

function ListFooter({ isFetching }: { isFetching?: boolean }) {
  if (isFetching) {
    return <Flow size={48} color={COLORS.primary} className="mb-10 mt-3 self-center" />;
  }
  return <Box className="h-5" />;
}

export default function SessionCardList({ sessions }: { sessions: Session[] }) {
  // const { data, fetchNextPage, footerClassName, hasNextPage, isFetching, isLoading, refetch } = props;

  // const { items, totalCount } = data?.pages[0].data ?? {};

  // Shared value for the bottom bar translation
  const translateY = useSharedValue(0);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  // Animated style for the bottom bar
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Scroll handler to track scroll direction
  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
    onScroll: event => {
      if (lastContentOffset.value > event.contentOffset.y) {
        // up
        if (isScrolling.value) {
          translateY.value = withTiming(0, { duration: 500 });
        }
      } else if (lastContentOffset.value < event.contentOffset.y) {
        // down
        if (isScrolling.value) {
          translateY.value = withTiming(100, { duration: 500 });
        }
      }
      lastContentOffset.value = event.contentOffset.y;
    },
  });

  // Manual refresh
  // const onRefresh = useCallback(async () => {
  // if (!isLoading && !isFetching) {
  //   setRefreshing(true);
  //   await refetch();
  //   setRefreshing(false);
  // }
  // }, [isLoading, isFetching, refetch]);

  // Fetch next page
  // const onEndReached = useCallback(() => {
  //   if (!isLoading && !isFetching && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [isLoading, isFetching, hasNextPage, fetchNextPage]);

  return (
    <Box className="flex-1">
      <AnimatedFlashList
        keyExtractor={item => item.id.toString() ?? ''}
        data={sessions}
        renderItem={({ item }) => <HomeSessionCard session={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyList}
        ListFooterComponent={<ListFooter isFetching={false} />}
        estimatedItemSize={100}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        // onEndReached={isHomeScreen ? onEndReached : undefined}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />

      {/* Animated Bottom Bar */}

      <Animated.View className="absolute bottom-3 right-0 w-fit" style={animatedStyle}>
        <Button variant="primary" size="sm" btnClassName="size-14 self-end">
          <Icon variant="plus-solid" color="#fff" />
        </Button>
      </Animated.View>
    </Box>
  );
}
