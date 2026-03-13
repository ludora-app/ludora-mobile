import { useMemo } from 'react';
import { String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import Animated, { FadeIn } from 'react-native-reanimated';

import { FindOneSessionResponseData } from '@/api/generated/model';

import { useSessionTeamStore } from '../../../stores/session-team.store';
import SessionSectionWrapperItem from '../section-section-wrapper/session-section-wrapper-item.component';

interface SessionTeamsCardJoinedTeamProps {
  session: FindOneSessionResponseData;
}

const AnimatedString = Animated.createAnimatedComponent(String);

export default function SessionSectionTeamsAlert({ session }: SessionTeamsCardJoinedTeamProps) {
  const { t } = useTranslate();
  const { remainingPlayers, sessionTeams } = session || {};

  const teamUid = useSessionTeamStore(state => state.teamUid);
  const sideTeam = useSessionTeamStore(state => state.sideTeam);
  const selectedTeamName = teamUid && sessionTeams?.find(team => team.teamUid === teamUid)?.teamName;

  const joinedTeam = sessionTeams?.find(team => team.isJoined);
  const isSwitchingTeam = !!joinedTeam && !!teamUid && joinedTeam.teamUid !== teamUid;

  const handleRemainingPlayers = () => {
    if (teamUid) {
      return remainingPlayers - 1;
    }
    return remainingPlayers;
  };

  const handleColorVariant = useMemo(() => {
    if (!sideTeam) return 'dark';
    return sideTeam === 'left' ? 'primary' : 'secondary';
  }, [sideTeam]);

  return (
    <SessionSectionWrapperItem className="mt-1 items-center justify-center p-2">
      <String colorVariant={handleColorVariant} font="primaryExtraBold" variant="body-2" useFastText={false}>
        {t('session.teams_card_available_places', { count: handleRemainingPlayers(), value: handleRemainingPlayers() })}
      </String>
      {!!selectedTeamName && (
        <AnimatedString colorVariant={handleColorVariant} useFastText={false} entering={FadeIn} truncate>
          {t(isSwitchingTeam ? 'session.teams_card_switching_team' : 'session.teams_card_joined_team')}{' '}
          <String font="primaryExtraBold" colorVariant={handleColorVariant} useFastText={false}>
            {selectedTeamName}
          </String>
        </AnimatedString>
      )}
    </SessionSectionWrapperItem>
  );
}
