import { useEffect } from 'react';
import { isString } from 'radash';
import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { serialize } from '@/utils/json.utils';
import { mmkvStorage } from '@/utils/mmkvStorage';
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';

import { useFiltersStore } from '../store/filters.store';
import { FiltersScreenParams } from '../types/filters.types';

export default function FilterFooter() {
  const { goBackPath } = useLocalSearchParams<FiltersScreenParams>();
  const { t } = useTranslate();
  const numberOfFilters = useFiltersStore(state => state.numberOfFilters);
  const filters = useFiltersStore(state => state.filters);
  const router = useRouter();

  useEffect(() => {
    if (!goBackPath || !isString(goBackPath)) return;
    mmkvStorage.setItem('goBackPath.filtersScreen', goBackPath);
  }, [goBackPath]);

  const handleCancel = () => {
    router.back();
  };

  const handleApply = () => {
    const backPatchValue = goBackPath ?? mmkvStorage.getString('goBackPath.filtersScreen');
    router.dismissTo({ params: { selectedFilters: serialize(filters) }, pathname: backPatchValue });
    mmkvStorage.removeItem('goBackPath.filtersScreen');
  };

  return (
    <FormSheetFooter>
      <Button title={t('common.button_cancel')} variant="outlined" size="md" onPress={handleCancel} />
      <Button title={t('filters.apply_button', { activeFilters: numberOfFilters })} size="md" onPress={handleApply} />
    </FormSheetFooter>
  );
}
