import { memo } from 'react';

import { SessionResponse } from '@/api/generated/model';
import { SessionCard } from '@/components/ui/session-card';

import HomeSessionCardWrapper from './home-session-card-wrapper.component';

interface HomeSessionCardProps {
  session: SessionResponse;
}

function HomeSessionCard({ session }: HomeSessionCardProps) {
  return (
    <HomeSessionCardWrapper>
      <SessionCard session={session} />
    </HomeSessionCardWrapper>
  );
}

export default memo(HomeSessionCard, (prevProps, nextProps) => prevProps.session.uid === nextProps.session.uid);
