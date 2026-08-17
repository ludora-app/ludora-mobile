import { LegendListProps, LegendListRef } from '@legendapp/list/react-native';

import { StrictOmit } from '@/components/chill-ui-library';
import { EmptyResultProps } from '@/components/ui/empty-resulat/empty-result.component';

/**
 * Item types produced by the `List` wrapper: the rows it injects around the data,
 * and `row` for a data item.
 */
export type ListItemType = 'empty' | 'header_top' | 'loading' | 'row' | 'skeleton' | 'sticky';

/**
 * `type` also accepts a plain string because a data item carrying its own `type`
 * field is forwarded as-is by the wrapper's `getItemType`.
 */
export type GetListFixedItemSize<ItemT = any> = (
  item: ItemT,
  index: number,
  type: ListItemType | (string & {}) | undefined,
) => number | undefined;

export type ListProps = {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  ItemComponent: React.ComponentType<{ item: any }>;
  data: any[] | readonly any[];
  SkeletonComponent?: React.ComponentType;
  hasNextPage: boolean;
  refetch?: () => Promise<any>;
  emptyResultProps?: EmptyResultProps;
  ListStickyComponent?: React.ComponentType | React.ReactElement;
  ListTopComponent?: React.ComponentType | React.ReactElement;
  hasListStickyComponentTopSafeArea?: boolean;
  hasHeaderTransparent?: boolean;
  listHeaderComponentHeight?: number;
  hasRefreshControl?: boolean;
  triggerEndReachedOnStart?: boolean;
  listRef?: React.RefObject<LegendListRef | null>;
  hasTopSafeArea?: boolean;
  hasBottomSafeArea?: boolean;
} & StrictOmit<LegendListProps<any>, 'renderItem' | 'getItemType' | 'data' | 'keyExtractor' | 'children'>;
