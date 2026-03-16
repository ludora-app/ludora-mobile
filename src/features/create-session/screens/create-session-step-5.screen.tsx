import { useTranslate } from '@tolgee/react';
import { Box, Icon, String, WrapperScrollView } from '@ludo/ui';

import { useGetSessionById } from '@/queries/get-session-by-id.query';
import { SessionCard, SessionCardSkeleton } from '@/components/ui/session-card';

import { useCreateSessionStore } from '../store/create-session.store';
import CreateSessionSubtitle from '../components/create-session-subtitle-component';

export default function CreateSessionStep5Screen() {
  const createdSessionUid = useCreateSessionStore(state => state.createdSessionUid);
  const { t } = useTranslate();
  const { data: createdSessionData, isLoading: isLoadingSession } = useGetSessionById(createdSessionUid);

  return (
    <WrapperScrollView contentContainerClassName="pb-10">
      <Box className="gap-4">
        <Box className="items-center">
          <Icon name="ludo-pompom" className="size-32" />
          <String colorVariant="primary" className="text-center" font="primaryBold" variant="body-3">
            {t('create-session.step-5.subtitle')}
          </String>
        </Box>
        <String className="text-center">{t('create-session.step-5.description')}</String>
      </Box>
      <Box className="mt-10">
        <CreateSessionSubtitle title={t('create-session.step-5.session_preview_title')} />
        {isLoadingSession ? <SessionCardSkeleton /> : <SessionCard item={createdSessionData} />}
      </Box>
    </WrapperScrollView>
  );
}
