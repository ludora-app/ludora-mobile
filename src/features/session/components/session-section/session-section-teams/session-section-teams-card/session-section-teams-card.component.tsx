import { BoxRow } from '@ludo/ui';

import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionTeamsCardVs from './session-section-teams-card-vs.component';
import SessionSectionTeamsCardTeam from './session-section-teams-card-team.component';

type SessionSectionTeamsCardProps = {
  session: FindOneSessionResponseData;
};



export default function SessionSectionTeamsCard({ session }: SessionSectionTeamsCardProps) {
  const { sessionTeams } = session || {};

  return (
    <BoxRow className="mt-3.5 h-28 w-full rounded-lg bg-transparent">
      <SessionSectionTeamsCardVs />
      {sessionTeams?.map((team, index) => (
        <SessionSectionTeamsCardTeam key={team.teamUid} team={team} session={session} index={index} />
      ))}
    </BoxRow>
  );
}
