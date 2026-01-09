import { Box, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { SessionsFindAllSportsItem } from '@/api/generated/model';
import { SportProps } from '@/features/create-session/types/create-session-step-1.types';

import CreateSessionStep1Part1Item from './create-session-step-1-part-1-item.component';

const sports: SportProps[] = [
  {
    id: 1,
    name: SessionsFindAllSportsItem.TENNIS,
  },
  {
    id: 2,
    name: SessionsFindAllSportsItem.FOOTBALL,
  },
  {
    id: 3,
    name: SessionsFindAllSportsItem.BASKETBALL,
  },
  {
    id: 4,
    name: SessionsFindAllSportsItem.PADDEL,
  },
];

export default function CreateSessionStep1Part1() {
  const { t } = useTranslate();

  return (
    <Box>
      <String size="sm" className="mb-3 text-black/60">
        {t('create-session-steps.step_1.select_sport')}
      </String>
      <Box className="flex flex-row flex-wrap gap-3">
        {sports.map(sport => (
          <CreateSessionStep1Part1Item key={sport.id} sport={sport} />
        ))}
      </Box>
    </Box>
  );
}
