import { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

import dayjs from '@/lib/dayjs';
import { useSafeArea } from '@/hooks/safe-area.hook';
import Loading from '@/components/ui/loading/loading.component';
import { useGetSessionById } from '@/queries/get-session-by-id.query';
import { SessionScreenLocalSearchParams } from '@/features/session/types/session.types';
import { useGetSessionTeams } from '@/features/session/queries/get-session-teams.query';

import SessionTeamsListSection from './session-teams-list-section.component';
import SessionTeamsListSectionSeparator from './session-teams-list-section-separator.component';

export default function SessionTeamsList() {
  const { bottom } = useSafeArea();
  const { id: sessionUid } = useLocalSearchParams<SessionScreenLocalSearchParams>();
  const { data: sessionData } = useGetSessionById(sessionUid);
  const { data: sessionTeams, isLoading: isLoadingSessionTeams } = useGetSessionTeams(sessionUid);

  const isFinished = useMemo(() => {
    if (!sessionData?.endDate) return false;
    return dayjs().isAfter(dayjs(sessionData.endDate));
  }, [sessionData?.endDate]);

  const hasUserJoinedATeam = sessionTeams?.some(team => team.isJoined);


  if (isLoadingSessionTeams) {
    return <Loading />;
  }

  return (
    <FlatList
      data={sessionTeams}
      renderItem={({ index, item }) => (
        <SessionTeamsListSection
          item={item}
          hasUserJoinedATeam={hasUserJoinedATeam}
          teamSide={index === 0 ? 'left' : 'right'}
          isStarted={isFinished}
        />
      )}
      ItemSeparatorComponent={SessionTeamsListSectionSeparator}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottom }}
      contentContainerClassName="mt-4"
    />
  );
}
