import { memo } from 'react'

import SettingsHeader from '@/features/settings/components/settings-header.component'

function NotificationListHeader() {
  return (
    <SettingsHeader titleKey="notifications.header_title" hasHorizontalPadding />
  )
}

export default memo(NotificationListHeader)