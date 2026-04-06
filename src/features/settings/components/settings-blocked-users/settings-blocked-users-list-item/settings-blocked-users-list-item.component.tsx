import { memo } from 'react'
import { useTranslate } from '@tolgee/react'
import { Avatar, BoxRow, BoxRowCenterBetween, Button, String } from '@ludo/ui'

import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { UserSimpleDisplayWithUidData } from '@/api/generated/model'
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm'
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants'

import { useUnblockUser } from '../../../queries/unblock-user.query'

interface SettingsBlockedUsersListItemProps {
  item: UserSimpleDisplayWithUidData
}

function SettingsBlockedUsersListItem({ item }: SettingsBlockedUsersListItemProps) {
  const { firstname, imageUrl, lastname, uid: userUid } = item || {}
  const { t } = useTranslate()
  const { trackError, trackEvent } = useAnalytics()
  const { isPending: isLoadingUnblockUser, mutateAsync: unblockUser } = useUnblockUser(userUid)

  const handleUnblockUser = async () => {
    try {
      await unblockUser()
      trackEvent({ eventName: ANALYTICS_EVENTS.SETTINGS.SETTINGS_UNBLOCK_USER_SUCCESS })
    } catch (error) {
      trackError({ error })
    }

  }

  return (
    <BoxRowCenterBetween className="border-primary bg-primary/10 gap-3 rounded-2xl border px-4 py-3">
      <BoxRow className="items-center gap-3 flex-1">
        <Avatar
          data={{
            firstname,
            imageUrl: imageUrl ? { uri: imageUrl } : undefined,
            lastname,
          }}
        />
        <String truncate>
          {firstname} {lastname}
        </String>
      </BoxRow>
      <DialogConfirm
        source='settings_unblock_user'
        confirmButtonTitleKey="settings_unblock_user"
        title={t("settings_unblock_user_title", { name: `${firstname}` })}
        content={t("settings_unblock_user_content", { name: `${firstname}` })}
        onConfirmPromise={handleUnblockUser}
        isLoading={isLoadingUnblockUser}
      >
        <Button title={t("settings_unblock_user")} size='sm' fit className='self-center' />
      </DialogConfirm>
    </BoxRowCenterBetween>
  )
}

export default memo(SettingsBlockedUsersListItem)
