
import { StyleSheet } from 'react-native'
import { SegmentedControl, SegmentedControlIndicator, SegmentedControlPanel, SegmentedControlPanelSliderContent, SegmentedControlTrigger, SegmentedControlTriggerContent } from '@chillui/ui'

import ProfilSection5Badges from './profil-section-5-badges.component'
import ProfilSection5MatchesList from './profil-section-5-matches-list.component'

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
  }
})

export default function ProfilSection5() {
  return (
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
          Matchs
        </SegmentedControlTrigger>
        <SegmentedControlTrigger
          value='option2'
          stringProps={{
            activeColor: "black",
            className: "text-muted",
            font: "primaryBold"
          }}
        >
          Badges
        </SegmentedControlTrigger>
      </SegmentedControlTriggerContent>
      <SegmentedControlIndicator className='bg-white' style={styles.shadow} />
      <SegmentedControlPanelSliderContent >
        <SegmentedControlPanel value='option1'>
          <ProfilSection5MatchesList />
        </SegmentedControlPanel>
        <SegmentedControlPanel value='option2'>
          <ProfilSection5Badges />
        </SegmentedControlPanel>
      </SegmentedControlPanelSliderContent>
    </SegmentedControl>
  )
}