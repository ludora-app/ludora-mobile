import { useTranslate } from '@tolgee/react';

import { useUserMe } from '@/queries/user-me.query';
import { truncateString } from '@/utils/string.utils';
import HeaderScreen from '@/components/ui/header/components/header-screen.component';

export default function PlayersListHeaderTopList() {
  const { t } = useTranslate()
  const { userMe } = useUserMe();
  const { firstname } = userMe || {};
  const userFirstname = truncateString({ maxLength: 8, str: firstname });

  return (
    <HeaderScreen
      title={t("players.header_ready_title", { firstname: userFirstname })}
      subTitle={t("players.header_ready_subtitle")}
      iconProps={{ className: 'size-36', name: "ludo-idea-2" }}
      className='h-40 items-center'
    />
  );
}
