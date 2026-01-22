import { cn } from '@chillui/ui';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { String, BoxCenter, Chip, Avatar, Box, BoxRow, Icon } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import AvatarMe from '@/components/ui/me/avatarMe/avatar-me.component';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';
import { FindOneSessionResponseData, SessionTeamResponseData } from '@/api/generated/model';

type SessionTeamsSectionCardTeamProps = {
  team: SessionTeamResponseData;
  session: FindOneSessionResponseData;
  index: number;
};

export default function SessionTeamsSectionCardTeam(props: SessionTeamsSectionCardTeamProps) {
  const { index: itemIndex, session, team } = props;
  const { isComplete, numberOfPlayers, teamUid } = team || {};
  const { isJoined: isJoinedSession, maxPlayersPerTeam } = session || {};
  const { t } = useTranslate();
  const { trackEvent } = useAnalytics();
  const selectedTeamUid = useSessionTeamStore(state => state.teamUid);
  const setTeamUid = useSessionTeamStore(state => state.setTeamUid);
  const isSelectedTeam = (uid: string) => selectedTeamUid === uid;

  const getTeamSide = (index: number) => (index === 0 ? 'left' : 'right');

  const side = getTeamSide(itemIndex);

  const isJoinedTeam = team.isJoined;

  const isTeamEmpty = numberOfPlayers === 0 && selectedTeamUid !== teamUid;
  const isCompleteTeam = isComplete;
  const isTeamSelected = isSelectedTeam(team.teamUid);

  const displayCount = isTeamSelected && !isJoinedTeam ? numberOfPlayers + 1 : numberOfPlayers;

  const showAddIcon = (!isCompleteTeam && !isJoinedSession && !isTeamSelected) || isTeamEmpty;

  const pushAvatarToLeft = (sessionPlayersIndex: number) =>
    sessionPlayersIndex > 0 || isTeamSelected || (!isCompleteTeam && !isJoinedSession);

  const handleSelectTeam = (teamUidToSelect: string) => {
    setTeamUid(teamUidToSelect);
    trackEvent({ data: { source_screen: '/session/[id]' }, eventName: 'session_team_selected' });
  };

  return (
    <Pressable
      key={team.teamUid}
      className="relative flex-1"
      onPress={() => handleSelectTeam(team.teamUid)}
      disabled={isCompleteTeam || isJoinedSession}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {isCompleteTeam && (
        <BoxCenter
          className={cn('absolute inset-0 z-60 bg-black/40', {
            'rounded-l-lg': side === 'left',
            'rounded-r-lg': side === 'right',
          })}
        >
          <String font="primaryExtraBold" colorVariant="white" variant="title-1">
            {t('common.completed')}
          </String>
        </BoxCenter>
      )}

      <Chip
        title={team.teamName}
        variant={isTeamSelected || isJoinedTeam ? 'contained' : 'outlined'}
        className={cn('absolute left-1/2 z-60 max-w-[90%] -translate-x-1/2 -translate-y-1/2 transform self-start', {
          'bg-white': !isTeamSelected && !isJoinedTeam,
        })}
        size="2xs"
      />

      <Chip
        title={`${displayCount}/${maxPlayersPerTeam}`}
        variant="outlined"
        className={cn('absolute bottom-0 z-50 transform self-start rounded-lg bg-white', {
          'left-0': side === 'left',
          'right-0': side === 'right',
        })}
        size="2xs"
      />

      <BoxCenter
        className={cn('flex-1 border-2 border-transparent bg-white px-2 py-5', {
          'bg-ring/10': side === 'left',
          'border-primary bg-primary/20': isTeamSelected || isJoinedTeam,
          'rounded-l-lg': side === 'left',
          'rounded-r-lg': side === 'right',
        })}
      >
        <BoxRow className="h-16 items-center justify-center">
          <Box className="z-50 flex-row items-center">
            {isTeamSelected && <AvatarMe size="sm" className="z-50" />}
            {showAddIcon && (
              <Icon
                name="add-circle-regular"
                className={cn('z-50 size-14', { 'opacity-50': isJoinedSession })}
                color={COLORS.primary}
              />
            )}
            {team.sessionPlayers?.map((player, sessionPlayersIndex) => (
              <Avatar
                key={player.userUid}
                data={player}
                className={cn({
                  '-ml-6': pushAvatarToLeft(sessionPlayersIndex),
                })}
                size="sm"
                style={{
                  zIndex: 40 - sessionPlayersIndex,
                }}
              />
            ))}
            {team.numberOfPlayers > team.sessionPlayers.length && (
              <String font="primaryBold" className="ml-1">
                +{team.numberOfPlayers - team.sessionPlayers.length}
              </String>
            )}
          </Box>
        </BoxRow>
      </BoxCenter>
    </Pressable>
  );
}
