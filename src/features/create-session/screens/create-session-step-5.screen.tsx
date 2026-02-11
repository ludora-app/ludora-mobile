import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams } from 'expo-router';
import { Box, Icon, String, WrapperScrollView } from '@ludo/ui';

import { SessionCard } from '@/components/ui/session-card';
import { useGetSessionById } from '@/queries/get-session-by-id.query';

import CreateSessionSubtitle from '../components/create-session-subtitle-component';
import { CreateSessionStep5ScreenParams } from '../types/create-session-step-5.types';

export default function CreateSessionStep5Screen() {
  const { sessionUid } = useLocalSearchParams<CreateSessionStep5ScreenParams>();
  const { t } = useTranslate();
  const { data: createdSessionData } = useGetSessionById(sessionUid);

  return (
    <WrapperScrollView contentContainerClassName="pb-10">
      <Box className="gap-4">
        <Box className="items-center">
          <Icon name="ludora-pompom" className="size-32" />
          <String colorVariant="primary" className="text-center" font="primaryBold" variant="body-3">
            {t('create-session.step-5.subtitle')}
          </String>
        </Box>
        <String className="text-center">{t('create-session.step-5.description')}</String>
        <String useFastText={false}>
          {t('create-session.step-5.quote_part_1')}
          <String colorVariant="primary" useFastText={false} font="primaryBold">
            {t('create-session.step-5.quote_part_2')}
          </String>
        </String>
      </Box>
      <Box className="mt-10">
        <CreateSessionSubtitle title={t('create-session.step-5.session_preview_title')} />
        <SessionCard item={createdSessionData} />
      </Box>
    </WrapperScrollView>
  );
}
