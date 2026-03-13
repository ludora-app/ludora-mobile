import React from 'react'
import { useToast } from '@chillui/ui'
import { useTranslate } from '@tolgee/react'
import { useLocalSearchParams, useRouter } from 'expo-router'

import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { ParamsFormSheetActions } from '@/features/profil/types'
import { FriendResponseDataStatus } from '@/api/generated/model'
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm'
import { useRemoveFriend } from '@/features/profil/queries/remove-friend.query'
import { useGetFriendRequest } from '@/features/profil/queries/friends/get-friend-request.query'

import ProfilHeaderActionsItem from './profil-header-actions-item.component'

export default function ProfilHeaderActionsRemoveFriend() {
  const { firstname, id: userId, lastname } = useLocalSearchParams<ParamsFormSheetActions>()
  const { t } = useTranslate()
  const { trackError } = useAnalytics()
  const { toast } = useToast()
  const router = useRouter()
  const { isPending: isRemovingFriend, mutateAsync: removeFriend } = useRemoveFriend(userId)
  const { data: friendRequest } = useGetFriendRequest(userId)

  const { status: invitationStatus } = friendRequest || {}


  const isFriendRequestAccepted = invitationStatus === FriendResponseDataStatus.ACCEPTED

  if (!isFriendRequestAccepted) {
    return null
  }

  const removeUserFriend = async () => {
    try {
      await removeFriend()
      toast({
        message: t("profil.remove_friend_success", { name: `${firstname} ${lastname}` }),
        variant: "success",
      })
      router.back()
    } catch (error) {
      trackError({ error })
    }
  }



  return (
    <DialogConfirm
      title={t('profil.remove_friend_button_label')}
      content={t('profil.remove_friend_content', { name: `${firstname} ${lastname}` })}
      source="profil_header_actions_remove_friend"
      confirmButtonTitleKey="common.button_confirm"
      onConfirmPromise={removeUserFriend}
      isLoading={isRemovingFriend}
      priority="confirm"
    >
      <ProfilHeaderActionsItem
        iconName="remove-contact-solid"
        label={t('profil.remove_friend_button_label')}
      />
    </DialogConfirm>
  )
}