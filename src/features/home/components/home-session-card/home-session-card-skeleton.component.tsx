import { SessionCardSkeleton } from '@/components/ui/session-card';

import HomeSessionCardWrapper from './home-session-card-wrapper.component';

export default function HomeSessionCardSkeleton() {
  return (
    <HomeSessionCardWrapper>
      <SessionCardSkeleton />
    </HomeSessionCardWrapper>
  );
}
