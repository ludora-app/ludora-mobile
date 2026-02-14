import { useState } from 'react'
import { ScrollView } from 'react-native'
import { ScreenLayout, Wrapper } from '@ludo/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'
import { SegmentedControl } from '@/components/ui/segmented-control'

import SettingsHeader from '../components/settings-header.component'
import SettingsFavoritesFieldsList from '../components/settings-favorites/settings-favorites-fields-list.component'
import SettingsFavoritesSessionsList from '../components/settings-favorites/settings-favorites-sessions-list.component'

const SEGMENTED_CONTROL_FAVORITES = [
  {
    labelKey: 'common.sessions',
    value: 'SESSIONS',
  },
  {
    labelKey: 'common.fields',
    value: 'FIELDS',
  },
] as const

export default function SettingsFavoritesScreen() {
  const [activeTab, setActiveTab] = useState<'SESSIONS' | 'FIELDS'>('SESSIONS')
  const { bottom } = useSafeArea()

  return (
    <ScreenLayout>
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled
      >
        <SettingsHeader titleKey="settings.favorites.header_title" />
        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-5' style={{ paddingBottom: bottom }}>
          <SegmentedControl
            items={SEGMENTED_CONTROL_FAVORITES}
            onValueChange={(value) => setActiveTab(value)}
          >
            {activeTab === 'SESSIONS' ? (
              <SettingsFavoritesSessionsList />
            ) : (
              <SettingsFavoritesFieldsList />
            )}
          </SegmentedControl>
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}
