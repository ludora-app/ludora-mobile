import { Box, String } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

import { CreateSessionFromRequestDtoGameMode } from '@/api/generated/model'

import { PreferencesSportData } from '../../../stores/settings-preferences.store'
import SettingsPreferencesGameModesChipsList from './settings-preferences-game-modes-chips-list.component'

interface SettingsPreferencesGameModesSectionProps {
  sportPreferences: PreferencesSportData[]
  onToggleGameMode: (sport: string, gameMode: CreateSessionFromRequestDtoGameMode) => void
}

export default function SettingsPreferencesGameModesSection(props: SettingsPreferencesGameModesSectionProps) {
  const { onToggleGameMode, sportPreferences } = props
  const { t } = useTranslate()

  return (
    <Box className='gap-4'>
      <String variant="body-3" font="primaryBold">
        {t('settings.preferences.game_modes_title')}
      </String>
      <String variant="body-1" className='text-gray-500'>
        {t('settings.preferences.game_modes_description')}
      </String>
      <SettingsPreferencesGameModesChipsList
        sportPreferences={sportPreferences}
        onToggleGameMode={onToggleGameMode}
      />
    </Box>
  )
}
