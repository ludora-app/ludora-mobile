import { BoxGrow, cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { BoxRowCenterBetween, BoxRowCenter, Avatar, Chip, String } from '@ludo/ui';

import { SessionTeamResponseData } from '@/api/generated/model';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';

type SessionTeamsListHeaderProps = {
  team: SessionTeamResponseData;
  teamSide: 'left' | 'right';
};

export default function SessionTeamsListSectionHeader(props: SessionTeamsListHeaderProps) {
  const { team, teamSide } = props;
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

  const avatarColor = teamSide === 'left' ? 'bg-primary' : 'bg-secondary border-secondary';

  const chipColorVariant = teamSide === 'left' ? 'primary' : 'secondary';

  return (
    <BoxRowCenterBetween className="mb-4 gap-2">
      <BoxRowCenter className="flex-1 gap-2">
        <Avatar
          data={{ firstname: teamName, imageUrl: '' }}
          className={cn('rounded-lg', avatarColor)}
          contentProps={{
            color: '#FFF',
            font: 'primaryExtraBold',
            size: 'xl',
          }}
          size="sm"
        />
        <BoxGrow>
          <String font="primaryBold" truncate>
            {teamName}
          </String>
          <String colorVariant="muted">
            {t('session.teams_list_header_team_players', { count: `${handleNumberOfPlayers()}/${maxPlayersPerTeam}` })}
          </String>
        </BoxGrow>
      </BoxRowCenter>
      <Chip title={handleChipTitle()} size="2xs" colorVariant={chipColorVariant} />
    </BoxRowCenterBetween>
  );
}
