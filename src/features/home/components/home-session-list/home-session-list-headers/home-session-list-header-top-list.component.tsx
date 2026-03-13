import { memo } from 'react';
import { Button } from '@ludo/ui';
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

function HomeSessionListHeaderTopList(props: HomeSessionListHeaderTopListProps) {
  const { hasNewSession, IncommingSessionMe } = props
  const { t } = useTranslate();
  const { isLoading: isLoadingUserMe, userMe } = useUserMe();

  return (
    <HeaderScreen
      isTitleLoading={isLoadingUserMe}
      title={t('home.header.title', { username: truncateString({ maxLength: 8, str: userMe?.firstname ?? '' }) })}
      subTitle={t(hasNewSession ? 'home.header.sub_title_incoming_session' : 'home.header.sub_title')}
      hasNewSession={hasNewSession}
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

