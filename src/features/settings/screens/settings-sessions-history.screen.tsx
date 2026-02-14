import { ScrollView } from 'react-native'
import { ScreenLayout, Wrapper } from '@ludo/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'
import { SegmentedControl } from '@/components/ui/segmented-control'

import SettingsHeader from '../components/settings-header.component'
import { useSettingsHistoryFilterStore } from '../stores/settings-history-filter.store'
import SessionsHistoryList from '../components/settings-sessions-history/sessions-history-list.component'
import SettingsSessionsHistoryTypeList from '../components/settings-sessions-history/settings-sessions-history-types/settings-sessions-history-type-list.component'

const SEGMENTED_CONTROL_SCOPES = [
  {
    labelKey: 'common.all',
    option: 'option1',
    value: 'ALL',
  },
  {
    labelKey: 'common.past',
    option: 'option2',
    value: 'PAST',
  },
  {
    labelKey: 'common.upcoming',
    option: 'option3',
    value: 'UPCOMING',
  },
] as const

export default function SettingsSessionsHistoryScreen() {
  const setFilter = useSettingsHistoryFilterStore(state => state.setFilter)
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
        <SettingsHeader titleKey="settings.history.header_title" />
        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-5' style={{ paddingBottom: bottom }}>
          <SettingsSessionsHistoryTypeList />
          <SegmentedControl
            items={SEGMENTED_CONTROL_SCOPES}
            onValueChange={(scope) => setFilter({ scope })}
          >
            <SessionsHistoryList />
          </SegmentedControl>
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}
