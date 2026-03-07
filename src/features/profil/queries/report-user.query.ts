import { useModerationCreateReport } from '@generatedApi/moderation/moderation.api';

import { CreateReportDto } from '@/api/generated/model';

export const useReportUser = () => {
  const mutate = useModerationCreateReport();

  const mutateAsync = async (data: CreateReportDto) => mutate.mutateAsync({ data });

  return {
    ...mutate,
    mutateAsync,
  };
};
