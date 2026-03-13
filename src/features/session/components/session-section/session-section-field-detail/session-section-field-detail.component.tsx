import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionHeader from '../session-section-header.component';
import SessionSectionFieldDetailCard from './session-section-field-detail-card.component';
import SessionSectionWrapper from '../section-section-wrapper/session-section-wrapper.component';

type SessionSectionFieldDetailProps = {
  fieldUid: FindOneSessionResponseData['fieldUid'];
  sport: FindOneSessionResponseData['sport'];
};

export default function SessionSectionFieldDetail(props: SessionSectionFieldDetailProps) {
  const { fieldUid, sport } = props;
  return (
    <SessionSectionWrapper>
      <SessionSectionHeader title="session.session_field_detail_title" iconName="card-detail-regular" />
      <SessionSectionFieldDetailCard fieldUid={fieldUid} sport={sport} />
    </SessionSectionWrapper>
  );
}
