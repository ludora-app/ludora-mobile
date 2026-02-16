import { useEffect } from 'react'
import { ScreenLayout, Separator, Wrapper, ScrollView } from '@ludo/ui'

import { useUserMe } from '@/queries/user-me.query'
import { useSafeArea } from '@/hooks/safe-area.hook'
import Loading from '@/components/ui/loading/loading.component'

import SettingsHeader from '../components/settings-header.component'
import { useSettingsPreferencesStore } from '../stores/settings-preferences.store'
import SettingsPreferencesSubmit from '../components/settings-preferences/settings-preferences-submit.component'
import SettingsPreferencesSportsSection from '../components/settings-preferences/settings-preferences-sport/settings-preferences-sports-section.component'
import SettingsPreferencesGameModesSection from '../components/settings-preferences/settings-preferences-game-modes/settings-preferences-game-modes-section.component'

export default function SettingsPreferencesScreen() {

  const { bottom } = useSafeArea()
  const { isLoading: isUserLoading, isRefetching, isSuccess: isUserSuccess, refetch, userMe } = useUserMe()

  const initialize = useSettingsPreferencesStore(state => state.initialize)

  useEffect(() => {
    if (isUserSuccess) {
      initialize(userMe?.sportPreferences ?? [])
    }
  }, [isUserSuccess, userMe?.sportPreferences, initialize])

  const isLoading = isUserLoading



  return (
    <ScreenLayout>
      <ScrollView
        hasRefreshControl
        isRefetching={isRefetching}
        refetch={refetch}
      >
        <SettingsHeader titleKey="settings.preferences.header_title" hasTopSafeArea hasHorizontalPadding />

        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-6' style={{ paddingBottom: bottom + 100 }}>
          {isLoading && <Loading />}
          {!isLoading && <>
            <SettingsPreferencesSportsSection />

            <Separator deviderClassName="bg-ring" />

            <SettingsPreferencesGameModesSection
            />
          </>
          }
        </Wrapper>

      </ScrollView>

      <SettingsPreferencesSubmit />
    </ScreenLayout>
  )
}
