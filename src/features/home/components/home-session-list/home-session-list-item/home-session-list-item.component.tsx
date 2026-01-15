import { memo } from 'react';

import { SessionCard } from '@/components/ui/session-card';
import { SessionCollectionItem } from '@/api/generated/model';

import HomeSessionListItemWrapper from './home-session-list-item-wrapper.component';

interface HomeSessionListItemProps {
  item: SessionCollectionItem;
}

function HomeSessionListItem({ item }: HomeSessionListItemProps) {
  return (
    <HomeSessionListItemWrapper>
      <SessionCard session={item} />
    </HomeSessionListItemWrapper>
  );
}

export default memo(HomeSessionListItem, (prevProps, nextProps) => prevProps.item.uid === nextProps.item.uid);
