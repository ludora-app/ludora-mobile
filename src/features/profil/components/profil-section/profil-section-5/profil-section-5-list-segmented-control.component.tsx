import { Wrapper } from '@ludo/ui'
import { withUniwind } from 'uniwind';
import { useTranslate } from '@tolgee/react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import { ProfilTab, useProfilStore } from '@/features/profil/stores/profil.store'

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

const StyledSegmentedControl = withUniwind(SegmentedControl)

export default function ProfilSection5ListSegmentedControl() {
  const { t } = useTranslate()
  const selectedTab = useProfilStore(state => state.selectedTab)

  const setSelectedTab = useProfilStore(state => state.setSelectedTab)

  return (
    <Wrapper className='py-4 bg-background'>
      <StyledSegmentedControl
        values={OPTIONS.map(option => t(option.labelKey))}
        selectedIndex={OPTIONS.findIndex(option => option.value === selectedTab)}
        onValueChange={(selectedValue) => setSelectedTab(OPTIONS.find(v => t(v.labelKey) === selectedValue)?.value)}
        className="border border-ring/20 rounded-lg h-12"
        sliderClassName='bg-white'
        fontClassName="font-primaryBold text-muted"
      />
    </Wrapper>
  )
}

