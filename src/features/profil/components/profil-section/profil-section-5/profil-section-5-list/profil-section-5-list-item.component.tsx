import { memo } from 'react';
import { Wrapper } from '@ludo/ui';

import { SessionCard } from '@/components/ui/session-card';
import { SessionCollectionItemDto } from '@/api/generated/model';

type ProfilSection5ListItemProps = {
  item: SessionCollectionItemDto;
}

function ProfilSection5ListItem(props: ProfilSection5ListItemProps) {
  const { item } = props;
  return (
    <Wrapper>
      <SessionCard item={item} />
    </Wrapper>
  )
}

export default memo(ProfilSection5ListItem);

