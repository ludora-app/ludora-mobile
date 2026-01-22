import { String } from '@ludo/ui';

import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionHeader from './session-section-header';
import SessionSectionWrapper from './session-section-wrapper.component';

type SessionDescriptionProps = {
  description: FindOneSessionResponseData['description'];
};

export default function SessionDescriptionSection(props: SessionDescriptionProps) {
  const { description } = props;

  if (!description) {
    return null;
  }
  return (
    <SessionSectionWrapper>
      <SessionSectionHeader iconName="warning-regular" title="session.description_section_title" />
      <SessionSectionWrapper withShadow>
        <String>{description}</String>
      </SessionSectionWrapper>
    </SessionSectionWrapper>
  );
}
