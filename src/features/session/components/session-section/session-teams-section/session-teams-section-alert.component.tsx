import { Box, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import Animated, { FadeIn } from 'react-native-reanimated';

import { FindOneSessionResponseData } from '@/api/generated/model';

import { useSessionTeamStore } from '../../../stores/session-team.store';

interface SessionTeamsCardJoinedTeamProps {
  session: FindOneSessionResponseData;
}

const AnimatedString = Animated.createAnimatedComponent(String);
export default function SessionTeamsSectionAlert({ session }: SessionTeamsCardJoinedTeamProps) {
  const { t } = useTranslate();
  const { remainingPlayers, sessionTeams } = session || {};

  const teamUid = useSessionTeamStore(state => state.teamUid);

  const selectedTeamName = teamUid && sessionTeams?.find(team => team.teamUid === teamUid)?.teamName;

  const handleRemainingPlayers = () => {
    if (teamUid) {
      return remainingPlayers - 1;
    }
    return remainingPlayers;
  };

  return (
    <Box className="bg-primary/20 border-primary mt-1 items-center justify-center rounded-lg border p-2">
      <String colorVariant="primary" font="primaryExtraBold" variant="body-2" useFastText={false}>
        {t('session.teams_card_available_places', { count: handleRemainingPlayers(), value: handleRemainingPlayers() })}
      </String>
      {!!selectedTeamName && (
        <AnimatedString colorVariant="primary" useFastText={false} entering={FadeIn}>
          {t('session.teams_card_joined_team')}{' '}
          <String font="primaryExtraBold" colorVariant="primary" useFastText={false}>
            {selectedTeamName}
          </String>
        </AnimatedString>
      )}
    </Box>
  );
}
