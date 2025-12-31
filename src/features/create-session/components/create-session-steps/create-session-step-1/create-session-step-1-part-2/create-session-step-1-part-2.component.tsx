import { useTranslate } from '@tolgee/react';
import { Box, ReanimatedBox } from '@ludo/ui';
import { FadeIn } from 'react-native-reanimated';

import { SESSION_LEVELS } from '@/constants/session.constants';

import CreateSessionSubtitle from '../../../create-session-subtitle-component';
import CreateSessionStep1Part2Item from './create-session-step-1-part-2-item.component';

export default function CreateSessionStep1Part2() {
  const { t } = useTranslate();

  return (
    <ReanimatedBox entering={FadeIn}>
      <CreateSessionSubtitle title={t('create-session-steps.step-1.select_level_title')} />
      <Box className="flex-row items-center justify-around">
        {SESSION_LEVELS.map(difficulty => (
          <CreateSessionStep1Part2Item key={difficulty.code} difficulty={difficulty} />
        ))}
      </Box>
    </ReanimatedBox>
  );
}
