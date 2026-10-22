import { memo } from 'react';
import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { SportItem } from '@/types/sports.types';
import { cn } from '@/components/chill-ui-library';
import { getSportImage } from '@/utils/sports.utils';

import { useFiltersStore, selectFilters } from '../../store/filters.store';

type FilterSportsItemProps = {
  sport: SportItem;
};

function FilterSportsItem(props: FilterSportsItemProps) {
  const { sport } = props;
  const { t } = useTranslate();
  const isSelectedSport = useFiltersStore(state => selectFilters(state)?.sports?.includes(sport.code));

  const setFilters = useFiltersStore(state => state.setFilters);

  const sportImage = getSportImage(sport.code);

  const handlePress = (s: SportItem) => {
    if (isSelectedSport) {
      setFilters(prev => ({ sports: prev.sports?.filter(selectedSport => selectedSport !== s.code) }));
      return;
    }
    setFilters(prev => ({ sports: [...(prev.sports ?? []), s.code] }));
  };

  return (
    <Button
      size="md"
      title={t(`common.session_sport_${sport.code}`)}
      image={{ className: 'size-6', contentFit: 'contain', source: sportImage }}
      contentProps={{
        className: 'gap-2',
        position: 'left',
      }}
      variant="outlined"
      colorVariant={isSelectedSport ? 'primary' : 'dark'}
      className={cn('w-[48%] rounded-md bg-white', { 'border-ring': !isSelectedSport })}
      onPress={() => handlePress(sport)}
    />
  );
}

export default memo(FilterSportsItem);
