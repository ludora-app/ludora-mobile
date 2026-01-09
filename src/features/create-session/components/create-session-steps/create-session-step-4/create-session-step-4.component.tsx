import { useTranslate } from '@tolgee/react';
import { Box, String, WrapperScrollView } from '@ludo/ui';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { SessionCard } from '@/components/ui/session-card';
import { useGetSessionById } from '@/queries/get-session-by-id.query';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

import CreateSessionTitle from '../../create-session-title-component';
import CreateSessionSubtitle from '../../create-session-subtitle-component';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function CreateSessionStep4() {
  const { t } = useTranslate();
  const createdSessionUid = useCreateSessionStore(state => state.session.additionalData.createdSessionUid);
  const { data: createdSessionData } = useGetSessionById(createdSessionUid);

  return (
    <AnimatedBox entering={FadeInRight} className="flex-1">
      <WrapperScrollView className="pb-10">
        <CreateSessionTitle title={t('create-session.step-4.title')} />
        <Box className="gap-4">
          <String colorVariant="primary" className="text-center" font="primaryBold">
            {t('create-session.step-4.subtitle')}
          </String>
          <String className="text-center">{t('create-session.step-4.description')}</String>
          <String useFastText={false}>
            {t('create-session.step-4.quote_part_1')}
            <String colorVariant="primary" useFastText={false} font="primaryBold">
              {t('create-session.step-4.quote_part_2')}
            </String>
          </String>
        </Box>
        <Box className="mt-10">
          <CreateSessionSubtitle title={t('create-session.step-4.session_preview_title')} />
          <SessionCard session={createdSessionData} />
        </Box>
      </WrapperScrollView>
    </AnimatedBox>
  );
}
