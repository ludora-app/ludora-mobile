import { Box } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { SESSION_LEVELS } from '@/constants/session.constants';

import CreateSessionSubtitle from '../../../create-session-subtitle-component copy';
import CreateSessionStep1Part2LevelItem from './create-session-step-1-part-2-level-item.component';

export default function CreateSessionStep1Part2() {
  const { t } = useTranslate();

  return (
    <Box className="">
      <CreateSessionSubtitle title={t('create-session-steps.step-1.select_level_title')} />

      <Box className="flex-row items-center justify-around">
        {SESSION_LEVELS.map(difficulty => (
          <CreateSessionStep1Part2LevelItem key={difficulty.code} difficulty={difficulty} />
        ))}
      </Box>
    </Box>
  );
}
