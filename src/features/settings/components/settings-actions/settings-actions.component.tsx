import { Box, Separator } from '@ludo/ui'

import SettingsActionsLogout from './settings-actions-logout.component'
import SettingsActionsDeleteAccount from './settings-actions-delete-account/settings-actions-delete-account.component'

export default function SettingsActions() {

  return (
    <Box className='gap-4'>
      <SettingsActionsLogout />
      <Separator />
      <SettingsActionsDeleteAccount />
    </Box>
  )
}