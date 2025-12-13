import { Box, cn } from '@chillui/ui';

import TeamCardComponent from './team-card.component';

interface Team {
  id: number;
  name: string;
  sessionId: number;
  playersCount: number;
  maxPlayerCount: number;
  players: {
    id: number;
    firstName: string;
    lastName: string;
    profilePic: string;
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
        <TeamCardComponent key={team.id} {...team} className={cn(index === 0 ? 'bg-primary' : 'bg-purplePrimary')} />
      ))}
    </Box>
  );
}
