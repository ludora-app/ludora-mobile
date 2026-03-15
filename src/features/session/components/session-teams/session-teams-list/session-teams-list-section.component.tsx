import { EmptyResult } from '@/components/ui/empty-resulat';
import { SessionTeamResponseData } from '@/api/generated/model';

import SessionTeamsListItem from './session-teams-list-item.component';
import SessionTeamsListItemJoin from './session-teams-list-item-join.component';
import SessionTeamsListSectionHeader from './session-teams-list-section-header.component';

type SessionTeamsListItemProps = {
  item: SessionTeamResponseData;
  hasUserJoinedATeam: boolean;
  teamSide: 'left' | 'right';
  isStarted?: boolean;
};

export default function SessionTeamsListSection(props: SessionTeamsListItemProps) {
  const { hasUserJoinedATeam, isStarted, item: sessionTeam, teamSide } = props;

  const { sessionPlayers } = sessionTeam || {};

  const showEmptyComponent = hasUserJoinedATeam && sessionPlayers?.length === 0;

  return (
    <>
      <SessionTeamsListSectionHeader team={sessionTeam} teamSide={teamSide} />
      {sessionPlayers?.map(player => (
        <SessionTeamsListItem key={player.userUid} data={player} teamSide={teamSide} />
      ))}
      {showEmptyComponent && (
        <EmptyResult
          className="mt-2 bg-white"
          iconClassName="size-18 -mb-3"
          title="session.teams_list_empty_title_v"
          hasRandomTitle
        />
      )}
      {!hasUserJoinedATeam && <SessionTeamsListItemJoin teams={sessionTeam} teamSide={teamSide} isStarted={isStarted} />}
    </>
  );
}
