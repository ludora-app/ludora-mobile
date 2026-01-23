import { useMemo } from 'react';

import { useGetField } from '@/queries/get-field.query';
import { FindOneSessionResponseData } from '@/api/generated/model';
import FieldCard from '@/components/ui/field-card/components/field-card.component';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';
import FieldCardSkeletonComponent from '@/components/ui/field-card/components/field-card-skeleton.component';

type SessionSectionFieldDetailCardProps = {
  fieldUid: FindOneSessionResponseData['fieldUid'];
};

export default function SessionSectionFieldDetailCard(props: SessionSectionFieldDetailCardProps) {
  const { fieldUid } = props;
  const sideTeam = useSessionTeamStore(state => state.sideTeam);

  const { data: fieldData, isLoading: fieldDataLoading } = useGetField(fieldUid);

  const handleShadowVariant = useMemo(() => {
    if (!sideTeam) {
      return 'black';
    }
    return sideTeam === 'left' ? 'primary' : 'secondary';
  }, [sideTeam]);

  if (fieldDataLoading) {
    return <FieldCardSkeletonComponent />;
  }



  return <FieldCard field={fieldData} shadowVariant={handleShadowVariant} />;
}
