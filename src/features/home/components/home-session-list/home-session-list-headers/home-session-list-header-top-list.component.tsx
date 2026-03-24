import { cn } from '@chillui/ui';
import { Button } from '@ludo/ui';
import { memo, useMemo } from 'react';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { useUserMe } from '@/queries/user-me.query';
import { truncateString } from '@/utils/string.utils';
import { SessionCard } from '@/components/ui/session-card';
import { SessionCollectionItemDto } from '@/api/generated/model';
import HeaderScreen from '@/components/ui/header/components/header-screen.component';


type HomeSessionListHeaderTopListProps = {
  IncommingSessionMe: SessionCollectionItemDto;
  hasNewSession: boolean;
}

const MAX_USERNAME_LENGTH = 10;

function HomeSessionListHeaderTopList(props: HomeSessionListHeaderTopListProps) {
  const { hasNewSession, IncommingSessionMe } = props
  const { t } = useTranslate();
  const { isLoading: isLoadingUserMe, userMe } = useUserMe();
  const { firstname } = userMe || {};

  const userNameLength = firstname?.length ?? 0;

  const iconClassName = useMemo(() => {
    if (hasNewSession) {
      if (userNameLength > 8) {
        return 'size-24';
      }
      if (userNameLength > 6) {
        return 'size-26';
      }
      return 'size-28';
    }
    if (userNameLength > 8) {
      return 'size-28';
    }
    if (userNameLength > 6) {
      return 'size-26';
    }
    return 'size-34';
  }, [userNameLength, hasNewSession]);

  const leftContentClassName = useMemo(() => {
    if (userNameLength > 6) {
      return 'pb-6';
    }
    return 'pb-3';
  }, [userNameLength]);

  return (
    <HeaderScreen
      isTitleLoading={isLoadingUserMe}
      title={t('home.header.title', { username: truncateString({ maxLength: MAX_USERNAME_LENGTH, str: firstname ?? '' }) })}
      iconProps={{ className: iconClassName }}
      subTitle={t(hasNewSession ? 'home.header.sub_title_incoming_session' : 'home.header.sub_title')}
      hasNewSession={hasNewSession}
      leftContentClassName={!hasNewSession && leftContentClassName}
      className={cn("items-end h-44", { 'h-52': hasNewSession })}
    >
      {hasNewSession && <SessionCard item={IncommingSessionMe} isNextSession />}
      {!hasNewSession && (
        <Button
          title={t('home.header.button_create_match')}
          colorVariant="inverted"
          as="scale-pressable"
          redirect={ROUTES.CREATE_SESSION.STEP_1}
          size="md"
          iconProps={{
            color: COLORS.primary,
            name: 'flash-solid',
            size: 'lg',
          }}
          fit
          contentProps={{
            className: 'gap-1',
          }}
        />
      )}
    </HeaderScreen>
  );
}

export default memo(HomeSessionListHeaderTopList)

