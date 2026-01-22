import React from 'react';

import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionHeader from '../session-section-header';
import SessionSectionWrapper from '../session-section-wrapper.component';
import SessionOrganizerSectionCard from './session-creator-section-card.component';

type SessionCreatorSectionProps = {
  creator: FindOneSessionResponseData['creator'];
};

export default function SessionCreatorSection(props: SessionCreatorSectionProps) {
  const { creator } = props;
  return (
    <SessionSectionWrapper>
      <SessionSectionHeader title="Organisateur" iconName="user-regular" />
      <SessionOrganizerSectionCard creator={creator} />
    </SessionSectionWrapper>
  );
}
