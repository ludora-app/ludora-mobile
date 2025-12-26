import { Box } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { tennisBall, footballBall, basketballBall } from 'assets';

import { SessionsFindAllSportsItem } from '@/api/generated/model';

import { createSessionStore } from '../../../store/create-session.store';
import CreateSessionStep1Part1 from './create-session-step-1-part-1.component';
import CreateSessionStep1Part3 from './create-session-step-1-part-3.component';
import CreateSessionStep1Part2 from './create-session-step-1-part-2/create-session-step-1-part-2.component';

type SPORTSPROPS = {
  id: number;
  image: string;
  name: SessionsFindAllSportsItem;
};

const sports: SPORTSPROPS[] = [
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

export default function CreateSessionStep1() {
  const selectedSport = createSessionStore(state => state.session?.sport);
  const setSession = createSessionStore(state => state.setSession);

  const { t } = useTranslate();

  return (
    <Box>
      <CreateSessionStep1Part1 />
      <CreateSessionStep1Part2 />
      <CreateSessionStep1Part3 />
    </Box>
  );
}
