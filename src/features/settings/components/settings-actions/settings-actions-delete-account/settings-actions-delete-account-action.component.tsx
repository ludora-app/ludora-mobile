import { Button } from '@ludo/ui'
import { useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';

import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm'
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useDeleteAccount } from '../../../queries/delete-account/delete-account.query';

const DELETE_ACCOUNT_EVENT = ANALYTICS_EVENTS.SETTINGS.SETTINGS_DELETE_ACCOUNT_SUCCESS

export default function SettingsActionsDeleteAccountAction() {
  const { toast } = useToast()
  const { trackError, trackEvent } = useAnalytics()
  const { isPending: isDeleteAccountLoading, mutateAsync: deleteAccount } = useDeleteAccount()
  const { t } = useTranslate()

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount()
      trackEvent({ eventName: DELETE_ACCOUNT_EVENT })
      toast({
        message: t("settings.delete_account_success_message"),
        variant: "success"
      })
    } catch (error) {
      trackError({ error })
    }
  }

  return (
    <DialogConfirm
      title={t("settings.delete_account_title")}
      content={t("settings.delete_account_content")}
      source="settings_delete_account"
      confirmButtonTitleKey="common.delete"
      showIcon
      onConfirmPromise={handleDeleteAccount}
      isLoading={isDeleteAccountLoading}
    >
      <Button title={t('settings.delete_account_button')} colorVariant="danger" />
    </DialogConfirm>
  );
}