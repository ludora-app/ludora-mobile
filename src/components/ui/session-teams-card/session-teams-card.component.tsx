import React from 'react';
import { BoxRow } from '@ludo/ui';

import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionTeamsCardVs from './session-teams-card-vs.component';
import SessionTeamsCardTeam from './session-teams-card-team.component';

type SessionTeamsCardProps = {
  disableSelection?: boolean;
  onSelectTeam?: (teamUid: string, side: 'left' | 'right') => void;
  selectedTeamUid?: string | null;
  session: FindOneSessionResponseData;
  userMeUid?: string | null;
};

export default function SessionTeamsCard({
  disableSelection,
  onSelectTeam,
  selectedTeamUid,
  session,
  userMeUid,
}: SessionTeamsCardProps) {
  const { sessionTeams } = session || {};

  return (
    <BoxRow className="mt-3.5 h-28 w-full rounded-lg bg-transparent">
      <SessionTeamsCardVs />
      {sessionTeams?.map((team, index) => (
        <SessionTeamsCardTeam
          key={team.teamUid}
          disableSelection={disableSelection}
          index={index}
          onSelectTeam={onSelectTeam}
          selectedTeamUid={selectedTeamUid}
          session={session}
          team={team}
          userMeUid={userMeUid}
        />
      ))}
    </BoxRow>
  );
}
