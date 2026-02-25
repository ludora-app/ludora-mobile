import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionTeamsAlert from './session-section-teams-alert.component';
import SessionSectionTeamsHeader from './session-section-teams-header.component';
import SessionSectionWrapper from '../section-section-wrapper/session-section-wrapper.component';
import SessionSectionTeamsCard from './session-section-teams-card/session-section-teams-card.component';

type SessionTeamsSectionProps = {
  session: FindOneSessionResponseData;
};

export default function SessionSectionTeams({ session }: SessionTeamsSectionProps) {
  return (
    <SessionSectionWrapper>
      <SessionSectionTeamsHeader />
      <SessionSectionTeamsCard session={session} />
      <SessionSectionTeamsAlert session={session} />
    </SessionSectionWrapper>
  );
}
