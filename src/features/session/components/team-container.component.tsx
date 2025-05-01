import { Box } from '@/components/chillUI';

import TeamCardComponent from './team-card.component';

interface Team {
  id: number;
  name: string;
  playersCount: number;
  maxPlayerCount: number;
  players: {
    id: number;
    name: string;
  }[];
}

interface TeamContainerProps {
  teams: Team[];
}

export default function TeamContainer({ teams }: TeamContainerProps) {
  return (
    <Box className="my-3 flex gap-4">
      {teams.map((team, index) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TeamCardComponent key={team.id} {...team} className={index === 0 ? 'bg-primary' : 'bg-purplePrimary'} />
      ))}
    </Box>
  );
}
