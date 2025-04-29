import SportsEnum from '@/constants/SPORTS';
import { Box, String } from '@/components/chillUI';
import { useLocalSearchParams } from 'expo-router';

import sessionUtils from '../utils/session.utils';
import TeamCardComponent from '../components/team-card.component';

export interface SessionScreenProps {
  id: string;
  endDate: string;
  fieldName: string;
  sport: SportsEnum;
  startDate: string;
  fieldPrice: number;
  participants: number;
  maxParticipants: number;
}

export default function SessionScreen() {
  const params = useLocalSearchParams();
  const sessionDetails = sessionUtils.getSessionDetails(params.id as string);

  return (
    <Box>
      <String>{sessionDetails?.fieldLocation}</String>
      <TeamCardComponent />
    </Box>
  );
}
