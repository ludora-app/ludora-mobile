import { Box, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { useGetSports } from '@/queries/get-sports.query';

import CreateSessionStep1Part1Item from './create-session-step-1-part-1-item.component';

export default function CreateSessionStep1Part1() {
  const { t } = useTranslate();
  const { sports } = useGetSports();

  return (
    <Box>
      <String size="sm" className="mb-3 text-black/60">
        {t('create-session-steps.step_1.select_sport')}
      </String>
      <Box className="flex flex-row flex-wrap gap-3">
        {sports.map(sport => (
          <CreateSessionStep1Part1Item key={sport.code} sport={sport} />
        ))}
      </Box>
    </Box>
  );
}
