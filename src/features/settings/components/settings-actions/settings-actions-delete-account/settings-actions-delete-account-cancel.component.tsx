import React from 'react'
import { Button } from '@ludo/ui'
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';

import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useDeleteAccount } from '../../../queries/delete-account.query';

const DELETE_CANCEL_ACCOUNT_EVENT = ANALYTICS_EVENTS.SETTINGS.SETTINGS_DELETE_ACCOUNT_CANCEL_SUCCESS

export default function SettingsActionsDeleteAccountCancel() {

  const router = useRouter()
  const { trackError, trackEvent } = useAnalytics()
  const { isPending: isDeleteAccountLoading, mutateAsync: deleteAccount } = useDeleteAccount()
  const { t } = useTranslate()

  const handleAbordDeleteAccount = async () => {
    try {
      await deleteAccount()
      trackEvent({ eventName: DELETE_CANCEL_ACCOUNT_EVENT })
      router.back()
    } catch (error) {
      trackError({ error })
    }
  }

  return (
    <Button title={t('settings.delete_account_abord_button')} colorVariant="success" isLoading={isDeleteAccountLoading} onPress={handleAbordDeleteAccount} />
  );
}