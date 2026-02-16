import { memo } from 'react'

import SettingsHeader from '@/features/settings/components/settings-header.component'

function SettingsFavoritesHeader() {
  return (
    <SettingsHeader titleKey="settings.favorites.header_title" />
  )
}

export default memo(SettingsFavoritesHeader)
