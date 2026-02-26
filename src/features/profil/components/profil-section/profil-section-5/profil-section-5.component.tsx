import { ReactElement, ReactNode } from 'react';

import ProfilSection5Tabs from './profil-section-5-tabs.component';
import ProfilSection5ListSegmentedControl from './profil-section-5-list-segmented-control.component';


type ProfilSection5Props = {
  header?: ReactNode;
  isRefetching?: boolean;
  onRefresh?: () => Promise<void>;
}

type ListHeader = ReactElement

export default function ProfilSection5({ header, isRefetching, onRefresh }: ProfilSection5Props) {
  const listHeaderComponent: ListHeader = (
    <>
      {header}
      <ProfilSection5ListSegmentedControl />
    </>
  )

  return (
    <ProfilSection5Tabs
      listHeaderComponent={listHeaderComponent}
      isRefetching={isRefetching}
      onRefresh={onRefresh}
    />
  )
}
