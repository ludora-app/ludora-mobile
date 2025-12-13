import { ScreenLayout } from '@ludo/ui';
import { useSharedValue } from 'react-native-reanimated';

import { HomeHeader } from '../components/home-header.component';
import HomeSessionCardList from '../components/home-session-card/home-session-card-list/home-session-card-list.component';

export default function MatchScreen() {
  const sharedScrollY = useSharedValue(0);

  return (
    <ScreenLayout>
      <HomeHeader scrollY={sharedScrollY} />
      <HomeSessionCardList scrollY={sharedScrollY} />
    </ScreenLayout>
  );
}
