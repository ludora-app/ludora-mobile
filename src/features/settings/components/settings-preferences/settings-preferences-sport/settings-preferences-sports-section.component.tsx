import { useTranslate } from '@tolgee/react'
import { Box, BoxRowCenterBetween, String } from '@ludo/ui'

import { SPORTS, SportProps } from '@/constants/sports.constants'

import { PreferencesSportData } from '../../../stores/settings-preferences.store'
import SettingsPreferencesSportItem from './settings-preferences-sport-item.component'

interface SettingsPreferencesSportsSectionProps {
  sportPreferences: PreferencesSportData[]
  onSportPress: (sport: SportProps) => void
}

export default function SettingsPreferencesSportsSection(props: SettingsPreferencesSportsSectionProps) {
  const { onSportPress, sportPreferences } = props
  const { t } = useTranslate()

  return (
    <Box className='gap-4'>
      <String variant="body-3" font="primaryBold">
        {t('settings.preferences.sports_title')}
      </String>
      <String variant="body-1" className='text-gray-500'>
        {t('settings.preferences.sports_description')}
      </String>
      <BoxRowCenterBetween className="flex-wrap gap-5">
        {SPORTS.map(sport => {
          const pref = sportPreferences.find(sp => sp.sport === sport.name)
          return (
            <SettingsPreferencesSportItem
              key={sport.id}
              level={pref?.level}
              onPress={onSportPress}
              sport={sport}
            />
          )
        })}
      </BoxRowCenterBetween>
    </Box>
  )
}

