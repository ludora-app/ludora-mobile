import { memo } from 'react';
import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { cn } from '@/components/chill-ui-library';
import { getSportImage } from '@/utils/sports.utils';
import { SportProps } from '@/constants/sports.constants';

import { useFiltersStore, selectFilters } from '../../store/filters.store';

type FilterSportsItemProps = {
  sport: SportProps;
};

function FilterSportsItem(props: FilterSportsItemProps) {
  const { sport } = props;
  const { t } = useTranslate();
  const isSelectedSport = useFiltersStore(state => selectFilters(state)?.sports?.includes(sport.name));

  const setFilters = useFiltersStore(state => state.setFilters);

  const sportImage = getSportImage(sport.name);

  const handlePress = (s: SportProps) => {
    if (isSelectedSport) {
      setFilters(prev => ({ sports: prev.sports?.filter(selectedSport => selectedSport !== s.name) }));
      return;
    }
    setFilters(prev => ({ sports: [...(prev.sports ?? []), s.name] }));
  };

  return (
    <Button
      size="md"
      title={t(`common.session_sport_${sport.name}`)}
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
