import React from 'react'

import { useUserMe } from '@/queries/user-me.query';

import SettingsActionsDeleteAccountCancel from './settings-actions-delete-account-cancel.component';
import SettingsActionsDeleteAccountAction from './settings-actions-delete-account-action.component';

export default function SettingsActionsDeleteAccount() {
  const { userMe = {} } = useUserMe()
  const { } = useUserMe || {}

  const hasDeleteAccount = false

  return (
    <>
      {!hasDeleteAccount && <SettingsActionsDeleteAccountAction />}
      {hasDeleteAccount && <SettingsActionsDeleteAccountCancel />}
    </>
  );
}