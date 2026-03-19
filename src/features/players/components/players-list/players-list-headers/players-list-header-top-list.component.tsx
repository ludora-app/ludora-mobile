import { useMemo } from 'react';
import { useTranslate } from '@tolgee/react';

import { useUserMe } from '@/queries/user-me.query';
import { truncateString } from '@/utils/string.utils';
import HeaderScreen from '@/components/ui/header/components/header-screen.component';

const MAX_USERNAME_LENGTH = 10;

export default function PlayersListHeaderTopList() {
  const { t } = useTranslate()
  const { userMe } = useUserMe();
  const { firstname } = userMe || {};
  const userFirstname = truncateString({ maxLength: MAX_USERNAME_LENGTH, str: firstname });

  const userNameLength = firstname?.length ?? 0;

  const iconClassName = useMemo(() => userNameLength > 7 ? 'size-24' : 'size-30', [userNameLength]);

  return (
    <HeaderScreen
      title={t("players.header_ready_title", { firstname: userFirstname })}
      subTitle={t("players.header_ready_subtitle")}
      iconProps={{ className: iconClassName, name: "ludo-idea-2" }}
      className='h-40'
    />
  );
}
