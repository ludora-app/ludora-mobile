import { ProfilTab, useProfilStore } from '@/features/profil/stores/profil.store'

import ProfilSection5Badges from './profil-section-5-badges.component'
import ProfilSection5MatchesList from './profil-section-5-matches-list.component'

export default function ProfilSection5Tabs() {
  const selectedTab = useProfilStore(state => state.selectedTab)
  switch (selectedTab) {
    case ProfilTab.Matches:
      return <ProfilSection5MatchesList />
    case ProfilTab.Badges:
      return <ProfilSection5Badges />
    default:
      return null
  }
}