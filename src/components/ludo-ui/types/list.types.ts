import { LegendListProps } from '@legendapp/list';

import { StrictOmit } from '@/components/chill-ui-library';
import { EmptyResultProps } from '@/components/ui/empty-resulat/empty-result.component';

export type ListProps = {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  ItemComponent: React.ComponentType<{ item: any }>;
  data: any[];
  SkeletonComponent?: React.ComponentType;
  hasNextPage: boolean;
  refetch: () => Promise<any>;
  emptyResultProps?: EmptyResultProps;
  ListStickyComponent?: React.ComponentType | React.ReactElement;
  ListTopComponent?: React.ComponentType | React.ReactElement;
  ListStickyComponentTopSafeArea?: boolean;
  headerTransparent?: boolean;
  listHeaderComponentHeight?: number;
  hasRefreshControl?: boolean;
} & StrictOmit<LegendListProps<any>, 'renderItem' | 'getItemType' | 'data' | 'keyExtractor' | 'children'>;
