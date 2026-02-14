import { Chip } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

import { CreateSportPreferenceDataGameModesItem } from '@/api/generated/model'

interface SettingsPreferencesGameModeChipProps {
  isSelected: boolean
  gameMode: CreateSportPreferenceDataGameModesItem
  onPress: (gameMode: CreateSportPreferenceDataGameModesItem) => void
}

export default function SettingsPreferencesGameModeChip({ gameMode, isSelected, onPress }: SettingsPreferencesGameModeChipProps) {
  const { t } = useTranslate()

  return (
    <Chip
      title={t(`common.game_mode_${gameMode}`, { space: ' ' })}
      onPress={() => onPress(gameMode)}
      variant="outlined"
      colorVariant={isSelected ? 'primary' : 'muted'}
      className="bg-white"
    />
  )
}
