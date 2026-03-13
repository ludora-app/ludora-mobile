
import { useTranslate } from '@tolgee/react'
import { useLocalSearchParams, useRouter } from 'expo-router'

import { useToast } from '@/components/chill-ui-library'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { ParamsFormSheetActions } from '@/features/profil/types'
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm'
import { useBlockUser } from '@/features/profil/queries/block-user.query'
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants'

import ProfilHeaderActionsItem from './profil-header-actions-item.component'

const BLOCK_USER_EVENT = ANALYTICS_EVENTS.PROFIL.PROFIL_HEADER_ACTIONS_BLOCK_USER

export default function ProfilHeaderActionsBlockUser() {
  const { toast } = useToast()
  const router = useRouter()
  const { firstname, id: userId, lastname } = useLocalSearchParams<ParamsFormSheetActions>()
  const { t } = useTranslate()
  const { isPending: isLoadingBlockUser, mutateAsync: blockUser } = useBlockUser(userId)
  const { trackError, trackEvent } = useAnalytics()

  const handleBlockUser = async () => {
    try {
      await blockUser()
      trackEvent({ eventName: BLOCK_USER_EVENT })
      router.dismissAll()
      toast({
        message: t('profil.block_user_success_message', { name: `${firstname} ${lastname}` }),
        variant: 'success',
      })
    } catch (error) {
      trackError({ error })
    }
  }
  return (
    <DialogConfirm
      title={t('profil.block_user_title', { name: firstname })}
      content={t('profil.block_user_content', { name: `${firstname} ${lastname}` })}
      source="profil_header_actions_block_user"
      confirmButtonTitleKey="common.block"
      onConfirmPromise={handleBlockUser}
      isLoading={isLoadingBlockUser}
      priority="confirm"
    >
      <ProfilHeaderActionsItem iconName="fordbidden-contact-solid" label={t('profil.block_user_button_label')} />
    </DialogConfirm>
  )
}