import { BoxRow } from '@ludo/ui';
import { StyleSheet } from 'react-native';

import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionTeamsSessionCardVs from './session-teams-session-card-vs.component';
import SessionTeamsSectionCardTeam from './session-teams-section-card-team.component';

type SessionTeamsSectionCardProps = {
  session: FindOneSessionResponseData;
};

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
});

export default function SessionTeamsSectionCard({ session }: SessionTeamsSectionCardProps) {
  const { sessionTeams } = session || {};

  return (
    <BoxRow className="mt-3.5 h-28 w-full rounded-lg bg-transparent" style={styles.shadow}>
      <SessionTeamsSessionCardVs />
      {sessionTeams?.map((team, index) => (
        <SessionTeamsSectionCardTeam key={team.teamUid} team={team} session={session} index={index} />
      ))}
    </BoxRow>
  );
}
