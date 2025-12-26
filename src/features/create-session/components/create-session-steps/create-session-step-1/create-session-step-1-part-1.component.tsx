import { useTranslate } from '@tolgee/react';
import { Box, Button, String } from '@ludo/ui';
import { tennisBall, footballBall, basketballBall } from 'assets';

import { cn } from '@/components/chill-ui-library';
import { SessionsFindAllSportsItem } from '@/api/generated/model';

import CreateSessionTitle from '../../create-session-title-component';
import { createSessionStore } from '../../../store/create-session.store';

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

export default function CreateSessionStep1Part1() {
  const selectedSport = createSessionStore(state => state.session?.sport);
  const setSession = createSessionStore(state => state.setSession);

  const { t } = useTranslate();

  return (
    <Box className="bg-slate-400">
      <CreateSessionTitle title={t('create-session-steps.step_1.title')} />
      <String size="sm" className="mb-3 text-black/60">
        {t('create-session-steps.step_1.select_sport')}
      </String>
      <Box className="flex flex-row flex-wrap gap-3">
        {sports.map(sport => (
          <Button
            key={sport.id}
            size="xl"
            title={t(`common.session_sport_${sport.name}`)}
            image={{ className: 'size-6', contentFit: 'contain', source: sport.image }}
            contentProps={{
              className: 'gap-2',
              position: 'left',
            }}
            variant="outlined"
            colorVariant={selectedSport === sport.name ? 'primary' : 'dark'}
            className={cn('w-[48%] rounded-xl bg-white')}
            onPress={() => setSession({ sport: sport.name })}
          />
        ))}
      </Box>
    </Box>
  );
}
