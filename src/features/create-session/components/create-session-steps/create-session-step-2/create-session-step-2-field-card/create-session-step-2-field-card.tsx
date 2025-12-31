import { useRouter } from 'expo-router';

import ROUTES from '@/constants/ROUTES';
import { FieldResponseDto } from '@/api/generated/model';
import FieldCard from '@/components/ui/field-card/components/field-card.component';

import CreateSessionStep2FieldCardWrapper from './create-session-step-2-field-card-wrapper.component';
import CreateSessionStep2FieldCardPublicAvailabilitiesList from './create-session-step-2-field-card-public-availabilities/create-session-step-2-field-card-public-availabilities-list.component';
import CreateSessionStep2FieldCardPrivateAvailabilitiesList from './create-session-step-2-field-card-private-availabilities/create-session-step-2-field-card-private-availabilities-list.component';

type CreateSessionStep2FieldCardProps = {
  field: FieldResponseDto;
};

export default function CreateSessionStep2FieldCard(props: CreateSessionStep2FieldCardProps) {
  const { field } = props;
  const router = useRouter();

  const handlePress = () => {
    if (field.type === 'PUBLIC') {
      router.push(ROUTES.CREATE_SESSION.FIELD_CARD_PUBLIC_AVAILIBILITIES_FORM_SHEET);
    }
  };

  return (
    <CreateSessionStep2FieldCardWrapper>
      <FieldCard field={field} onPress={field.type === 'PUBLIC' && handlePress}>
        {field.type === 'PUBLIC' && <CreateSessionStep2FieldCardPublicAvailabilitiesList field={field} />}
        {field.type === 'PRIVATE' && <CreateSessionStep2FieldCardPrivateAvailabilitiesList field={field} />}
      </FieldCard>
    </CreateSessionStep2FieldCardWrapper>
  );
}
