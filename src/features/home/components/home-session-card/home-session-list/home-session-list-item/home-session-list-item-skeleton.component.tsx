import { SessionCardSkeleton } from '@/components/ui/session-card';

import HomeSessionListItemWrapper from './home-session-list-item-wrapper.component';

export default function HomeSessionListItemSkeleton() {
  return (
    <HomeSessionListItemWrapper>
      <SessionCardSkeleton />
    </HomeSessionListItemWrapper>
  );
}
