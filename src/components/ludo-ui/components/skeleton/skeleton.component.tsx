import { cn } from '@chillui/ui';

import { SkeletonPulse } from '@/components/chill-ui-library/components/skeleton/components/SkeletonPulse';

import { SkeletonProps } from '../../types/skeleton.types';

export default function Skeleton(props: SkeletonProps) {
  const { className, ...rest } = props;

  return <SkeletonPulse className={cn('bg-black/20', className)} {...rest} />;
}
