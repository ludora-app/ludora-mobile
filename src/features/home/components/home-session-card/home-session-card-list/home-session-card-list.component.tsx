import { list } from 'radash';
import { useCallback, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import Animated, { SharedValue } from 'react-native-reanimated';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, StyleSheet } from 'react-native';

import COLORS from '@/constants/COLORS';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { SessionResponse } from '@/api/generated/model';
import { IS_ANDROID, IS_IOS } from '@/constants/PLATFORM';
import { HEADER_HEIGHT } from '@/components/ui/header/components/header.component';

import HomeSessionCard from '../home-session-card.component';
import HomeSessionCardSkeleton from '../home-session-card-skeleton.component';
import HomeSessionCardListHeader from './home-session-card-list-header.component';
import HomeSessionCardListFooter from './home-session-card-list-footer.component';
import { useGetAllSessionsByFilter } from '../../../queries/useGetAllSessionsByFilter.query';

interface HomeSessionCardListProps {
  scrollY?: SharedValue<number>;
}
const styles = StyleSheet.create({
  listShadow: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
const AnimatedFlashList =
  Animated.createAnimatedComponent<React.ComponentProps<typeof FlashList<SessionResponse>>>(FlashList);

const FETCHING_TIME = 2000;

export default function HomeSessionCardList({ scrollY }: HomeSessionCardListProps) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isRefetching,
    items: sessions,
    refetch,
  } = useGetAllSessionsByFilter();

  const { top } = useSafeArea();

  const listPaddingTop = top + HEADER_HEIGHT;

  // État pour les sessions simulées
  const [simulatedSessions, setSimulatedSessions] = useState<SessionResponse[]>([]);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const isLoadingSessions = isLoading || isRefetching || isFetching;

  // Combine les vraies sessions avec les sessions simulées
  const allSessions = isLoadingSessions ? [] : [...sessions, ...simulatedSessions];

  // Fonction pour simuler l'ajout de 10 sessions supplémentaires
  const simulateMoreSessions = useCallback(() => {
    if (sessions.length > 0) {
      setIsFetchingNextPage(true);

      // Simule un délai de chargement
      setTimeout(() => {
        // Duplique les sessions existantes et change leurs UIDs pour éviter les conflits
        const sessionsToClone = [...sessions].slice(0, 10);
        const newSimulatedSessions = sessionsToClone.map((session, index) => ({
          ...session,
          uid: `simulated-${Date.now()}-${index}`,
        }));
        setSimulatedSessions(prev => [...prev, ...newSimulatedSessions]);
        setIsFetchingNextPage(false);
      }, FETCHING_TIME);
    }
  }, [sessions, setIsFetchingNextPage]);

  const scrollHandler = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollYRef = scrollY;
      if (scrollYRef) {
        scrollYRef.value = event.nativeEvent.contentOffset.y;
      }
    },
    [scrollY],
  );

  const onEndReached = useCallback(() => {
    if (!isLoading && !isFetching) {
      if (hasNextPage) {
        fetchNextPage();
      } else {
        simulateMoreSessions();
      }
    }
  }, [isLoading, isFetching, hasNextPage, fetchNextPage, simulateMoreSessions]);

  const onScrollEndDrag = useCallback(() => {
    if (scrollY && scrollY.value < -50) {
      refetch();
    }
  }, [refetch, scrollY]);

  return (
    <AnimatedFlashList
      keyExtractor={session => session?.uid?.toString()}
      data={isLoadingSessions ? list(5) : allSessions}
      renderItem={({ item: session }) =>
        isLoadingSessions ? <HomeSessionCardSkeleton /> : <HomeSessionCard session={session} />
      }
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={{ marginTop: listPaddingTop }}
      contentContainerClassName="bg-background rounded-t-2xl"
      ListHeaderComponent={<HomeSessionCardListHeader scrollY={scrollY} isFetching={isRefetching || isLoading} />}
      onScrollEndDrag={IS_IOS && onScrollEndDrag}
      showsVerticalScrollIndicator={false}
      style={styles.listShadow}
      ListFooterComponent={<HomeSessionCardListFooter isFetchingNextPage={isFetchingNextPage} />}
      onEndReached={onEndReached}
      refreshControl={
        IS_ANDROID && (
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[COLORS.primary]}
            progressViewOffset={top}
          />
        )
      }
      onEndReachedThreshold={0.5}
    />
  );
}
