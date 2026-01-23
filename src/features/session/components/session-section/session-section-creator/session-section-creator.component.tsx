import React from 'react';

import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionHeader from '../session-section-header.component';
import SessionSectionCreatorCard from './session-section-creator-card.component';
import SessionSectionWrapper from '../section-section-wrapper/session-section-wrapper.component';
import { useTranslate } from '@tolgee/react';

type SessionSectionCreatorProps = {
  creator: FindOneSessionResponseData['creator'];
};

export default function SessionSectionCreator(props: SessionSectionCreatorProps) {
  const { t } = useTranslate();
  const { creator } = props;
  return (
    <SessionSectionWrapper>
      <SessionSectionHeader title={t('session.creator_section_title')} iconName="user-regular" />
      <SessionSectionCreatorCard creator={creator} />
    </SessionSectionWrapper>
  );
}
