import { Box } from '@chillui/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { sportsColors, SportsEnum } from '@/constants/SPORTS';

import sessionUtils from '../utils/session.utils';

export interface SessionScreenProps {
  id: string;
  sport: any;
  endDate: string;
  fieldName: string;
  startDate: string;
  fieldPrice: number;
  participants: number;
  maxParticipants: number;
}

export default function SessionScreen() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const sessionDetails = sessionUtils.getSessionDetails((params.id as string) ?? '1');
  const { top } = useSafeAreaInsets();
  return <Box className="flex-1" />;
}
