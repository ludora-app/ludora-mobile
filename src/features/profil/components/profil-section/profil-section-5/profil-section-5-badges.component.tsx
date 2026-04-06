import { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { useTranslate } from '@tolgee/react';

import { ComingSoon } from '@/components/ui/coming-soon';

type Props = {
  listHeaderComponent?: ReactNode;
};

export default function ProfilSection5Badges({ listHeaderComponent }: Props) {
  const { t } = useTranslate();
  return (
    <ScrollView contentContainerClassName="grow ">
      {listHeaderComponent}
      <ComingSoon />
    </ScrollView>
  );
}
