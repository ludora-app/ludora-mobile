import { CreatePublicFieldFormDto } from '@/api/generated/model';
import { useFieldsCreate } from '@/api/generated/api/fields/fields.api';

export const useAddField = () => {
  const mutate = useFieldsCreate();

  const mutateAsync = (data: CreatePublicFieldFormDto) => mutate.mutateAsync({ data });

  return { ...mutate, mutateAsync };
};
