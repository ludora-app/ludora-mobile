import { Skeleton as ChillUiSkeleton, cn } from '@chillui/ui';

import { SkeletonProps } from '../../types/skeleton.types';

export default function Skeleton(props: SkeletonProps) {
  const { className, ...rest } = props;

  return <ChillUiSkeleton className={cn('bg-black/20', className)} {...rest} />;
}
