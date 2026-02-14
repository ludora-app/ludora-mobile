import { Box, String } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

import { useSettingsPreferencesStore } from '@/features/settings/stores/settings-preferences.store'

import SettingsPreferencesGameModesChipsList from './settings-preferences-game-modes-chips-list.component'



export default function SettingsPreferencesGameModesSection() {
  const { t } = useTranslate()
  const toggleGameMode = useSettingsPreferencesStore(state => state.toggleGameMode)

  return (
    <Box className='gap-4'>
      <String variant="body-3" font="primaryBold">
        {t('settings.preferences.game_modes_title')}
      </String>
      <String variant="body-1" className='text-gray-500'>
        {t('settings.preferences.game_modes_description')}
      </String>
      <SettingsPreferencesGameModesChipsList
        onToggleGameMode={toggleGameMode}
      />
    </Box>
  )
}
