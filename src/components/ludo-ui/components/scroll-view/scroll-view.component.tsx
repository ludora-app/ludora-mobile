import { cn } from '@chillui/ui';
import { RefObject, useCallback, useState } from 'react';
import { RefreshControl, ScrollView as RNScrollView, ScrollViewProps as RNScrollViewProps } from 'react-native';

import COLORS from '@/constants/colors.contstants';
import { useSafeArea } from '@/hooks/safe-area.hook';

export type ScrollViewProps = RNScrollViewProps & {
  contentContainerClassName?: string;
  hasRefreshControl?: boolean;
  isRefetching?: boolean;
  refetch?: () => Promise<any>;
  ref?: RefObject<RNScrollView>;
};

export default function ScrollView(props: ScrollViewProps) {
  const {
    children,
    contentContainerClassName,
    contentContainerStyle,
    hasRefreshControl,
    isRefetching,
    ref,
    refetch,
    showsVerticalScrollIndicator = false,
    stickyHeaderHiddenOnScroll = true,
    stickyHeaderIndices = [0],
    ...rest
  } = props;

  const { top } = useSafeArea();
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (refetch) {
      setIsManualRefreshing(true);
      try {
        await refetch();
      } finally {
        setIsManualRefreshing(false);
      }
    }
  }, [refetch]);

  return (
    <RNScrollView
      ref={ref}
      stickyHeaderIndices={stickyHeaderIndices}
      stickyHeaderHiddenOnScroll={stickyHeaderHiddenOnScroll}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerClassName={cn('grow', contentContainerClassName)}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        hasRefreshControl ? (
          <RefreshControl
            refreshing={!!(isRefetching && isManualRefreshing)}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            progressViewOffset={top}
          />
        ) : undefined
      }
      {...rest}
    >
      {children}
    </RNScrollView>
  );
}
