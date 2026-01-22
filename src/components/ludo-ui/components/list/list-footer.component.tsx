import React from 'react';
import { list } from 'radash';

import { Box } from '../box';

type ListFooterProps = {
  SkeletonComponent: React.ComponentType;
  isFetchingNextPage: boolean;
};
const SKELETON_COUNT = 3;
export default function ListFooter(props: ListFooterProps) {
  const { isFetchingNextPage, SkeletonComponent } = props;
  return (
    <Box>
      {isFetchingNextPage &&
        list(SKELETON_COUNT).map((_, index) => (
          <Box className="mb-5">
            <SkeletonComponent key={index} />
          </Box>
        ))}
    </Box>
  );
}
