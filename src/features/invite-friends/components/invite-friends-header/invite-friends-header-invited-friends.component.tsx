import React from 'react';
import { Avatar, cn } from '@chillui/ui';
import { BoxRow, String } from '@ludo/ui';

import { useInviteFriendsStore } from '../../stores/invite-friends.store';

export default function InviteFriendsHeaderInvitedFriends() {
  const friends = useInviteFriendsStore(state => state.friends);
  return (
    <BoxRow className="items-center gap-0.5">
      <BoxRow className="items-center">
        {friends.slice(0, 5).map(({ friendUid, userName, userProfilePicture }, index) => (
          <Avatar
            key={friendUid}
            data={{ firstname: userName, image_url: userProfilePicture }}
            size="xs"
            className={cn(index > 0 && '-ml-5')}
          />
        ))}
      </BoxRow>
      {friends.length > 5 && <String variant="body-sm">+{friends.length - 5}</String>}
      <String variant="body-sm">
        {' '}
        ami{friends.length > 1 ? 's' : ''} sélectionné{friends.length > 1 ? 's' : ''}
        {friends.length === 0 && 'Aucun ami sélectionné'}
      </String>
      <String variant="body-xs">{friends.length === 10 && ' (limite de 10 amis atteinte)'}</String>
    </BoxRow>
  );
}
