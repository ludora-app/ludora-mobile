import { CreatePublicFieldFormDto } from '@/api/generated/model';
import { useFieldsCreate } from '@/api/generated/api/fields/fields.api';
import { useInvalidateFieldsFindAllMyFields } from '@/api/generated/invalidate-queries';

export const useAddField = () => {
  const invalidateFieldsFindAllMyFields = useInvalidateFieldsFindAllMyFields();
  const mutate = useFieldsCreate({
    mutation: {
      onSuccess: () => {
        invalidateFieldsFindAllMyFields();
      },
    },
  });
  const mutateAsync = (data: CreatePublicFieldFormDto) => mutate.mutateAsync({ data });

  return { ...mutate, mutateAsync };
};
