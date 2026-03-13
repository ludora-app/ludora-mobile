import { useEffect } from 'react';

import { useUserMe } from '@/queries/user-me.query';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { FindOneSessionResponseData } from '@/api/generated/model';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';
import SessionTeamsCard from '@/components/ui/session-teams-card/session-teams-card.component';

type SessionSectionTeamsCardProps = {
  session: FindOneSessionResponseData;
};

export default function SessionSectionTeamsCard({ session }: SessionSectionTeamsCardProps) {
  const { trackEvent } = useAnalytics();
  const { userMeId } = useUserMe();
  const selectedTeamUid = useSessionTeamStore(state => state.teamUid);
  const setTeamUid = useSessionTeamStore(state => state.setTeamUid);
  const setSideTeam = useSessionTeamStore(state => state.setSideTeam);

  const joinedTeam = session.sessionTeams?.find(team => team.isJoined);

  useEffect(() => {
    if (joinedTeam) {
      const side = session.sessionTeams?.[0]?.teamUid === joinedTeam.teamUid ? 'left' : 'right';
      setSideTeam(side);
    }
  }, [joinedTeam, session.sessionTeams, setSideTeam]);

  const handleSelectTeam = (teamUidToSelect: string, side: 'left' | 'right') => {
    if (joinedTeam?.teamUid === teamUidToSelect || selectedTeamUid === teamUidToSelect) {
      setTeamUid(null);
      return;
    }

    setTeamUid(teamUidToSelect);
    setSideTeam(side);
    trackEvent({ data: { source_screen: '/session/[id]' }, eventName: 'session_team_selected' });
  };

  return (
    <SessionTeamsCard
      session={session}
      selectedTeamUid={selectedTeamUid}
      onSelectTeam={handleSelectTeam}
      disableSelection={false}
      userMeUid={userMeId}
    />
  );
}
