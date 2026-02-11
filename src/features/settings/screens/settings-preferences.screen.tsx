import { ScrollView } from 'react-native'
import { useEffect, useMemo } from 'react'
import { useTranslate } from '@tolgee/react'
import { ScreenLayout, Separator, Wrapper } from '@ludo/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'
import { SportProps } from '@/constants/sports.constants'
import Loading from '@/components/ui/loading/loading.component'
import { SportPreferenceResponseDataLevel } from '@/api/generated/model'

import { useGetUserGamesMode } from '../queries/use-get-user-games-mode.query'
import SettingsFooterSubmit from '../components/settings-footer-submit.component'
import { useSettingsPreferencesStore } from '../stores/settings-preferences.store'
import { useGetUserSportPreferences } from '../queries/use-get-user-sport-preferences.query'
import { checkIsPreferencesDirty, formatPreferencesForComparison } from '../utils/settings-preferences.utils'
import SettingsPreferencesHeader from '../components/settings-preferences/settings-preferences-header.component'
import SettingsPreferencesSportsSection from '../components/settings-preferences/settings-preferences-sport/settings-preferences-sports-section.component'
import SettingsPreferencesGameModesSection from '../components/settings-preferences/settings-preferences-game-modes/settings-preferences-game-modes-section.component'

export default function SettingsPreferencesScreen() {
  const { t } = useTranslate()
  const { bottom } = useSafeArea()

  const { data: sportPrefs, isLoading: isSportPrefsLoading, isSuccess: isSportPrefsSuccess } = useGetUserSportPreferences()
  const { data: gameModePrefs, isLoading: isGameModePrefsLoading, isSuccess: isGameModePrefsSuccess } = useGetUserGamesMode()

  const initialize = useSettingsPreferencesStore(state => state.initialize)
  const sportPreferences = useSettingsPreferencesStore(state => state.sportPreferences)
  const setSportPreference = useSettingsPreferencesStore(state => state.setSportPreference)
  const removeSportPreference = useSettingsPreferencesStore(state => state.removeSportPreference)
  const toggleGameMode = useSettingsPreferencesStore(state => state.toggleGameMode)

  useEffect(() => {
    if (!!isSportPrefsSuccess && !!isGameModePrefsSuccess && sportPrefs && gameModePrefs) {
      initialize(sportPrefs as any[], gameModePrefs as any[])
    }
  }, [isSportPrefsSuccess, isGameModePrefsSuccess, sportPrefs, gameModePrefs, initialize])

  // Initial preferences formatted as they are in the store
  const initialPreferences = useMemo(() =>
    formatPreferencesForComparison(sportPrefs as any[], gameModePrefs as any[]),
    [sportPrefs, gameModePrefs])

  // Current store preferences formatted for comparison
  const isDirty = useMemo(() =>
    checkIsPreferencesDirty(initialPreferences, sportPreferences),
    [initialPreferences, sportPreferences])

  const handleSportPress = (sport: SportProps) => {
    const existing = sportPreferences.find(sp => sp.sport === sport.name)
    if (existing && existing.level === 3) {
      removeSportPreference(sport.name)
      return
    }
    const nextLevel = !existing ? 1 : existing.level + 1
    setSportPreference(sport.name, nextLevel as SportPreferenceResponseDataLevel)
  }

  const handleApply = () => {
    // TODO: Implement mutations (Create/Delete sports, Patch game modes)
  }

  const isLoading = isSportPrefsLoading || isGameModePrefsLoading



  return (
    <ScreenLayout>
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SettingsPreferencesHeader />



        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-6' style={{ paddingBottom: bottom + (isDirty ? 100 : 20) }}>
          {isLoading && <Loading />}
          {!isLoading && <>
            <SettingsPreferencesSportsSection
              sportPreferences={sportPreferences}
              onSportPress={handleSportPress}
            />

            <Separator deviderClassName="bg-ring" />

            <SettingsPreferencesGameModesSection
              sportPreferences={sportPreferences}
              onToggleGameMode={toggleGameMode}
            />
          </>}
        </Wrapper>

      </ScrollView>

      <SettingsFooterSubmit
        isDirty={isDirty}
        onPress={handleApply}
      />
    </ScreenLayout>
  )
}

