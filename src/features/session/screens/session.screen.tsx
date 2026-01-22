import { useRef } from 'react';
import { ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Box, Separator, Wrapper } from '@ludo/ui';

import Loading from '@/components/ui/loading/loading.component';
import { useResetStoreOnUnmount } from '@/utils/navigation.utils';
import { useGetSessionById } from '@/queries/get-session-by-id.query';

import SessionFooter from '../components/session-footer.component';
import { useSessionTeamStore } from '../stores/session-team.store';
import { SessionScreenLocalSearchParams } from '../types/session.types';
import SessionTagsSection from '../components/session-section/session-tags-section.component';
import SessionTitleSection from '../components/session-section/session-title-section.component';
import SessionDetailsSection from '../components/session-section/session-details-section.component';
import SessionDescriptionSection from '../components/session-section/session-description-section.component';
import SessionTeamsSection from '../components/session-section/session-teams-section/session-teams-section.component';
import SessionImagesSection from '../components/session-section/session-images-section/session-images-section.component';
import SessionCreatorSection from '../components/session-section/session-creator-section/session-creator-section.component';
import SessionFieldDetailSection from '../components/session-section/session-field-detail-section/session-field-detail-section.component';

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
  const scrollViewRef = useRef<ScrollView>(null);
  const reset = useSessionTeamStore(state => state.reset);
  const { id: sessionUid } = useLocalSearchParams<SessionScreenLocalSearchParams>();
  const { data: sessionData, error, isLoading: isLoadingSessionData } = useGetSessionById(sessionUid);
  const { creator, description, fieldUid, title } = sessionData || {};
  error === '';
  useResetStoreOnUnmount(reset);

  if (isLoadingSessionData) {
    return <Loading />;
  }

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-5"
      >
        {/* SECTION 0 : CAROUSEL session */}
        <SessionImagesSection session={sessionData} />
        <Wrapper className="bg-background z-50 my-2 -mt-2 gap-5 rounded-xl pt-4">
          {/* SECTION 1 : TEAMS */}
          <SessionTeamsSection session={sessionData} />
          <Separator />
          <Box className="gap-2">
            {/* SECTION 2 : TITLE session */}
            <SessionTitleSection title={title} />

            {/* SECTION 3 : DETAILS session */}
            <SessionDetailsSection session={sessionData} />
          </Box>
          <Separator />
          {/* SECTION 4 : TAGS session */}
          <SessionTagsSection session={sessionData} />
          <Separator />

          {/* SECTION 5 : DESCRIPTION */}
          <SessionDescriptionSection description={description} />
          <Separator />

          {/* SECTION 6 : FIELD */}
          <SessionFieldDetailSection fieldUid={fieldUid} />
          <Separator />

          {/* SECTION 7 : CREATOR */}
          <SessionCreatorSection creator={creator} />
        </Wrapper>
      </ScrollView>
      <SessionFooter session={sessionData} scrollViewRef={scrollViewRef} />
    </>
  );
}
