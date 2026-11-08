import { list } from 'radash';
import { BoxRow } from '@ludo/ui';

import { useGetSports } from '@/queries/get-sports.query';
import { ErrorResult } from '@/components/ui/error-result';

import { OnBoardingSportsCard } from './on-boarding-sports-card.component';
import { OnBoardingSportsCardSkeleton } from './on-boarding-sports-card-skeleton.component';

const SKELETON_COUNT = 4;

export const OnBoardingSportsList = () => {
  const { isError, isLoading, isRefetching, refetch, sports } = useGetSports();

  if (isError && !sports.length) {
    return <ErrorResult messageKey="on-boarding.sports.error" isRetrying={isRefetching} onRetry={() => refetch()} />;
  }

  return (
    <BoxRow className="flex-wrap justify-between gap-y-4">
      {isLoading
        ? list(1, SKELETON_COUNT).map(index => <OnBoardingSportsCardSkeleton key={index} />)
        : sports.map(sport => <OnBoardingSportsCard key={sport.code} sport={sport} />)}
    </BoxRow>
  );
};
