import { useTranslate } from '@tolgee/react';

import { useUserMe } from '@/queries/user-me.query';
import { truncateString } from '@/utils/string.utils';
import HeaderScreen from '@/components/ui/header/components/header-screen.component';

export default function PlayersListHeaderTopList() {
  const { t } = useTranslate()
  const { userMe } = useUserMe();
  const firstname = truncateString({ maxLength: 8, str: userMe?.firstname ?? '' });

  return (
    <HeaderScreen
      title={`Prêt ${firstname} ?`}
      subTitle="Trouve ton prochain coéquipier"
      iconProps={{ className: 'size-36', name: "ludo-idea" }}
      className='h-40 items-center'
    />
  );
}
