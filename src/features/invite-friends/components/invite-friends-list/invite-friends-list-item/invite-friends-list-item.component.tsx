import { cn, useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { useShallow } from 'zustand/react/shallow';
import { BoxRowCenterBetween, BoxRow, String, IconButton, Box, Avatar, Wrapper } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { FriendResponseData } from '@/api/generated/model';
import { MAX_FRIENDS_TO_INVITE_LIMIT } from '@/features/invite-friends/constants/invite-friends.constants';

import { useInviteFriendsStore } from '../../../stores/invite-friends.store';

interface InviteFriendsListItemProps {
  item: FriendResponseData;
}

export default function InviteFriendsListItem(props: InviteFriendsListItemProps) {
  const { t } = useTranslate();
  const { item } = props;
  const { addFriend, isFriendSelected, numberOfFriends, removeFriend } = useInviteFriendsStore(
    useShallow(state => ({
      addFriend: state.addFriend,
      isFriendSelected: state.friends.includes(item),
      numberOfFriends: state.numberOfFriends,
      removeFriend: state.removeFriend,
    })),
  );
  const { toast } = useToast();

  const { avatarUrl, firstname, isInvited: isFriendInvited, lastname } = item || {};

  const handleSubmit = () => {
    if (isFriendInvited) return;
    if (isFriendSelected) {
      removeFriend(item);
    } else {
      if (numberOfFriends === MAX_FRIENDS_TO_INVITE_LIMIT) {
        toast({
          allowMultiple: true,
          message: t('invite-friends.max-friends_to_select_warning_message'),
          variant: 'warning',
        });
        return;
      }
      addFriend(item);
    }
  };

  const isFriendAlreadlyInvited = isFriendInvited || isFriendSelected;

  return (
    <Wrapper fill={false} className="pb-3">
      <BoxRowCenterBetween className="border-primary bg-primary/10 gap-3 rounded-2xl border px-4 py-3">
        <BoxRow className="flex-1 items-center gap-3">
          <Avatar
            data={{
              firstname,
              imageUrl: avatarUrl,
              lastname,
            }}
          />
          <BoxRow className="flex-1 items-center">
            <Box className="flex-1">
              <String useFastText={false} truncate>
                {firstname} {lastname}
              </String>
            </Box>
            {isFriendInvited && (
              <String color="#666" variant="body-xs" useFastText={false}>
                {t('invite-friends.friend_already_invited')}
              </String>
            )}
          </BoxRow>
        </BoxRow>
        <IconButton
          isDisabled={isFriendInvited}
          onPress={handleSubmit}
          iconName={isFriendAlreadlyInvited ? 'forward-contact-regular' : 'user-add-regular'}
          variant="outlined"
          iconColor={COLORS.primary}
          rounded="circle"
          className={cn(isFriendAlreadlyInvited && 'opacity-60')}
        />
      </BoxRowCenterBetween>
    </Wrapper>
  );
}
