import { memo, useMemo } from 'react';
import { Chip, ChipProps } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import type {
  FieldResponseDto,
  FieldResponseDtoType,
  MyFieldsResponseData,
  MyFieldsResponseDataStatus,
} from '@/api/generated/model';

import { FieldCard } from '@/components/ui/field-card';

interface MyFieldCardProps {
  item: MyFieldsResponseData;
}

function mapMyFieldToFieldDto(item: MyFieldsResponseData): FieldResponseDto {
  return {
    fieldImages: item.imageUrl ? [{ order: 0, url: item.imageUrl }] : undefined,
    latitude: 0,
    longitude: 0,
    name: item.name,
    shortAddress: item.shortAddress,
    sports: item.sports as FieldResponseDto['sports'],
    type: 'PUBLIC' as FieldResponseDtoType,
    uid: item.uid,
  };
}

const STATUS_LABEL_KEYS: Record<MyFieldsResponseDataStatus, string> = {
  APPROVED: 'my_fields.status_approved',
  PENDING: 'my_fields.status_pending',
  REJECTED: 'my_fields.status_rejected',
};

const COLORS_VARIANTS: Record<MyFieldsResponseDataStatus, ChipProps['colorVariant']> = {
  APPROVED: 'success',
  PENDING: 'primary',
  REJECTED: 'error',
};

function MyFieldCard(props: MyFieldCardProps) {
  const { item } = props;
  const { t } = useTranslate();

  const field = useMemo(() => mapMyFieldToFieldDto(item), [item]);

  return (
    <FieldCard field={field} shadowVariant="black" showSport>
      <Chip
        title={t(STATUS_LABEL_KEYS[item.status])}
        size="2xs"
        className="mt-1"
        variant="outlined"
        colorVariant={COLORS_VARIANTS[item.status]}
      />
    </FieldCard>
  );
}

export default memo(MyFieldCard);
