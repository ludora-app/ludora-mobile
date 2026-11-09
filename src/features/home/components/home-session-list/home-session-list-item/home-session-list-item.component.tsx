import { memo } from 'react';
import { Box } from '@ludo/ui';

import { SessionCard } from '@/components/ui/session-card';
import { SessionCollectionItemDto } from '@/api/generated/model';

import { HomeSessionListItemBadge } from './home-session-list-item-badge.component';
import { getHomeSessionBadge, useHomeSessionListContext } from '../../../context/home-session-list.context';

type HomeSessionListItemProps = {
  item: SessionCollectionItemDto;
};

/** A session of "Toutes les sessions": no button, the whole card opens the session. */
const HomeSessionListItemComponent = ({ item }: HomeSessionListItemProps) => {
  const { joinedUids, recommendedUids } = useHomeSessionListContext();
  const badge = getHomeSessionBadge({ joinedUids, recommendedUids, uid: item.uid });

  return (
    <Box className="px-4 pb-3">
      <SessionCard item={item} topContent={badge && <HomeSessionListItemBadge type={badge} />} />
    </Box>
  );
};

export const HomeSessionListItem = memo(HomeSessionListItemComponent);
