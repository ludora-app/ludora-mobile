import { StrictOmit } from '@chillui/ui';
import { FlashListProps } from '@shopify/flash-list';

export type ListProps = {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  ItemComponent: React.ComponentType<{ item: any }>;
  items: any[];
  SkeletonComponent?: React.ComponentType;
  hasNextPage: boolean;
  emptyResultTitle?: string;
} & Omit<FlashListProps<any>, 'renderItem' | 'getItemType' | 'data' | 'keyExtractor'>;

export type ListAnimatedProps = StrictOmit<ListProps, 'ListHeaderComponent' | 'StickyHeaderComponent'> & {
  StickyElementComponent?: React.ComponentType | React.ReactElement;
  HeaderComponent?: React.ComponentType | React.ReactElement;
  TopListElementComponent?: React.ComponentType | React.ReactElement;
};
