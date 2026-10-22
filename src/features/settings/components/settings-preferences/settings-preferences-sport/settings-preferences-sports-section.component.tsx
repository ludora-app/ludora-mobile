import { useTranslate } from '@tolgee/react'
import { Box, BoxRowCenterBetween, String } from '@ludo/ui'

import { SportItem } from '@/types/sports.types'
import { useGetSports } from '@/queries/get-sports.query'
import { useSettingsPreferencesStore } from '@/features/settings/stores/settings-preferences.store'

import SettingsPreferencesSportItem from './settings-preferences-sport-item.component'



export default function SettingsPreferencesSportsSection() {
  const { t } = useTranslate()
  const { sports } = useGetSports()
  const toggleSportPreference = useSettingsPreferencesStore(state => state.toggleSportPreference)

  const handleSportPress = (sport: SportItem) => {
    toggleSportPreference(sport.code)
  }

  return (
    <Box className='gap-4'>
      <String variant="body-3" font="primaryBold">
        {t('settings.preferences.sports_title')}
      </String>
      <String variant="body-1" className='text-gray-500'>
        {t('settings.preferences.sports_description')}
      </String>
      <BoxRowCenterBetween className="flex-wrap gap-5">
        {sports.map(sport => (
          <SettingsPreferencesSportItem
            key={sport.code}
            onPress={handleSportPress}
            sport={sport}
          />
        ))}
      </BoxRowCenterBetween>
    </Box>
  )
}

