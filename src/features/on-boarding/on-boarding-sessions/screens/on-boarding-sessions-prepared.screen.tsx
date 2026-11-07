import { useEffect } from 'react';
import { useTranslate } from '@tolgee/react';
import { String, WrapperScrollView } from '@ludo/ui';

import { HeaderMascot } from '@/components/ui/header';
import { ErrorResult } from '@/components/ui/error-result';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useResetStoreOnUnmount } from '@/utils/navigation.utils';
import { Loading } from '@/components/ui/loading/loading.component';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useGetPreparedSession } from '../queries/get-prepared-session.query';
import { useOnBoardingSessionsStore } from '../../stores/on-boarding-sessions.store';
import { OnBoardingSessionsPreparedCard } from '../components/on-boarding-sessions-prepared/on-boarding-sessions-prepared-card.component';
import { OnBoardingSessionsPreparedFooter } from '../components/on-boarding-sessions-prepared/on-boarding-sessions-prepared-footer.component';
import { OnBoardingSessionsPreparedPlayersHint } from '../components/on-boarding-sessions-prepared/on-boarding-sessions-prepared-players-hint.component';

export const OnBoardingSessionsPreparedScreen = () => {
  const { t } = useTranslate();
  const { trackEvent } = useAnalytics();
  const reset = useOnBoardingSessionsStore(state => state.reset);
  const { field, isError, isLoading, isLoadingField, playersPerTeam, preparedSession, refetch } =
    useGetPreparedSession();

  useResetStoreOnUnmount(reset);

  useEffect(() => {
    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.PREPARED_SESSION_VIEWED });
  }, [trackEvent]);

  const renderContent = () => {
    if (isError) return <ErrorResult onRetry={refetch} />;
    if (isLoading || !preparedSession) return <Loading />;

    return (
      <WrapperScrollView contentContainerClassName="gap-3 pt-5.5 pb-6">
        {!!field && <OnBoardingSessionsPreparedPlayersHint fieldUid={field.uid} preparedSession={preparedSession} />}
        <OnBoardingSessionsPreparedCard
          field={field}
          isLoadingField={isLoadingField}
          playersPerTeam={playersPerTeam}
          preparedSession={preparedSession}
        />
        {preparedSession.isWithoutAvailabilities && (
          <String variant="body-sm" font="primarySemiBold" colorVariant="muted" className="text-center">
            {t('on-boarding.sessions.prepared.no_availabilities_note')}
          </String>
        )}
      </WrapperScrollView>
    );
  };

  return (
    <>
      <HeaderMascot
        titleProps={{ title: t('on-boarding.sessions.prepared.title'), variant: 'title-2' }}
        description={t(
          field || isLoadingField
            ? 'on-boarding.sessions.prepared.description'
            : 'on-boarding.sessions.prepared.description_no_place',
        )}
        mascotName="ludo-idea"
        hasMascotHalo
      />
      {renderContent()}
      <OnBoardingSessionsPreparedFooter
        field={field}
        isLoading={isLoading || isLoadingField}
        preparedSession={preparedSession}
      />
    </>
  );
};
