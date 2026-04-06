import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionTeamsCard from './session-section-teams-card.component';
import SessionSectionTeamsAlert from './session-section-teams-alert.component';
import SessionSectionTeamsHeader from './session-section-teams-header.component';
import SessionSectionWrapper from '../section-section-wrapper/session-section-wrapper.component';

type SessionTeamsSectionProps = {
  session: FindOneSessionResponseData;
};

export default function SessionSectionTeams({ session }: SessionTeamsSectionProps) {
  return (
    <SessionSectionWrapper>
      <SessionSectionTeamsHeader session={session} />
      <SessionSectionTeamsCard session={session} />
      <SessionSectionTeamsAlert session={session} />
    </SessionSectionWrapper>
  );
}
