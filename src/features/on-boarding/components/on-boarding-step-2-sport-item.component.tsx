import { SportProps } from '@/constants/sports.constants';
import SportLevelCard from '@/components/ui/sport-level-card.component';
import { SportPreferenceResponseDataLevel } from '@/api/generated/model';

import { useOnBoardingStore } from '../stores/on-boarding.store';

type OnBoardingStep2SportItemProps = {
  sport: SportProps;
};

export default function OnBoardingStep2SportItem(props: OnBoardingStep2SportItemProps) {
  const { sport } = props;
  const setSportPreferences = useOnBoardingStore(state => state.setSportPreferences);
  const removeSportPreference = useOnBoardingStore(state => state.removeSportPreference);
  const sportPreference = useOnBoardingStore(state =>
    state.sportPreferences.find(sp => sp.sport === sport.name),
  );

  const handlePress = () => {
    const currentLevel = sportPreference?.level;
    if (currentLevel === 3) {
      removeSportPreference(sport.name);
      return;
    }
    const nextLevel = !currentLevel ? 1 : currentLevel + 1;

    setSportPreferences({
      gameModes: sportPreference?.gameModes || [],
      level: nextLevel as SportPreferenceResponseDataLevel,
      sport: sport.name,
    });
  };

  return (
    <SportLevelCard
      sport={sport}
      level={sportPreference?.level}
      onPress={handlePress}
      translationKey="on-boarding.step-2.select-sport"
    />
  );
}

