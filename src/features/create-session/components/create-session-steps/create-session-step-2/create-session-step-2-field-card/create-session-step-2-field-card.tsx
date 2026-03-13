import { FieldResponseDto } from '@/api/generated/model';
import FieldCard from '@/components/ui/field-card/components/field-card.component';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

import CreateSessionStep2FieldCardPublicAvailabilitiesList from './create-session-step-2-field-card-public-availabilities/create-session-step-2-field-card-public-availabilities-list.component';
import CreateSessionStep2FieldCardPrivateAvailabilitiesList from './create-session-step-2-field-card-private-availabilities/create-session-step-2-field-card-private-availabilities-list.component';

type CreateSessionStep2FieldCardProps = {
  item: FieldResponseDto;
};

export default function CreateSessionStep2FieldCard(props: CreateSessionStep2FieldCardProps) {
  const { item } = props;
  const { sport } = useCreateSessionStore(state => state.session);

  return (
    <FieldCard field={item} sportImage={sport} showType showSport>
      {item.type === 'PUBLIC' && <CreateSessionStep2FieldCardPublicAvailabilitiesList field={item} />}
      {item.type === 'PRIVATE' && <CreateSessionStep2FieldCardPrivateAvailabilitiesList field={item} />}
    </FieldCard>
  );
}
