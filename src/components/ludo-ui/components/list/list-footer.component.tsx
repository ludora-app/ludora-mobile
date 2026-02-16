import React from 'react';
import { list } from 'radash';
import { LoadingIndicator } from '@chillui/ui';

import COLORS from '@/constants/COLORS';

import { Box } from '../box';

type ListFooterProps = {
  SkeletonComponent?: React.ComponentType;
  isFetchingNextPage: boolean;
};
const SKELETON_COUNT = 3;
export default function ListFooter(props: ListFooterProps) {
  const { isFetchingNextPage, SkeletonComponent } = props;
  return (
    <Box className="py-5">
      {isFetchingNextPage && (
        SkeletonComponent ? (
          list(SKELETON_COUNT).map((_, index) => (
            <Box className="mb-5" key={index}>
              <SkeletonComponent />
            </Box>
          ))
        ) : (
          <LoadingIndicator name="swing" color={COLORS.primary} />
        )
      )}
    </Box>
  );
}
