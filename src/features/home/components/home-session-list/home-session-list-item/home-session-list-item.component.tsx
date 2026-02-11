import { memo } from 'react';

import { SessionCard } from '@/components/ui/session-card';
import { SessionCollectionItemDto } from '@/api/generated/model';

import HomeSessionListItemWrapper from './home-session-list-item-wrapper.component';

interface HomeSessionListItemProps {
  item: SessionCollectionItemDto;
}

function HomeSessionListItem({ item }: HomeSessionListItemProps) {
  return (
    <HomeSessionListItemWrapper>
      <SessionCard item={item} />
    </HomeSessionListItemWrapper>
  );
}

export default memo(HomeSessionListItem, (prevProps, nextProps) => prevProps.item.uid === nextProps.item.uid);
