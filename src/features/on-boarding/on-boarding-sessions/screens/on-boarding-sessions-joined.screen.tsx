import { useTranslate } from '@tolgee/react';
import { Button, WrapperScrollView } from '@ludo/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ROUTES from '@/constants/routes.constants';
import { HeaderHero } from '@/components/ui/header';
import { useDisableBack } from '@/hooks/navigation.hooks';
import { FooterWrapper } from '@/components/ui/footer-wrapper';
import { Loading } from '@/components/ui/loading/loading.component';
import { useGetSessionById } from '@/queries/get-session-by-id.query';

import { OnBoardingSessionsJoinedLocalParams } from '../types/on-boarding-sessions.types';
import { OnBoardingSessionsJoinedRecap } from '../components/on-boarding-sessions-joined/on-boarding-sessions-joined-recap.component';
import { OnBoardingSessionsJoinedInvite } from '../components/on-boarding-sessions-joined/on-boarding-sessions-joined-invite.component';

export const OnBoardingSessionsJoinedScreen = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { sessionUid } = useLocalSearchParams<OnBoardingSessionsJoinedLocalParams>();
  const { data: session, isLoading } = useGetSessionById(sessionUid);

  useDisableBack();

  const handleGoHome = () => router.dismissTo(ROUTES.HOME.INDEX);

  return (
    <>
      <HeaderHero
        mascotName="ludo-pompom"
        mascotSize="md"
        title={t('on-boarding.sessions.joined.title')}
        description={t('on-boarding.sessions.joined.description')}
        hasGoBackButton={false}
        className="z-10 pb-5.5"
        isMascotAnimated
      />
      {isLoading ? (
        <Loading />
      ) : (
        <WrapperScrollView contentContainerClassName="gap-3.5 pt-5.5 pb-6">
          {session && <OnBoardingSessionsJoinedRecap session={session} />}
          <OnBoardingSessionsJoinedInvite sessionUid={sessionUid} />
        </WrapperScrollView>
      )}
      <FooterWrapper hasBottomSafeArea>
        <Button title={t('on-boarding.sessions.go_home')} colorVariant="secondary" size="xl" onPress={handleGoHome} />
      </FooterWrapper>
    </>
  );
};
