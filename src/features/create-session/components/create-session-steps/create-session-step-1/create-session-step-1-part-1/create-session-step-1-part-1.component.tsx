import { Box, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { tennisBall, footballBall, basketballBall } from 'assets';

import { SessionsFindAllSportsItem } from '@/api/generated/model';

import CreateSessionTitle from '../../../create-session-title-component';
import CreateSessionStep1Part1Item from './create-session-step-1-part-1-item.component';

export type SportProps = {
  id: number;
  image: string;
  name: SessionsFindAllSportsItem;
};

const sports: SportProps[] = [
  {
    id: 1,
    image: tennisBall,
    name: 'TENNIS',
  },
  {
    id: 2,
    image: footballBall,
    name: 'FOOTBALL',
  },
  {
    id: 3,
    image: basketballBall,
    name: 'BASKETBALL',
  },
  {
    id: 4,
    image: tennisBall,
    name: 'PADDEL',
  },
];

export default function CreateSessionStep1Part1() {
  const { t } = useTranslate();

  return (
    <Box>
      <CreateSessionTitle title={t('create-session-steps.step_1.title')} />
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
