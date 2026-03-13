import { memo } from 'react'
import { Box } from '@ludo/ui'

import SettingsHeader from '@/features/settings/components/settings-header.component'

function SettingsBlockedUsersHeader() {
  return (
    <Box className="pb-5">
      <SettingsHeader titleKey="settings.blocked_users.header_title" className="mt-2" />
    </Box>
  )
}

export default memo(SettingsBlockedUsersHeader)
