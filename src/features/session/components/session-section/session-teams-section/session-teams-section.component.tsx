import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionWrapper from '../session-section-wrapper.component';
import SessionTeamsSectionAlert from './session-teams-section-alert.component';
import SessionTeamsSectionHeader from './session-teams-section-header.component';
import SessionTeamsSectionCard from './session-teams-section-card/session-teams-section-card.component';

type SessionTeamsSectionProps = {
  session: FindOneSessionResponseData;
};

export default function SessionTeamsSection({ session }: SessionTeamsSectionProps) {
  return (
    <SessionSectionWrapper>
      <SessionTeamsSectionHeader />
      <SessionTeamsSectionCard session={session} />
      <SessionTeamsSectionAlert session={session} />
    </SessionSectionWrapper>
  );
}
