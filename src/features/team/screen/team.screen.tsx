import { useLocalSearchParams } from 'expo-router';
import { Wrapper, String } from '@/components/chillUI';

import teamDetailsMock from '../mocks/team-details.mock';
import TeamDetails from '../component/team-details.component';

export interface TeamScreenProps {
  id: number;
  name: string;
  playersCount: number;
  maxPlayerCount: number;
  players: {
    id: number;
    firstName: string;
    lastName: string;
    profilePic: string;
  }[];
}

function getTeamsDetailsBySessionId(sessionId: number) {
  return teamDetailsMock.filter(team => team.sessionId === sessionId);
}

export default function TeamScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const sessionIdNumber = id ? parseInt(id, 10) : 0;
  const teamsDetails = getTeamsDetailsBySessionId(sessionIdNumber);

  return (
    <Wrapper scrollView className="p-4" safeAreaView={false}>
      <String weight="black" className="mb-6 text-center text-xl">
        DÉTAILS ÉQUIPES
      </String>
      {teamsDetails.map(team => (
        <TeamDetails
          key={team.id}
          name={team.name}
          playersCount={team.playersCount}
          maxPlayerCount={team.maxPlayerCount}
          players={team.players.map(player => ({
            ...player,
            id: player.id.toString(),
          }))}
        />
      ))}
    </Wrapper>
  );
}
