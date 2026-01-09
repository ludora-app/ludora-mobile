import { Avatar, cn } from '@chillui/ui';
import { useShallow } from 'zustand/react/shallow';
import { BoxRowCenterBetween, BoxRow, String, IconButton, Box } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { FriendResponseData } from '@/api/generated/model';

import { useInviteFriendsStore } from '../../../stores/invite-friends.store';

interface InviteFriendsListItemProps {
  item: FriendResponseData;
}

export default function InviteFriendsListItem(props: InviteFriendsListItemProps) {
  const { item } = props;
  const { addFriend, isInvited, removeFriend } = useInviteFriendsStore(
    useShallow(state => ({
      addFriend: state.addFriend,
      isInvited: state.friends.includes(item),
      removeFriend: state.removeFriend,
    })),
  );

  const { userName, userProfilePicture } = item || {};

  const handleSubmit = () => {
    if (isInvited) {
      removeFriend(item);
    } else {
      addFriend(item);
    }
  };

  return (
    <BoxRowCenterBetween className="mb-3 rounded-2xl bg-black/10 px-4 py-3">
      <BoxRow className="flex-1 items-center gap-3">
        <Avatar
          data={{
            firstname: userName,
            image_url: userProfilePicture,
            // lastname: 'amir',
          }}
        />
        <Box className="flex-1">
          <String className="text-gray-900 text-base font-semibold">{userName}</String>
        </Box>
      </BoxRow>
      <IconButton
        onPress={handleSubmit}
        iconName={isInvited ? 'forward-contact-regular' : 'user-add-regular'}
        variant="outlined"
        iconColor={COLORS.primary}
        rounded="circle"
        className={cn(isInvited && 'opacity-60')}
      />
    </BoxRowCenterBetween>
  );
}
