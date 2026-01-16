import { LegendListProps } from '@legendapp/list';

import { StrictOmit } from '@/components/chill-ui-library';

export type ListProps = {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  ItemComponent: React.ComponentType<{ item: any }>;
  data: any[];
  SkeletonComponent?: React.ComponentType;
  hasNextPage: boolean;
  emptyResultTitle?: string;
  ListStickyComponent?: React.ComponentType | React.ReactElement;
  ListTopComponent?: React.ComponentType | React.ReactElement;
  ListHeaderStickyComponent?: React.ComponentType | React.ReactElement;
  ListHeaderStickyComponentIsAnimated?: boolean;
  ListStickyComponentTopSafeArea?: boolean;
} & StrictOmit<LegendListProps<any>, 'renderItem' | 'getItemType' | 'data' | 'keyExtractor' | 'children'>;
