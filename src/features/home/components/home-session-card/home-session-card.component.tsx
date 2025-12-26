import { memo } from 'react';

import { SessionCard } from '@/components/ui/session-card';
import { SessionCollectionItem } from '@/api/generated/model';

import HomeSessionCardWrapper from './home-session-card-wrapper.component';

interface HomeSessionCardProps {
  session: SessionCollectionItem;
}

function HomeSessionCard({ session }: HomeSessionCardProps) {
  return (
    <HomeSessionCardWrapper>
      <SessionCard session={session} />
    </HomeSessionCardWrapper>
  );
}

export default memo(HomeSessionCard, (prevProps, nextProps) => prevProps.session.uid === nextProps.session.uid);
