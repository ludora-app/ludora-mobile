import { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { cn, ScalePressable } from '@chillui/ui';
import { BoxRow, Image, String } from '@ludo/ui';

import { Sport } from '@/types/sports.types';
import { getSportImage } from '@/utils/sports.utils';
import { useGetSports } from '@/queries/get-sports.query';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useHomeSessionFiltersStore } from '../../../stores/home-sessions-filters.store';

type SportChipProps = {
  isSelected: boolean;
  label: string;
  onPress: () => void;
  sport?: Sport;
};

function SportChip(props: SportChipProps) {
  const { isSelected, label, onPress, sport } = props;

  return (
    <ScalePressable onPress={onPress}>
      <BoxRow
        className={cn('h-11 items-center gap-2 rounded-full border-2 border-darkSoft bg-white px-4', {
          'border-dark bg-dark': isSelected,
        })}
      >
        {!!sport && <Image source={getSportImage(sport)} contentFit="contain" className="size-5" />}
        <String variant="body-sm" font="primaryBold" colorVariant={isSelected ? 'white' : 'dark'}>
          {label}
        </String>
      </BoxRow>
    </ScalePressable>
  );
}

/** "Tous" then one chip per sport: filters "Toutes les sessions" on one sport. */
export const HomeSessionListSportChips = () => {
  const { t } = useTranslate();
  const { trackEvent } = useAnalytics();
  const { sports } = useGetSports();
  const selectedSports = useHomeSessionFiltersStore(state => state.filters.sports);
  const setFilters = useHomeSessionFiltersStore(state => state.setFilters);

  const orderedSports = useMemo(() => [...sports].sort((a, b) => a.order - b.order), [sports]);
  // A chip reflects a single sport; several sports come from the filters page
  const selectedSport = selectedSports?.length === 1 ? selectedSports[0] : null;
  const isAllSelected = !selectedSports?.length;

  const handleSelect = (sport: Sport | null) => {
    trackEvent({ data: { sport: sport ?? 'ALL' }, eventName: ANALYTICS_EVENTS.HOME.SPORT_CHIP_SELECTED });
    setFilters({ sports: sport ? [sport] : undefined });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="-mx-4"
      contentContainerClassName="gap-2 px-4"
    >
      <SportChip label={t('home.sessions.all_sports')} isSelected={isAllSelected} onPress={() => handleSelect(null)} />
      {orderedSports.map(({ code }) => (
        <SportChip
          key={code}
          sport={code}
          label={t(`common.session_sport_${code}`)}
          isSelected={selectedSport === code}
          onPress={() => handleSelect(code)}
        />
      ))}
    </ScrollView>
  );
};
