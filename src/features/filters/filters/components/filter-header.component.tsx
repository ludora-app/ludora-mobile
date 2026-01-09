import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Box, String, Wrapper } from '@ludo/ui';

import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import { useFiltersStore } from '../store/filters.store';

export default function FilterHeader() {
  const { t } = useTranslate();
  const resetFilters = useFiltersStore(state => state.resetFilters);

  const handleResetFilters = () => {
    resetFilters();
  };

  return (
    <Wrapper fill={false}>
      <FormSheetHeader />
      <Box className="my-4 flex-row items-center justify-center">
        <Pressable onPress={handleResetFilters} className="absolute left-0 z-50 underline">
          <String variant="body-xs" colorVariant="error" font="primaryBold" className="underline">
            {t('filters.formsheet_header_left_title')}
          </String>
        </Pressable>
        <String font="primaryBold" variant="body-3">
          {t('filters.formsheet_header_title')}
        </String>
      </Box>
    </Wrapper>
  );
}
