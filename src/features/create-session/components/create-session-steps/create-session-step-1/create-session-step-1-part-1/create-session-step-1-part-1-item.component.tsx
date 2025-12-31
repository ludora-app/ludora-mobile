import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { cn } from '@/components/chill-ui-library';

import { SportProps } from './create-session-step-1-part-1.component';
import { useCreateSessionStore } from '../../../../store/create-session.store';

type CreateSessionStep1Part1ItemProps = {
  sport: SportProps;
};

export default function CreateSessionStep1Part1Item(props: CreateSessionStep1Part1ItemProps) {
  const { sport } = props;
  const isSelectedSport = useCreateSessionStore(state => state.session?.sport === sport.name);
  const setSession = useCreateSessionStore(state => state.setSession);

  const { t } = useTranslate();

  return (
    <Button
      size="xl"
      title={t(`common.session_sport_${sport.name}`)}
      image={{ className: 'size-6', contentFit: 'contain', source: sport.image }}
      contentProps={{
        className: 'gap-2',
        position: 'left',
      }}
      variant="outlined"
      colorVariant={isSelectedSport ? 'primary' : 'dark'}
      className={cn('w-[48%] rounded-xl bg-white')}
      onPress={() => setSession({ sport: sport.name })}
    />
  );
}
