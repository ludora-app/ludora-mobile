import { cn } from '@chillui/ui';
import { useEffect } from 'react';
import { useTranslate } from '@tolgee/react';
import { Pressable, StyleSheet } from 'react-native';
import { String, BoxCenter, Chip, Box, BoxRow, Icon } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';
import { FindOneSessionResponseData, SessionTeamResponseData } from '@/api/generated/model';

import SessionSectionAvatar from '../../session-section-avatar.component';

type SessionSectionTeamsCardTeamProps = {
  team: SessionTeamResponseData;
  session: FindOneSessionResponseData;
  index: number;
};

const styles = StyleSheet.create({
  leftShadow: {
    boxShadow: '0px 0px 10px #F1592440',
  },
  rightShadow: {
    boxShadow: '0px 0px 10px #864C9E40',
  },
});

export default function SessionSectionTeamsCardTeam(props: SessionSectionTeamsCardTeamProps) {
  const { index: itemIndex, session, team } = props;
  const { isComplete, numberOfPlayers, teamUid } = team || {};
  const { isJoined: isJoinedSession, maxPlayersPerTeam } = session || {};
  const { t } = useTranslate();
  const { trackEvent } = useAnalytics();
  const selectedTeamUid = useSessionTeamStore(state => state.teamUid);
  const setTeamUid = useSessionTeamStore(state => state.setTeamUid);
  const setSideTeam = useSessionTeamStore(state => state.setSideTeam);
  const isSelectedTeam = (uid: string) => selectedTeamUid === uid;

  const getTeamSide = (index: number) => (index === 0 ? 'left' : 'right');

  const side = getTeamSide(itemIndex);

  const isJoinedTeam = team.isJoined;

  const isTeamEmpty = numberOfPlayers === 0 && selectedTeamUid !== teamUid;
  const isCompleteTeam = isComplete;
  const isTeamSelected = isSelectedTeam(team.teamUid);

  const displayCount = isTeamSelected && !isJoinedTeam ? numberOfPlayers + 1 : numberOfPlayers;

  const showAddIcon = (!isCompleteTeam && !isJoinedSession && !isTeamSelected) || isTeamEmpty;

  const isSideSelected = isTeamSelected || isJoinedTeam;

  useEffect(() => {
    if (isSideSelected) {
      setSideTeam(side);
    }
  }, [isSideSelected, side, setSideTeam]);

  const pushAvatarToLeft = (sessionPlayersIndex: number) =>
    sessionPlayersIndex > 0 || isTeamSelected || (!isCompleteTeam && !isJoinedSession);

  const handleSelectTeam = (teamUidToSelect: string) => {
    setTeamUid(teamUidToSelect);
    trackEvent({ data: { source_screen: '/session/[id]' }, eventName: 'session_team_selected' });
  };

  return (
    <Pressable
      key={team.teamUid}
      className="relative flex-1 rounded-lg"
      onPress={() => handleSelectTeam(team.teamUid)}
      disabled={isCompleteTeam || isJoinedSession}
      style={({ pressed }) => [
        { opacity: pressed ? 0.9 : 1 },
        side === 'left' ? styles.leftShadow : styles.rightShadow,
      ]}
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
        variant={isSideSelected ? 'contained' : 'outlined'}
        colorVariant={side === 'left' ? 'primary' : 'secondary'}
        className={cn('absolute left-1/2 z-60 max-w-[90%] -translate-x-1/2 -translate-y-1/2 transform self-start', {
          'bg-white': !isSideSelected,
        })}
        size="2xs"
      />

      <Chip
        title={`${displayCount}/${maxPlayersPerTeam}`}
        variant="text"
        colorVariant={side === 'left' ? 'primary' : 'secondary'}
        className={cn('absolute bottom-0 z-50 transform self-start rounded-lg', {
          'left-0': side === 'left',
          'right-0': side === 'right',
        })}
        size="2xs"
      />

      <BoxCenter
        className={cn('flex-1 border bg-white px-2 py-5', {
          'bg-primary/20': isSideSelected && side === 'left',
          'bg-secondary/20': isSideSelected && side === 'right',
          'border-primary rounded-l-lg': side === 'left',
          'border-secondary rounded-r-lg': side === 'right',
        })}
      >
        <BoxRow className="h-16 items-center justify-center">
          <Box className="z-50 flex-row items-center">
            {isTeamSelected && <SessionSectionAvatar me size="sm" sideTeam={side} className="z-60" />}
            {showAddIcon && (
              <Icon
                name="add-circle-regular"
                className={cn('z-50 size-14', { 'opacity-50': isJoinedSession })}
                color={side === 'right' ? COLORS.secondary : COLORS.primary}
              />
            )}
            {team.sessionPlayers?.map((player, sessionPlayersIndex) => (
              <SessionSectionAvatar
                key={player.userUid}
                data={{ firstname: player?.firstname, imageUrl: player?.imageUrl, lastname: player?.lastname }}
                sideTeam={side}
                size="sm"
                style={{
                  zIndex: 40 - sessionPlayersIndex,
                }}
                className={cn({
                  '-ml-6': pushAvatarToLeft(sessionPlayersIndex),
                })}
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
