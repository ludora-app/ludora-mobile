import { FieldResponseDto } from '@/api/generated/model';
import FieldCard from '@/components/ui/field-card/components/field-card.component';

type CreateSessionStep2FieldCardProps = {
  item: FieldResponseDto;
};

export default function OnBoardingStep4FieldCard(props: CreateSessionStep2FieldCardProps) {
  const { item } = props;

  return <FieldCard field={item} />;
}
