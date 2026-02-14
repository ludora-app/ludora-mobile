import { SportProps } from '@/constants/sports.constants';
import SportLevelCard from '@/components/ui/sport-level-card.component';
import { useSettingsPreferencesStore } from '@/features/settings/stores/settings-preferences.store';

interface SettingsPreferencesSportItemProps {
  sport: SportProps;
  onPress: (sport: SportProps) => void;

}

export default function SettingsPreferencesSportItem(props: SettingsPreferencesSportItemProps) {
  const { onPress, sport } = props
  const sportPreferences = useSettingsPreferencesStore(state => state.sportPreferences.find(sp => sp.sport === sport.name))

  return (
    <SportLevelCard
      level={sportPreferences?.level}
      onPress={onPress}
      sport={sport}
      translationKey="on-boarding.step-2.select-sport"
    />
  );
}
