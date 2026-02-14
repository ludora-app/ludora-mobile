import { ScreenLayout, Wrapper } from '@ludo/ui'
import { StyleSheet, ScrollView } from 'react-native'
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlPanel,
  SegmentedControlPanelSliderContent,
  SegmentedControlTrigger,
  SegmentedControlTriggerContent,
} from '@chillui/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'

import NotificationsList from '../components/notifications-list.component'
import SettingsHeader from '../../settings/components/settings-header.component'
import NotificationsSessionsList from '../components/notifications-sessions-list.component'


const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
  },
})

export default function NotificationsScreen() {
  const { bottom } = useSafeArea()

  return (
    <ScreenLayout>
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SettingsHeader titleKey="notifications.header_title" />
        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-5' style={{ paddingBottom: bottom }}>
          <SegmentedControl>
            <SegmentedControlTriggerContent className='h-12'>
              <SegmentedControlTrigger
                value='option1'
                stringProps={{
                  activeColor: "black",
                  className: "text-muted",
                  font: "primaryBold"
                }}
              >
                Tous
              </SegmentedControlTrigger>
              <SegmentedControlTrigger
                value='option2'
                stringProps={{
                  activeColor: "black",
                  className: "text-muted",
                  font: "primaryBold"
                }}
              >
                Sessions
              </SegmentedControlTrigger>
            </SegmentedControlTriggerContent>
            <SegmentedControlIndicator className='bg-white' style={styles.shadow} />
            <SegmentedControlPanelSliderContent>
              <SegmentedControlPanel value='option1'>
                <NotificationsList />
              </SegmentedControlPanel>
              <SegmentedControlPanel value='option2'>
                <NotificationsSessionsList />
              </SegmentedControlPanel>
            </SegmentedControlPanelSliderContent>
          </SegmentedControl>
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}
