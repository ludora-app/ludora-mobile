import { memo } from 'react'
import { Box } from '@ludo/ui'

import SettingsHeader from '@/features/settings/components/settings-header.component'

import SettingsSessionsHistoryTypeList from '../settings-sessions-history-types/settings-sessions-history-type-list.component'

function SessionsHistoryHeader() {
  return (
    <Box className="gap-5 pb-5">
      <SettingsHeader titleKey="settings.history.header_title" />
      <SettingsSessionsHistoryTypeList />
    </Box>
  )
}

export default memo(SessionsHistoryHeader)
