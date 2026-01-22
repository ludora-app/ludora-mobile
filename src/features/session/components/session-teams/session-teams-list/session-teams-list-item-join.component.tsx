import { cn } from '@chillui/ui';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Avatar, Box, BoxCenter, BoxRow, BoxRowCenterBetween, Button, String } from '@ludo/ui';

import { useUserMe } from '@/queries/user-me.query';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { SessionTeamResponseData } from '@/api/generated/model';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';

type SessionTeamsListItemJoinProps = {
  teams: SessionTeamResponseData;
};

export default function SessionTeamsListItemJoin({ teams }: SessionTeamsListItemJoinProps) {
  const { t } = useTranslate();
  const { isComplete, isJoined, teamUid } = teams || {};
  const { trackEvent } = useAnalytics();

  const setTeamUid = useSessionTeamStore(state => state.setTeamUid);
  const selectedTeamUid = useSessionTeamStore(state => state.teamUid);
  const { userMe } = useUserMe(!!selectedTeamUid);
  const { firstname, lastname } = userMe || {};

  const isSelectedTeam = teamUid === selectedTeamUid;

  if (isComplete || isJoined) return null;

  const handleJoinTeam = () => {
    setTeamUid(teamUid);
    trackEvent({ data: { source_screen: '/session/[id]/session-teams' }, eventName: 'session_team_selected' });
  };

  return (
    <Pressable onPress={handleJoinTeam}>
      <BoxRowCenterBetween
        className={cn('border-ring rounded-xl border p-2 opacity-50', selectedTeamUid && 'opacity-100')}
      >
        <BoxRow className="items-center gap-2">
          {!isSelectedTeam && (
            <BoxCenter className="border-ring size-14 rounded-full border">
              <String variant="title-1" colorVariant="muted">
                +
              </String>
            </BoxCenter>
          )}
          {isSelectedTeam && <Avatar data={{ ...userMe, imageUrl: userMe?.imageUrl }} />}
          {!isSelectedTeam && (
            <Box>
              <String colorVariant="muted">{t('session.teams_list_join_available_place')}</String>
              <String variant="body-sm" colorVariant="muted">
                {t('session.teams_list_join_waiting_for_player')}
              </String>
            </Box>
          )}
          {isSelectedTeam && <String variant="body-sm">{`${firstname} ${lastname}`}</String>}
        </BoxRow>
      </BoxRowCenterBetween>
      {!isSelectedTeam && (
        <Box className="absolute top-1/2 right-2 z-50 -translate-y-1/2">
          <Button title="Rejoindre" variant="outlined" fit size="xs" onPress={handleJoinTeam} />
        </Box>
      )}
    </Pressable>
  );
}
