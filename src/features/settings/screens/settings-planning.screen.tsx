import { ScrollView } from 'react-native'
import { useTranslate } from '@tolgee/react'
import { Box, ScreenLayout, String, Wrapper } from '@ludo/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'

import SettingsFooterSubmit from '../components/settings-footer-submit.component'
import SettingsPlanningHeader from '../components/settings-planning/settings-planning-header.component'
import SettingsPlanningSection from '../components/settings-planning/settings-planning-section.component'

export default function SettingsPlanningScreen() {
  const { t } = useTranslate()
  const { bottom } = useSafeArea()

  const isDirty = true

  const handleApply = () => {
    // TODO: Implement mutations (Create/Delete sports, Patch game modes)
  }

  return (
    <ScreenLayout>
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SettingsPlanningHeader />
        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-6' style={{ paddingBottom: bottom }}>
          <Box className='gap-4'>
            <String variant="body-3" font="primaryBold">
              {t('settings.planning.title')}
            </String>
            <String variant="body-1" className='text-gray-500'>
              {t('settings.planning.desc')}
            </String>
            <SettingsPlanningSection />
          </Box>
        </Wrapper>
      </ScrollView>
      <SettingsFooterSubmit
        isDirty={isDirty}
        onPress={handleApply}
      />
    </ScreenLayout>
  )
}
