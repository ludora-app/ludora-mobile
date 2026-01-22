import { useTranslate } from '@tolgee/react';
import { Box, BoxRowCenterBetween, BoxRowCenter, Avatar, Chip, String } from '@ludo/ui';

import { SessionTeamResponseData } from '@/api/generated/model';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';

type SessionTeamsListHeaderProps = {
  team: SessionTeamResponseData;
};

export default function SessionTeamsListSectionHeader({ team }: SessionTeamsListHeaderProps) {
  const { t } = useTranslate();
  const { isComplete, maxPlayersPerTeam, numberOfPlayers, remainingPlayers, teamName, teamUid } = team || {};
  const selectedTeamUid = useSessionTeamStore(state => state.teamUid);

  const handleRemaningPlayers = () => {
    if (selectedTeamUid === teamUid) {
      return remainingPlayers - 1;
    }
    return remainingPlayers;
  };

  const handleNumberOfPlayers = () => {
    if (selectedTeamUid === teamUid) {
      return numberOfPlayers + 1;
    }
    return numberOfPlayers;
  };

  const handleChipTitle = () => {
    if (isComplete || handleRemaningPlayers() === 0) {
      return t('common.completed');
    }
    return t('session.teams_list_header_team_remaining_places', {
      count: handleRemaningPlayers(),
      value: handleRemaningPlayers(),
    });
  };
  return (
    <BoxRowCenterBetween className="mb-4">
      <BoxRowCenter className="gap-2">
        <Avatar
          data={{ firstname: teamName, imageUrl: '' }}
          className="bg-primary rounded-lg"
          contentProps={{
            color: '#FFF',
            font: 'primaryExtraBold',
            size: 'xl',
          }}
          size="sm"
        />
        <Box>
          <String font="primaryBold">{teamName}</String>
          <String colorVariant="muted">
            {t('session.teams_list_header_team_players', { count: `${handleNumberOfPlayers()}/${maxPlayersPerTeam}` })}
          </String>
        </Box>
      </BoxRowCenter>
      <Chip title={handleChipTitle()} size="2xs" />
    </BoxRowCenterBetween>
  );
}
