import { Fragment } from 'react'
import { useTranslate } from '@tolgee/react'
import { Box, BoxRow, Icon, Image, Separator, String } from '@ludo/ui'

import { getSportImage } from '@/utils/sports.utils'
import { GAMEMODES_BY_SPORT } from '@/constants/session.constants'
import { CreateSportPreferenceDataGameModesItem, SessionCollectionItemDtoSport } from '@/api/generated/model'

import { useSettingsPreferencesStore } from '../../../stores/settings-preferences.store'
import SettingsPreferencesGameModeChip from './settings-preferences-game-modes-chip.component'

interface SettingsPreferencesGameModeSectionProps {
  onToggleGameMode: (sport: string, gameMode: CreateSportPreferenceDataGameModesItem) => void
}

export default function SettingsPreferencesGameModesChipsList(props: SettingsPreferencesGameModeSectionProps) {
  const { onToggleGameMode } = props
  const sportPreferences = useSettingsPreferencesStore(state => state.sportPreferences)

  const { t } = useTranslate()

  if (sportPreferences.length === 0) {
    return (
      <Box className="items-center gap-2 py-4">
        <Icon name="ludo-eating-pizza" className="size-24" />
        <String className="text-center">{t('settings.preferences.no_sport_selected')}</String>
      </Box>
    )
  }

  return (
    <Box className="gap-5">
      {sportPreferences.map((pref, index) => (
        <Fragment key={pref.sport}>
          <Box className="gap-3">
            <BoxRow className="items-center gap-2">
              <Image source={getSportImage(pref.sport as SessionCollectionItemDtoSport)} className="size-8" />
              <String font="primarySemiBold">{pref.sport}</String>
            </BoxRow>
            <BoxRow className="flex-wrap gap-2">
              {GAMEMODES_BY_SPORT[pref.sport as SessionCollectionItemDtoSport]?.map((gameMode) => (
                <SettingsPreferencesGameModeChip
                  key={gameMode}
                  gameMode={gameMode}
                  isSelected={pref.gameModes?.includes(gameMode) ?? false}
                  onPress={(gm) => onToggleGameMode(pref.sport, gm)}
                />
              ))}
            </BoxRow>
          </Box>
          {index !== sportPreferences.length - 1 && <Separator deviderClassName="bg-ring" />}
        </Fragment>
      ))}
    </Box>
  )
}
