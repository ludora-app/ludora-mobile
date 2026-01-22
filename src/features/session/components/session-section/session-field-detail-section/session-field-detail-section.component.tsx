import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionHeader from '../session-section-header';
import SessionSectionWrapper from '../session-section-wrapper.component';
import SessionFieldDetailSectionCard from './session-field-detail-section-card.component';

type SessionFieldDetailSectionProps = {
  fieldUid: FindOneSessionResponseData['fieldUid'];
};

export default function SessionFieldDetailSection(props: SessionFieldDetailSectionProps) {
  const { fieldUid } = props;
  return (
    <SessionSectionWrapper>
      <SessionSectionHeader title="session.session_field_detail_title" iconName="card-detail-regular" />
      <SessionFieldDetailSectionCard fieldUid={fieldUid} />
    </SessionSectionWrapper>
  );
}
