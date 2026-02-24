import { useMemo } from 'react';
import { cn, useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams } from 'expo-router';
import { Box, BoxRow, Button, IconButton } from '@ludo/ui'

import COLORS from '@/constants/COLORS';
import { TIconsAll } from '@/constants/ICONS';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { FriendResponseDataStatus } from '@/api/generated/model';
import { useSendFriendInvitation } from '@/queries/send-friend-invitation.query'
import { useGetFriendRequest } from '@/features/profil/queries/friends/get-friend-request.query'

export default function ProfilSection3User() {
  const { trackError } = useAnalytics()
  const { id: userId } = useLocalSearchParams();
  const { toast } = useToast()
  const { t } = useTranslate()
  const { isPending: isPendingFriendInvitation, mutateAsync: sendFriendInvitation } = useSendFriendInvitation(userId as string)
  const { data: friendRequest } = useGetFriendRequest(userId as string)

  const { status: invitationStatus } = friendRequest || {}


  const isFriendRequestPending = invitationStatus === FriendResponseDataStatus.PENDING
  const isFriendRequestAccepted = invitationStatus === FriendResponseDataStatus.ACCEPTED

  const isFriendRequestSent = isFriendRequestPending || isFriendRequestAccepted


  const handleSendFriendInvitation = async () => {
    if (isFriendRequestSent) {
      return
    }
    try {
      await sendFriendInvitation()
      toast({
        message: t("profil.invitation_sent"),
        variant: "success",
      })
    } catch (error) {
      trackError({ error })
    }
  }

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



  return (
    <BoxRow className='items-center gap-2'>
      <Box className={cn(isFriendRequestAccepted ? 'flex-1' : 'flex-2')}>
        <Button
          title={handleFriendsBtnTitle}
          size="sm"
          onPress={handleSendFriendInvitation}
          isLoading={isPendingFriendInvitation}
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
      </Box>
      <Box className='grow'>
        <Button
          title={t("common.message")}
          size="sm"
          iconProps={{
            className: 'mr-2',
            color: "#fff",
            name: "message-text-solid",
            position: "left"
          }} />
      </Box>
      <IconButton iconName='card-to-left-solid' rounded="circle" size="sm" />
    </BoxRow>
  )
}