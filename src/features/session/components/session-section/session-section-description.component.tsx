import { Separator, String } from '@ludo/ui';

import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionHeader from './session-section-header.component';
import SessionSectionWrapper from './section-section-wrapper/session-section-wrapper.component';

type SessionSectionDescriptionProps = {
  description: FindOneSessionResponseData['description'];
  title: FindOneSessionResponseData['title'];
};

export default function SessionSectionDescription(props: SessionSectionDescriptionProps) {
  const { description, title } = props;

  if (!description && !title) {
    return null;
  }
  return (
    <>
      <SessionSectionWrapper>
        <SessionSectionHeader iconName="warning-regular" title="session.description_section_title" />
        {title && (
          <String font="primaryBold" variant="body-2">
            {title}
          </String>
        )}
        {description && (
          <SessionSectionWrapper>
            <String>{description}</String>
          </SessionSectionWrapper>
        )}
      </SessionSectionWrapper>
      <Separator />
    </>
  );
}
