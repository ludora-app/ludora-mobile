import { Button } from '@ludo/ui'
import { useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';

import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { useCancelDeleteAccount } from '@/features/settings/queries/delete-account/delete-account-cancel.query';


const DELETE_CANCEL_ACCOUNT_EVENT = ANALYTICS_EVENTS.SETTINGS.SETTINGS_DELETE_ACCOUNT_CANCEL_SUCCESS

export default function SettingsActionsDeleteAccountCancel() {
  const { toast } = useToast()
  const { trackError, trackEvent } = useAnalytics()
  const { isPending: isDeleteAccountCancelLoading, mutateAsync: cancelDeleteAccount } =
    useCancelDeleteAccount()
  const { t } = useTranslate()

  const handleAbordDeleteAccount = async () => {
    try {
      await cancelDeleteAccount()
      trackEvent({ eventName: DELETE_CANCEL_ACCOUNT_EVENT })
      toast({
        message: t("settings.delete_account_cancel_success_message"),
        variant: "success"
      })
    } catch (error) {
      trackError({ error })
    }
  }

  return (
    <Button
      title={t('settings.delete_account_abord_button')}
      colorVariant="success"
      isLoading={isDeleteAccountCancelLoading} onPress={handleAbordDeleteAccount}
    />
  );
}