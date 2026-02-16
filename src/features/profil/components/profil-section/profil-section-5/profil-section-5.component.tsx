

import { SegmentedControl } from '@/components/ui/segmented-control'
import { ProfilTab, useProfilStore } from '@/features/profil/stores/profil.store'

import ProfilSection5Tabs from './profil-section-5-tabs.component'




const OPTIONS = [
  {
    labelKey: 'common.matches',
    value: ProfilTab.Matches,
  },
  {
    labelKey: 'common.badges',
    value: ProfilTab.Badges,
  },
]

export default function ProfilSection5() {
  const setSelectedTab = useProfilStore(state => state.setSelectedTab)
  return (
    <SegmentedControl
      items={OPTIONS}
      onValueChange={(value) => setSelectedTab(value)}
    >
      <ProfilSection5Tabs />
    </SegmentedControl>
  )
}