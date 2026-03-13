import { useRef } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { Box, Separator, Wrapper, ScrollView } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import Loading from '@/components/ui/loading/loading.component';
import { useResetStoreOnUnmount } from '@/utils/navigation.utils';
import { useGetSessionById } from '@/queries/get-session-by-id.query';

import SessionFooter from '../components/session-footer.component';
import { useSessionTeamStore } from '../stores/session-team.store';
import { SessionScreenLocalSearchParams } from '../types/session.types';
import SessionSectionTags from '../components/session-section/session-section-tags.component';
import SessionSectionDetails from '../components/session-section/session-section-details.component';
import SessionSectionDescription from '../components/session-section/session-section-description.component';
import SessionSectionTeams from '../components/session-section/session-section-teams/session-section-teams.component';
import SessionImagesSection from '../components/session-section/session-section-images/session-section-images.component';
import SessionSectionCreator from '../components/session-section/session-section-creator/session-section-creator.component';
import SessionSectionFieldDetail from '../components/session-section/session-section-field-detail/session-section-field-detail.component';

export interface SessionScreenProps {
  sport: any;
  endDate: string;
  fieldName: string;
  startDate: string;
  fieldPrice: number;
  participants: number;
  maxParticipants: number;
}

export default function SessionScreen() {
  const scrollViewRef = useRef<RNScrollView>(null);
  const reset = useSessionTeamStore(state => state.reset);
  const { id: sessionUid } = useLocalSearchParams<SessionScreenLocalSearchParams>();
  const {
    data: sessionData,
    isLoading: isLoadingSessionData,
    isRefetching: isRefetchingSessionData,
    refetch: refetchSessionData
  } = useGetSessionById(sessionUid);
  const { creator, description, fieldUid, sport, title } = sessionData || {};

  useResetStoreOnUnmount(reset);

  if (isLoadingSessionData) {
    return <Loading />;
  }

  if (!sessionData && !isLoadingSessionData && !isRefetchingSessionData) {
    return <Redirect href={ROUTES.NOT_FOUND.INDEX} />
  }

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        hasRefreshControl
        refetch={refetchSessionData}
        className="bg-white"
        contentContainerClassName="pb-5"
      >
        {/* SECTION 0 : CAROUSEL session */}
        <SessionImagesSection session={sessionData} />
        <Wrapper className="z-50 my-2 -mt-2 gap-5 rounded-xl bg-white pt-4">
          {/* SECTION 1 : TEAMS */}
          <SessionSectionTeams session={sessionData} />
          <Separator />
          <Box className="gap-2">
            {/* SECTION 3 : DETAILS session */}
            <SessionSectionDetails session={sessionData} />
          </Box>
          <Separator />
          {/* SECTION 4 : TAGS session */}
          <SessionSectionTags session={sessionData} />
          <Separator />

          {/* SECTION 5 : DESCRIPTION */}
          <SessionSectionDescription description={description} title={title} />

          {/* SECTION 6 : FIELD */}
          <SessionSectionFieldDetail fieldUid={fieldUid} sport={sport} />
          <Separator />

          {/* SECTION 7 : CREATOR */}
          <SessionSectionCreator creator={creator} />
        </Wrapper>
      </ScrollView >
      <SessionFooter session={sessionData} scrollViewRef={scrollViewRef} />
    </>
  );
}
