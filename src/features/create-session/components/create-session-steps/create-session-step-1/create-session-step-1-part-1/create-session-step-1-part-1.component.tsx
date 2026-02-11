import { Box, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { SPORTS } from '@/constants/sports.constants';

import CreateSessionStep1Part1Item from './create-session-step-1-part-1-item.component';

export default function CreateSessionStep1Part1() {
  const { t } = useTranslate();

  return (
    <Box>
      <String size="sm" className="mb-3 text-black/60">
        {t('create-session-steps.step_1.select_sport')}
      </String>
      <Box className="flex flex-row flex-wrap gap-3">
        {SPORTS.map(sport => (
          <CreateSessionStep1Part1Item key={sport.id} sport={sport} />
        ))}
      </Box>
    </Box>
  );
}
