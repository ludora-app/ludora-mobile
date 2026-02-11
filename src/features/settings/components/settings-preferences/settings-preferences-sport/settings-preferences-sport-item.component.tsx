import { SportProps } from '@/constants/sports.constants';
import SportLevelCard from '@/components/ui/sport-level-card.component';
import { SportPreferenceResponseDataLevel } from '@/api/generated/model';

interface SettingsPreferencesSportItemProps {
  sport: SportProps;
  onPress: (sport: SportProps) => void;
  level?: SportPreferenceResponseDataLevel;
}

export default function SettingsPreferencesSportItem(props: SettingsPreferencesSportItemProps) {
  const { level, onPress, sport } = props
  return (
    <SportLevelCard
      level={level}
      onPress={onPress}
      sport={sport}
      translationKey="on-boarding.step-2.select-sport"
    />
  );
}
