import { useMemo } from 'react';
import { cn, useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Button } from '@ludo/ui'
import { useLocalSearchParams, useRouter } from 'expo-router';

import { serialize } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { TIconsAll } from '@/constants/icons.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { RootStackParamList } from '@/types/routes-params.types';
import { useSendFriendInvitation } from '@/queries/send-friend-invitation.query'
import { useGetUserDataById } from '@/features/profil/queries/get-user-data-by-id.query'
import { useGetFriendRequest } from '@/features/profil/queries/friends/get-friend-request.query'
import { FindOneConversationResponseDataType, FriendResponseDataStatus } from '@/api/generated/model';

type ChatRoomLocalSearchParams = RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX]

export default function ProfilSection3User() {
  const router = useRouter()
  const { trackError } = useAnalytics()
  const { id: userId } = useLocalSearchParams();
  const { toast } = useToast()
  const { t } = useTranslate()
  const { data: userData } = useGetUserDataById(userId as string)
  const { isPending: isPendingFriendInvitation, mutateAsync: sendFriendInvitation } = useSendFriendInvitation(userId as string)
  const { data: friendRequest, isLoading: isLoadingFriendRequest } = useGetFriendRequest(userId as string)
  const { firstname, imageUrl: avatarUrl, lastname } = userData || {}
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

  const handlePressMessage = () => {
    const params: ChatRoomLocalSearchParams = {
      imageUrl: avatarUrl || '',
      name: [firstname, lastname].filter(Boolean).join(' ') || '',
      receiver: serialize({
        firstname: firstname ?? '',
        lastname: lastname ?? '',
        userUid: userId,
      }),
      type: FindOneConversationResponseDataType.PRIVATE,
      userUid: userId as string,
    }
    router.navigate({ params, pathname: ROUTES.CHAT_ROOM.INDEX_UID(undefined) })
  }

  return (
    <BoxRow className='items-center gap-2'>
      <Box className={cn(isFriendRequestAccepted ? 'flex-1' : 'flex-2')}>
        <Button
          title={handleFriendsBtnTitle}
          size="sm"
          onPress={handleSendFriendInvitation}
          isLoading={isPendingFriendInvitation || isLoadingFriendRequest}
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
          onPress={handlePressMessage}
          iconProps={{
            className: 'mr-2',
            color: COLORS.primary,
            name: "message-text-solid",
            position: "left"
          }}
          variant="outlined"
        />
      </Box>
      {/* <IconButton iconName='card-to-left-solid' rounded="circle" size="sm" /> */}
    </BoxRow>
  )
}