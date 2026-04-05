import { Button } from '@ludo/ui';
import { memo, useCallback, useState } from 'react';

import COLORS from '@/constants/colors.contstants';
import { TIconsAll } from '@/constants/icons.constants';
import { FindAllUsersResponseDataDtoInvitationStatus, FriendResponseDataStatus } from '@/api/generated/model';

import { usePlayersListContext } from '../../../context/players-list.context';

type PlayersListItemInviteProps = {
  userUid: string;
  invitationStatus?: FindAllUsersResponseDataDtoInvitationStatus;
};

const getButtonConfig = (invitationStatus?: FindAllUsersResponseDataDtoInvitationStatus) => {
  const isPending = invitationStatus === FriendResponseDataStatus.PENDING;
  const isAccepted = invitationStatus === FriendResponseDataStatus.ACCEPTED;

  let titleKey: string;
  let iconName: TIconsAll;
  let iconColor: string;

  if (isPending) {
    titleKey = 'profil.invitation_sent_button_title';
    iconName = 'receive-contact-solid';
    iconColor = COLORS.muted;
  } else if (isAccepted) {
    titleKey = 'profil.invitation_accepted_button_title';
    iconName = 'user-tick-solid';
    iconColor = COLORS.primary;
  } else {
    titleKey = 'profil.friend_request_button_title';
    iconName = 'user-add-solid';
    iconColor = '#fff';
  }

  return {
    colorVariant: isPending ? ('muted' as const) : ('primary' as const),
    iconColor,
    iconName,
    isDisabled: isPending || isAccepted,
    titleKey,
    variant: isAccepted ? ('outlined' as const) : ('contained' as const),
  };
};

function PlayersListItemInvite({ invitationStatus, userUid }: PlayersListItemInviteProps) {
  const { onInvite, t } = usePlayersListContext();
  const [isLocalPending, setIsLocalPending] = useState(false);

  const { colorVariant, iconColor, iconName, isDisabled, titleKey, variant } = getButtonConfig(invitationStatus);

  const handleInvitePress = useCallback(async () => {
    setIsLocalPending(true);
    try {
      await onInvite(userUid);
    } finally {
      setIsLocalPending(false);
    }
  }, [onInvite, userUid]);

  return (
    <Button
      title={t(titleKey)}
      size="sm"
      onPress={handleInvitePress}
      isLoading={isLocalPending}
      iconProps={{
        className: 'mr-2',
        color: iconColor,
        name: iconName,
        position: 'left',
      }}
      colorVariant={colorVariant}
      isDisabled={isDisabled}
      variant={variant}
    />
  );
}

export default memo(PlayersListItemInvite);
