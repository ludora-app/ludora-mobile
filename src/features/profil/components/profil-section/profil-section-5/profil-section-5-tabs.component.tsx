import { ReactElement } from 'react';

import { ProfilTab, useProfilStore } from '@/features/profil/stores/profil.store';

import ProfilSection5Badges from './profil-section-5-badges.component';
import ProfilSection5MatchesList from './profil-section-5-list/profil-section-5-list.component';

type Props = {
  listHeaderComponent?: ReactElement;
  isRefetching?: boolean;
  onRefresh?: () => Promise<void>;
}

export default function ProfilSection5Tabs({ isRefetching, listHeaderComponent, onRefresh }: Props) {
  const selectedTab = useProfilStore(state => state.selectedTab)
  switch (selectedTab) {
    case ProfilTab.Matches:
      return (
        <ProfilSection5MatchesList
          listHeaderComponent={listHeaderComponent}
          isRefetching={isRefetching}
          onRefresh={onRefresh}
        />
      )
    case ProfilTab.Badges:
      return <ProfilSection5Badges listHeaderComponent={listHeaderComponent} />
    default:
      return null
  }
}
