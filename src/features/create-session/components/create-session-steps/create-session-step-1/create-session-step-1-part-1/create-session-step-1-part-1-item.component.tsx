import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { SportItem } from '@/types/sports.types';
import { cn } from '@/components/chill-ui-library';
import { getSportImage } from '@/utils/sports.utils';
import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';

import { useCreateSessionStore } from '../../../../store/create-session.store';

type CreateSessionStep1Part1ItemProps = {
  sport: SportItem;
};

export default function CreateSessionStep1Part1Item(props: CreateSessionStep1Part1ItemProps) {
  const { sport } = props;
  const { t } = useTranslate();
  const isSelectedSport = useCreateSessionStore(state => state.session?.sport === sport.code);
  const setSession = useCreateSessionStore(state => state.setSession);
  const setSessionFilters = useCreateSessionFiltersFieldsStore(state => state.setFilters);

  const sportImage = getSportImage(sport.code);

  const handlePress = (s: SportItem) => {
    setSession({ gameMode: undefined, sport: s.code });
    setSessionFilters({ sports: [s.code] });
  };

  return (
    <Button
      size="xl"
      title={t(`common.session_sport_${sport.code}`)}
      image={{ className: 'size-6', contentFit: 'contain', source: sportImage }}
      contentProps={{
        className: 'gap-2',
        position: 'left',
      }}
      variant="outlined"
      colorVariant={isSelectedSport ? 'primary' : 'dark'}
      className={cn('w-[48%] rounded-xl bg-white')}
      onPress={() => handlePress(sport)}
    />
  );
}
