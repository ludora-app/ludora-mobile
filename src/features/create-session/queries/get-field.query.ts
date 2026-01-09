import { useFieldsFindOne } from '@generatedApi/fields/fields.api';

export const useGetField = (id: string) => {
  const query = useFieldsFindOne(id);

  const { data, ...rest } = query;

  return { data: data?.data, ...rest };
};
