import { String } from '@ludo/ui';

import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionHeader from './session-section-header.component';
import SessionSectionWrapper from './section-section-wrapper/session-section-wrapper.component';

type SessionSectionDescriptionProps = {
  description: FindOneSessionResponseData['description'];
  title: FindOneSessionResponseData['title'];
};

export default function SessionSectionDescription(props: SessionSectionDescriptionProps) {
  const { description, title = 'title' } = props;

  if (!description) {
    return null;
  }
  return (
    <SessionSectionWrapper>
      <SessionSectionHeader iconName="warning-regular" title="session.description_section_title" />
      <String font="primaryBold" variant="body-2">
        {title}
      </String>
      <SessionSectionWrapper>
        <String>{description}</String>
      </SessionSectionWrapper>
    </SessionSectionWrapper>
  );
}
