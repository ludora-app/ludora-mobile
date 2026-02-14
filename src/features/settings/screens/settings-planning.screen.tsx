import dayjs from 'dayjs'
import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useTranslate } from '@tolgee/react'
import { Box, ScreenLayout, String, Wrapper } from '@ludo/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'

import SettingsHeader from '../components/settings-header.component'
import { useSettingsPlanningStore } from '../stores/settings-planning.store'
import SettingsPlanningSubmit from '../components/settings-planning/settings-planning-submit.component'
import SettingsPlanningSection from '../components/settings-planning/settings-planning-section.component'
import { useGetUserHoursPreferences } from '../queries/user-hours-preferences/get-user-hours-preferences.query'

export default function SettingsPlanningScreen() {
  const { t } = useTranslate()
  const { bottom } = useSafeArea()
  const { data: hourPrefs, isSuccess: isHourPrefsSuccess } = useGetUserHoursPreferences()


  const setPlanning = useSettingsPlanningStore(state => state.setPlanning)

  useEffect(() => {
    if (isHourPrefsSuccess && hourPrefs) {
      setPlanning(hourPrefs)
    }
  }, [isHourPrefsSuccess, hourPrefs, setPlanning])


  return (
    <ScreenLayout>
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SettingsHeader titleKey="settings.planning.header_title" />
        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-6' style={{ paddingBottom: bottom + 100 }}>
          <Box className='gap-4'>
            <String font="primaryBold" variant="body-3">
              {t('settings.planning.select_slots_title')}
            </String>
            <String variant="body-1" className='text-gray-500'>
              {dayjs().format('MMMM YYYY')}
            </String>
            <SettingsPlanningSection />
          </Box>
        </Wrapper>
      </ScrollView>
      <SettingsPlanningSubmit
        initialPlanning={hourPrefs}
      />
    </ScreenLayout >
  )
}
