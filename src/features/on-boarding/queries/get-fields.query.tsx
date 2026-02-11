import { useFieldsFindAllVerifiedInfinite } from '@generatedApi/fields/fields.api';
import { FieldsFindAllVerifiedParams } from '@api/generated/model/fieldsFindAllVerifiedParams';

export const useGetFields = (filter: FieldsFindAllVerifiedParams) =>
  useFieldsFindAllVerifiedInfinite(filter, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });
