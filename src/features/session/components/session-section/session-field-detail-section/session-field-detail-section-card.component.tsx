import { useGetField } from '@/queries/get-field.query';
import { FindOneSessionResponseData } from '@/api/generated/model';
import FieldCard from '@/components/ui/field-card/components/field-card.component';
import FieldCardSkeletonComponent from '@/components/ui/field-card/components/field-card-skeleton.component';

type SessionFieldDetailSectionCardProps = {
  fieldUid: FindOneSessionResponseData['fieldUid'];
};

export default function SessionFieldDetailSectionCard(props: SessionFieldDetailSectionCardProps) {
  const { fieldUid } = props;

  const { data: fieldData, isLoading: fieldDataLoading } = useGetField(fieldUid);

  if (fieldDataLoading) {
    return <FieldCardSkeletonComponent />;
  }

  return <FieldCard field={fieldData} />;
}
