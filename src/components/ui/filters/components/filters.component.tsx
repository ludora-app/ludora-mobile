import { Text } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { BoxGrow, WrapperSafeAreaView } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';

import FilterFooter from './filter-footer.component';
import FilterFieldType from './filter-field-type.component';
import FilterSessionDate from './filter-session-date.component';
import FilterSessionDuration from './filter-session-duration.component';

type FiltersState = {
  fieldType: 'ALL' | 'PRIVATE' | 'PUBLIC';
};

export default function Filters() {
  const router = useRouter();
  const { bottom } = useSafeArea();
  const [filters, setFilters] = useState<FiltersState>({ fieldType: 'ALL' });

  return (
    <WrapperSafeAreaView className="mx-auto w-[95%] rounded-2xl bg-white">
      <Text>filters.component</Text>
      <BoxGrow className="gap-3">
        <FilterFieldType />
        <FilterSessionDuration />
        <FilterSessionDate />
      </BoxGrow>
      <FilterFooter />
    </WrapperSafeAreaView>
  );
}
