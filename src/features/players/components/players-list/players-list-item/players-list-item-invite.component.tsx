import { useMemo } from 'react';
import { Button } from '@ludo/ui'
import { useTranslate } from '@tolgee/react';

import COLORS from '@/constants/COLORS';
import { TIconsAll } from '@/constants/ICONS';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { FriendResponseDataStatus } from '@/api/generated/model';
import { useSendFriendInvitation } from '@/queries/send-friend-invitation.query';

type PlayersListItemInviteProps = {
  userUid: string;
  invitationStatus: FriendResponseDataStatus;
}

export default function PlayersListItemInvite(props: PlayersListItemInviteProps) {
  const { t } = useTranslate()
  const { invitationStatus, userUid } = props
  const { trackError } = useAnalytics()
  const { isPending: sendFriendInvitationPending, mutateAsync: sendFriendInvitation } = useSendFriendInvitation(userUid);
  const isFriendRequestPending = invitationStatus === FriendResponseDataStatus.PENDING
  const isFriendRequestAccepted = invitationStatus === FriendResponseDataStatus.ACCEPTED

  const handleInvitePress = () => {
    try {
      sendFriendInvitation();
    } catch (error) {
      trackError({ error })
    }
  };

  const handleFriendsBtnTitle = useMemo(() => {
    if (isFriendRequestPending) {
      return t("profil.invitation_sent_button_title")
    }
    if (isFriendRequestAccepted) {
      return t("profil.invitation_accepted_button_title")
    }
    return t("profil.friend_request_button_title")
  }, [isFriendRequestAccepted, isFriendRequestPending, t])


  const handleIconName = useMemo<TIconsAll>(() => {
    if (isFriendRequestPending) {
      return "receive-contact-solid"
    }
    if (isFriendRequestAccepted) {
      return "user-tick-solid"
    }
    return "user-add-solid"
  }, [isFriendRequestAccepted, isFriendRequestPending])


  const handleFriendBtnIconColor = useMemo(() => {
    if (isFriendRequestPending) {
      return COLORS.muted
    }
    if (isFriendRequestAccepted) {
      return COLORS.primary
    }
    return "#fff"
  }, [isFriendRequestAccepted, isFriendRequestPending])

  const isFriendRequestSent = isFriendRequestPending || isFriendRequestAccepted

  return (
    <Button
      title={handleFriendsBtnTitle}
      size="sm"
      onPress={handleInvitePress}
      isLoading={sendFriendInvitationPending}
      iconProps={{
        className: 'mr-2',
        color: handleFriendBtnIconColor,
        name: handleIconName,
        position: "left"
      }}
      colorVariant={isFriendRequestPending ? "muted" : "primary"}
      isDisabled={isFriendRequestSent}
      variant={isFriendRequestAccepted ? "outlined" : "contained"}
    />
  )
}