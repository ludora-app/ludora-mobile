import React from 'react';
import { Box, Wrapper } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';

import FilterFooter from './filter-footer.component';
import FilterHeader from './filter-header.component';
import FilterFieldType from './filter-field-type.component';
import FilterSessionDate from './filter-session-date.component';
import FilterSessionDuration from './filter-session-duration.component';

export default function Filters() {
  const { bottom } = useSafeArea();

  console.log('rerender');

  return (
    <Wrapper style={{ paddingBottom: bottom }} className="">
      <FilterHeader />
      <Box className="gap-5">
        <Box className="gap-3">
          <FilterFieldType />
          <FilterSessionDuration />
          <FilterSessionDate />
        </Box>
        <FilterFooter />
      </Box>
    </Wrapper>
  );
}
