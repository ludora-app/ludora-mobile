import { useEffect, useMemo } from 'react';

import dayjs from '@/lib/dayjs';
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

  const isFinished = useMemo(() => {
    if (!session?.endDate) return false;
    return dayjs().isAfter(dayjs(session.endDate));
  }, [session.endDate]);

  const teamUid = useSessionTeamStore(state => state.teamUid);

  useEffect(() => {
    if (!teamUid && joinedTeam) {
      setSideTeam(joinedTeam.teamUid === session.sessionTeams?.[0]?.teamUid ? 'left' : 'right');
    }
  }, [joinedTeam, session.sessionTeams, setSideTeam, teamUid]);

  const handleSelectTeam = (teamUidToSelect: string, side: 'left' | 'right') => {
    if (isFinished) return;
    
    if (joinedTeam?.teamUid === teamUidToSelect || selectedTeamUid === teamUidToSelect) {
      setTeamUid(null);
      setSideTeam(null);
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
      disableSelection={isFinished}
      userMeUid={userMeId}
    />
  );
}
