import { cn } from '@chillui/ui';
import React, { useMemo } from 'react';
import { useTranslate } from '@tolgee/react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, BoxCenter, BoxRow, Chip, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { FindOneSessionResponseData, SessionTeamResponseData } from '@/api/generated/model';

import SessionTeamsCardAvatar from './session-teams-card-avatar.component';

type SessionTeamsCardTeamProps = {
  disableSelection?: boolean;
  index: number;
  onSelectTeam?: (teamUid: string, side: 'left' | 'right') => void;
  selectedTeamUid?: string | null;
  session: FindOneSessionResponseData;
  team: SessionTeamResponseData;
  userMeUid?: string | null;
};

const styles = StyleSheet.create({
  leftShadow: {
    boxShadow: '0px 0px 10px #F1592440',
  },
  rightShadow: {
    boxShadow: '0px 0px 10px #864C9E40',
  },
});

export default function SessionTeamsCardTeam(props: SessionTeamsCardTeamProps) {
  const {
    disableSelection,
    index: itemIndex,
    onSelectTeam,
    selectedTeamUid,
    session,
    team,
    userMeUid,
  } = props;
  const { sessionPlayers, teamUid } = team || {};
  const { maxPlayersPerTeam } = session || {};
  const { t } = useTranslate();

  const getTeamSide = (index: number) => (index === 0 ? 'left' : 'right');
  const side = getTeamSide(itemIndex);

  const isJoinedTeam = team.isJoined;
  const isTeamSelected = selectedTeamUid === teamUid;
  const isAnyTeamSelected = !!selectedTeamUid;


  const isMeVisuallyPresent = isTeamSelected || (isJoinedTeam && !isAnyTeamSelected);

  const filteredPlayers = useMemo(() =>
    sessionPlayers?.filter(player => player.userUid !== userMeUid) || []
    , [sessionPlayers, userMeUid]);

  const displayCount = useMemo(() => {
    const baseCount = filteredPlayers.length;
    return isMeVisuallyPresent ? baseCount + 1 : baseCount;
  }, [filteredPlayers.length, isMeVisuallyPresent]);

  const isPreviewComplete = displayCount >= (maxPlayersPerTeam || 0);

  const showAddIcon = !isPreviewComplete && !isMeVisuallyPresent;

  const showCompletedOverlay = isPreviewComplete;

  const pushAvatarToLeft = (sessionPlayersIndex: number) =>
    sessionPlayersIndex > 0 || isMeVisuallyPresent || showAddIcon;

  const handlePress = () => {
    if (onSelectTeam) {
      onSelectTeam(teamUid, side);
    }
  };

  return (
    <Pressable
      key={team.teamUid}
      className="relative flex-1 rounded-lg"
      onPress={handlePress}
      disabled={disableSelection || (isPreviewComplete && !isMeVisuallyPresent)}
      style={({ pressed }) => [
        { opacity: pressed ? 0.9 : 1 },
        side === 'left' ? styles.leftShadow : styles.rightShadow,
      ]}
    >
      {showCompletedOverlay && (
        <BoxCenter
          className={cn('absolute inset-0 z-60 bg-black/40', {
            'rounded-l-lg': side === 'left',
            'rounded-r-lg': side === 'right',
          })}
        >
          <String font="primaryExtraBold" colorVariant="white" variant="title-1" truncate>
            {t('common.completed')}
          </String>
        </BoxCenter>
      )}

      <Chip
        title={team.teamName}
        variant={isMeVisuallyPresent ? 'contained' : 'outlined'}
        colorVariant={side === 'left' ? 'primary' : 'secondary'}
        className={cn('absolute left-1/2 z-60 max-w-[90%] -translate-x-1/2 -translate-y-1/2 transform self-start', {
          'bg-white': !isMeVisuallyPresent,
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
          'bg-primary/20': isMeVisuallyPresent && side === 'left',
          'bg-secondary/20': isMeVisuallyPresent && side === 'right',
          'border-primary rounded-l-lg': side === 'left',
          'border-secondary rounded-r-lg': side === 'right',
        })}
      >
        <BoxRow className="h-16 items-center justify-center">
          <Box className="z-50 flex-row items-center">
            {isMeVisuallyPresent && (
              <SessionTeamsCardAvatar
                me
                size="sm"
                sideTeam={side}
                className="z-60"
              />
            )}
            {showAddIcon && (
              <Icon
                name="add-circle-regular"
                className="z-50 size-14"
                color={side === 'right' ? COLORS.secondary : COLORS.primary}
              />
            )}
            {filteredPlayers?.map((player, sessionPlayersIndex) => (
              <SessionTeamsCardAvatar
                key={player.userUid}
                data={{ firstname: player?.firstname, imageUrl: player?.imageUrl ? { uri: player.imageUrl } : undefined, lastname: player?.lastname }}
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
            {team.numberOfPlayers > (team.sessionPlayers?.length || 0) && (
              <String font="primaryBold" className="ml-1">
                +{team.numberOfPlayers - (team.sessionPlayers?.length || 0)}
              </String>
            )}
          </Box>
        </BoxRow>
      </BoxCenter>
    </Pressable>
  );
}
