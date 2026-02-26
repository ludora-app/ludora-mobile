import { memo } from 'react';
import { Wrapper } from '@ludo/ui';

import { SessionCardSkeleton } from '@/components/ui/session-card';

function ProfilSection5ListItemSkeleton() {
  return (
    <Wrapper>
      <SessionCardSkeleton />
    </Wrapper>
  )
}

export default memo(ProfilSection5ListItemSkeleton);